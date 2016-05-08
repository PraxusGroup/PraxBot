var discord = require('discord.js');
var BPromise = require('bluebird');
var config = require('../praxbot/config');
var utility = require('../praxbot/utility');
var Chat = require('../praxbot/Chat');
var User = require('../praxbot/User');
var Game = require('../praxbot/Game');


module.exports = Bot;

function Bot(app) {
  var _bot = this;

  _bot.app = app;
  _bot.client = new discord.Client(config.botOptions);

  _bot
    .login()
    .then(_bot.loadCache)
    .then(_bot.initModules)
    .then(_bot.syncCacheWithDB)
    .then(function(resolved) {
      utility.log('Bot modules initialized');
    })
    .catch(utility.err);
}

// This connects the bot with discord's central server.
Bot.prototype.login = function() {
  var _bot = this;
  return new BPromise(function(resolve, reject) {
    utility.log('Connecting');
    _bot.client.login(config.login, config.password, function(err, token) {
      if (token) {
        utility.log('Connected');
        resolve(_bot);
      } else {
        reject(err);
      }
    });
  });
};

// After logging in, the bot automatically caches server objects
// We have to wait for this to complete before we listen for events.
Bot.prototype.loadCache = function(_bot) {
  return new BPromise(function(resolve, reject) {
    utility.log('Caching discord data');
    _bot.client.on('ready', function() {
      utility.log('Discord data cached');
      resolve(_bot);
    });
  });
};

// After caching and syncing with the DB, we initialize our
// other modules that contain event listeners and their logic
Bot.prototype.initModules = function(_bot) {
  utility.log('Initializing bot modules');
  this.User = new User(_bot);
  this.Chat = new Chat(_bot);
  this.Game = new Game(_bot);
  return BPromise.resolve(_bot);
};

// Facade function for getting the server object
// We need this object every time we deal with a user's role.
Bot.prototype.getServerObject = function() {
  return this.client.servers.get('id', config.serverId);
};

// We run this after caching, this will put every user in the DB
// we did not get with the newuser event, as well as fix member roles.
Bot.prototype.syncCacheWithDB = function(_bot) {
  var _this = this;
  utility.log('Synchronizing cache with DB');
  var allMembers = _bot.client.servers[0].members;
  var server = _bot.client.servers[0];
  var Gamer = _bot.app.models.Gamer;

  return new BPromise(function(resolve, reject) {
    var promises = [];

    allMembers.forEach(function(member) {
      promises.push(_this.User.syncDiscordUser(member));
    });

    BPromise
      .all(promises)
      .then(function(res) {
        utility.log('Synchronized ' + allMembers.length + ' users with DB');
        resolve(res);
      })
      .catch(reject);

    /*
    function updateMember(i) {
      if (i < allMembers.length) {
        var primaryRole = utility.getPrimaryRole(server.rolesOfUser(allMembers[i]));
        , function(user) {
          user[0].role = primaryRole;

          user[0].save()
            .then(function (saved){
              updateMember(i + 1);
            });
        });
      } else {
        utility.log('Synchronized ' + allMembers.length + ' users with DB');
        resolve(_bot);
      }
    }
    updateMember(0);*/
  });
};
