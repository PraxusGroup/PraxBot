var Prom = require('bluebird');
var utility = require('../praxbot/utility');
var config = require('../praxbot/config');
var moment = require('moment');
var CronJob = require('cron').CronJob;

module.exports = Game;

var _parent;
var _Game;
var _Bot;
var _db;

function Game(parent) {
  utility.log('Init - Game');
  _parent = parent;
  _Game = this;
  _Bot = parent.client;
  _db = parent.app.models;
  this.initEvents();
  this.startPopularityCron();
}

// This function turns the event listener(s) on and all logic
// that needs to fire when triggered.
Game.prototype.initEvents = function() {
  _Bot.on('presence', function(oldUser, newUser) {
    _Game.startGame(oldUser, newUser);
  });
};

// When a new discord account connects to the Praxus server.
Game.prototype.startGame = function(oldUser, newUser) {
  if (utility.presenceGameConditional(oldUser, newUser)) {
    _Game.syncDBWithDiscord(newUser);
  }
};

// Main function to sync chat activity with the db;
//   1. We create or find the user in the Gamer collection.
//   2. We create or find the game.
//   4. We store a record in the gamelog collection
Game.prototype.syncDBWithDiscord = function(newUser) {
  return new Prom(function(resolve, reject) {
    var playedOnDate = moment().format('YYYY-MM-DD');
    var gameTitle = utility.getGameName(newUser.game.name);
    var userObject;
    var gameObject;
    utility.log(newUser.username + ' started playing ' + gameTitle);
    _db.Gamer.syncDBWithDiscord(newUser, function(user) {
      userObject = user[0];
      _db.Game.findOrCreate({
        where: {
          title: gameTitle
        }
      }, {
        title: gameTitle
      }).
      then(function(game) {
        gameObject = game[0];
        return _db.Gamelog.findOrCreate({
          where: {
            gamerId: userObject.id,
            playedOn: playedOnDate,
            gameId: gameObject.id
          }
        }, {
          gamerId: userObject.id,
          playedOn: playedOnDate,
          gameId: gameObject.id
        });
      }).
      then(resolve).
      catch(utility.err);
    });
  });
};

//  We start the cron that calculates the game popularity calculations
Game.prototype.startPopularityCron = function() {
  // Initiate the Cron that will calculate game popularity
  // cronTime: '0 15/30 * * * *' --> Every half hour at 00:15 and 00:45
  var gamePopularityCron = new CronJob({
    cronTime: '0 15/30 * * * *',
    onTick: function() {
      utility.log('Calculating Games Popularity');
      var today = moment().format('YYYY-MM-DD');
      _Game.calculateAllGamePopularity(today);
    },
    start: true
  });
};

//  We start the cron that calculates the game popularity calculations
Game.prototype.calculateAllGamePopularity = function(today, cb) {
  _db.Game.find().
  then(function(allGames) {
      function updateGamePopularity(i) {
        if (i < allGames.length) {
          _db.Gamelog.find({
            where: {
              gameId: allGames[i].id,
              playedOn: today
            }
          }).
          then(function(gamelogsFound) {
              if (gamelogsFound.length) {
                _db.Gamepopularitylog.findOrCreate({
                  where: {
                    date: today,
                    gameId: allGames[i].id
                  }
                }, {
                  date: today,
                  gameId: allGames[i].id
                }).
                then(function(gamepopularitylogFound) {
                    var curLog = gamepopularitylogFound[0];
                    curLog.score = gamelogsFound.length.toString();
                    curLog.save()
                      .then(function(savedRecord) {
                        updateGamePopularity(i + 1);
                      });
                  })
                  .catch(utility.err);
              } else {
                updateGamePopularity(i + 1);
              }
            })
            .catch(utility.err);
        } else {
          if (cb && typeof(cb) === 'function') {
            cb();
          }
        }
      }
      updateGamePopularity(0);
    })
    .catch(utility.err);
};
