var BPromise = require('bluebird');
var utility = require('../praxbot/utility');
var config = require('../praxbot/config');

module.exports = User;

function User(parent) {
  utility.log('Init - User');
  this._parent = parent;
  this._bot = parent.client;
  this._db = parent.app.models;
  this.initEvents();
}

// This function turns the event listener(s) on and all logic
// that needs to fire when triggered.
User.prototype.initEvents = function() {
  var _this = this;

  _this._bot.on('serverNewMember', function(server, user) {
    _this.handleOnNewMember(server,user);
  });
  _this._bot.on('serverMemberUpdated', function(server, user) {
    _this.handleOnServerMemberUpdated(server,user);
  });
  _this._bot.on('serverMemberRemoved', function(server, user) {
    _this.handleOnServerMemberRemoved(server,user);
  });
  _this._bot.on('presence', function(oldUser, newUser) {
    _this.changeUsername(oldUser, newUser);
    _this.changeAvatar(oldUser, newUser);
  });
};

// When a new discord account connects to the Praxus server.
User.prototype.handleOnNewMember = function(server, user) {
  var _this = this;

  _this.newMember(server, user);
  _this.syncDBWithDiscord(server, user, 'true');
  utility.log(user.username + ' joined the server');
};

// When a new discord account connects to the Praxus server.
User.prototype.handleOnServerMemberUpdated = function(server, user) {
  var _this = this;

  _this.syncDBWithDiscord(server, user, 'true');
  utility.log(user.username + ' role updated');
};

// When a new discord account connects to the Praxus server.
User.prototype.handleOnServerMemberRemoved = function(server, user) {
  var _this = this;

  _this.syncDBWithDiscord(server, user, 'false');
  utility.log(user.username + ' removed from server');
};

// When a new discord account connects to the Praxus server.
User.prototype.newMember = function(server, user) {
  var _this = this;

  _this._bot.sendMessage(config.generalId, user.username +
    ' is new on the Praxus Discord. Welcome!');
};

// When a discord member changes their username
User.prototype.changeUsername = function(oldUser, newUser) {
  var _this = this;

  if (oldUser.username !== newUser.username) {
    _this._bot.sendMessage(config.generalId, oldUser.username +
      ' changed username to ' + newUser.username);
    return new BPromise(function(resolve, reject) {
      _this._db.Gamer.updateUser(newUser, function(saved) {
        resolve(saved);
      });
    });
  }
};

// When a discord member changes their avatar
User.prototype.changeAvatar = function(oldUser, newUser) {
  var _this = this;

  if (newUser.avatarURL && oldUser.avatarURL !== newUser.avatarURL) {
    return new BPromise(function(resolve, reject) {
      _this._db.Gamer.updateUser(newUser, function(saved) {
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
  var _this = this;

  return new BPromise(function(resolve, reject) {
    _this._db.Gamer.
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


User.prototype.syncDiscordUser = function(user) {
  var _this = this;

  return new BPromise(function(resolve, reject) {
    _this._db.Gamer.findOrCreate({
      where: {
        discordUserId: user.id
      }
    }, {
      userName: user.username,
      discordUserId: user.id,
      role: 'Guest',
      discordAvatarURL:  user.avatarURL || '',
      activeDiscordAccount: 'true',
      forumAlias: ''
    })
    .then(function(gamer) {
      var curGamer = gamer[0];
      var server = _this._bot.servers[0];
      curGamer.role = utility.getPrimaryRole(server.rolesOfUser(curGamer));

      return curGamer.save();
    })
    .then(resolve)
    .catch(reject);
  });
};
