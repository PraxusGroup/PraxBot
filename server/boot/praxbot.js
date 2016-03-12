/* jshint maxlen: false */
/*jshint quotmark: false */
module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  var discord = require('discord.js');
  var config = require('../praxbot_files/config.json');
  var b = require('../praxbot_files/functions.js');
  var praxBot = new discord.Client();

  var Gamer = app.models.Gamer;
  var Voiplog = app.models.Voiplog;
  var Gamelog = app.models.Gamelog;
  var Game = app.models.Game;

  praxBot.login(config.praxbot.login, config.praxbot.password);
  console.log('Praxbot Connected');

  /* On a new user joining the server for the first time*/
  praxBot.on('disconnected', function() {
    console.log('Praxbot Disconnected... attempting to reconnect.');
    setTimeout(function() {
      praxBot.login(config.praxbot.login, config.praxbot.password);
      console.log('Praxbot Connected');
    }, 5000);
  });


  /* On a new user joining the server for the first time*/
  praxBot.on('serverNewMember', function(server, newDude) {
    /* 129037173486911488 is the id for the "general" textChannel */
    praxBot.sendMessage('129037173486911488', newDude.username + ' is new on the Praxus Discord. Welcome ' + newDude.username + '. Feel free to introduce yourself!');
  });


  /* On written message commands */
  praxBot.on('message', function(message) {

    /* Praxus Quotes */
    if (message.content === 'praxusquote') {
      praxBot.sendMessage(message, b.randomQuote(message.content));
    }
    if (message.content === 'starwarsquote') {

      praxBot.sendMessage(message, b.randomQuote(message.content));
    }
    // In case I forget how the message object is structured.
    if (message.content === 'botlog') {
      console.log(message);
    }
    if (message.content === 'botRoles') {
      var praxusServer = praxBot.servers.get("id", config.praxbot.id);
      var curUser = praxBot.users.get("username", 'Amanda');
      console.log(praxusServer.rolesOfUser(curUser));
    }
    if (message.content === 'qwe') {

    }
  });

  // When a Praxian joins a voice channel
  praxBot.on('voiceJoin', function(channel, user) {
    console.log(user.username + ' joined channel: ' + user.voiceChannel.name);
    if (user.voiceChannel.name !== 'AFK') {

      var today = new Date();
      var curDate = b.parseDate(today);

      var praxusServer = praxBot.servers.get("id", config.praxbot.id);
      var primaryRole = b.getPrimaryRole(praxusServer.rolesOfUser(user));

      Gamer.findOrCreate({
          where: {
            userName: user.username
          }
        }, {
          userName: user.username
        })
        .then(function(res) {
          var curGamer = res[0];
          curGamer.lastSeen = curDate.shortDate;
          curGamer.role = primaryRole;
          return curGamer.save();
        })
        .then(function(curGamer) {
          Voiplog.findOrCreate({
            where: {
              connectedOn: curDate.dbDate,
              gamerId: curGamer.id
            }
          }, {
            connectedOn: curDate.dbDate,
            gamerId: curGamer.id
          });
        })
        .catch(console.log);
    }
  });

  // When a Praxian starts a game
  praxBot.on('presence', function(userOld, userNew) {
    if ((userOld.status === userNew.status) && ((userNew.game !== null && userOld.game === null) || (userNew.game !== null && userOld.game !== null))) {
      var today = new Date();
      var curDate = b.parseDate(today);

      console.log(userNew.username + ' started playing ' + userNew.game.name);

      Gamer.findOrCreate({
          where: {
            userName: userNew.username
          }
        }, {
          userName: userNew.username
        })
        .then(function(user) {
          var curGamer = user[0];
          return Gamelog.create({
            gamerId: curGamer.id,
            playedOn: curDate.dbDate
          });
        })
        .then(function(gamelog) {
          return Game.findOrCreate({
              where: {
                title: userNew.game.name
              }
            }, {
              title: userNew.game.name
            })
            .then(function(game) {
              var curGame = game[0];
              gamelog.gameId = curGame.id;
              gamelog.save();
            });
        })
        .catch(console.log);
    }
  });

  // This function creates a new record for today.
  // It will then pass the created record to the function that will update it for voip or game logs.
  var saveDayDocument = function(year, month, day, nextFunction, user) {

  };

  var saveGameLog = function(id, user) {

  };

  var saveGamerlog = function(obj, user) {

  };

  var saveVoipLog = function(id, user) {

  };


};
