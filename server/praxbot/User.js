var Prom = require('bluebird');
var utility = require('../praxbot/utility');
var config = require('../praxbot/config');

module.exports = User;

var _parent;
var _User;
var _Bot;
var _db;

function User(parent) {
  utility.log('Init - User');
  _parent = parent;
  _User = this;
  _Bot = parent.client;
  _db = parent.app.models;
  this.initEvents();
}

// This function turns the event listener(s) on and all logic
// that needs to fire when triggered.
User.prototype.initEvents = function() {
  _Bot.on('serverNewMember', function(server, user) {
    _User.newMember(server, user);
    _User.syncDBWithDiscord(server, user, 'true');
    utility.log(user.username + ' joined the server');
  });
  _Bot.on('serverMemberUpdated', function(server, user) {
    _User.syncDBWithDiscord(server, user, 'true');
    utility.log(user.username + ' role updated');
  });
  _Bot.on('serverMemberRemoved', function(server, user) {
    _User.syncDBWithDiscord(server, user, 'false');
    utility.log(user.username + ' removed from server');
  });
  _Bot.on('presence', function(oldUser, newUser) {
    _User.changeUsername(oldUser, newUser);
    _User.changeAvatar(oldUser, newUser);
  });
};

// When a new discord account connects to the Praxus server.
User.prototype.newMember = function(server, user) {
  _Bot.sendMessage(config.generalId, user.username +
    ' is new on the Praxus Discord. Welcome!');
};

// When a discord member changes their username
User.prototype.changeUsername = function(oldUser, newUser) {
  if (oldUser.username !== newUser.username) {
    _Bot.sendMessage(config.generalId, oldUser.username +
      ' changed username to ' + newUser.username);
    return new Prom(function(resolve, reject) {
      _db.Gamer.updateUser(newUser, function(saved) {
        resolve(saved);
      });
    });
  }
};

// When a discord member changes their avatar
User.prototype.changeAvatar = function(oldUser, newUser) {
  if (newUser.avatarURL && oldUser.avatarURL !== newUser.avatarURL) {
    return new Prom(function(resolve, reject) {
      _db.Gamer.updateUser(newUser, function(saved) {
        resolve(saved);
      });
    });
  }
};

// Main function to sync chat activity with the db;
//   1. We create or find the user in the Gamer collection.
//   2. We update the user's role.
//   3. We update the user's status (active true or false).
User.prototype.syncDBWithDiscord = function(server, user, activeDiscordAccount) {
  return new Prom(function(resolve, reject) {
    _db.Gamer.
    syncDBWithDiscord(user, function(gamer) {
      gamer[0].role = utility.getPrimaryRole(server.rolesOfUser(user));
      gamer[0].activeDiscordAccount = activeDiscordAccount;
      gamer[0].save().
      then(function(saved) {
        resolve(saved);
      }).
      catch(reject);
    });
  });
};
