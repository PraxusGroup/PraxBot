module.exports = function(Gamer) {

  //gamer.app.models.games
  var ZERODATE = new Date(0).toISOString();

  // Get a count of the total non-guest accounts on discord.
  Gamer.getMembersOnlyCount = function(cb) {
    var response = Gamer.find({
        where: {
          or: [{
            role: 'Executive Administrator'
          }, {
            role: 'Administrator'
          }, {
            role: 'Member'
          }, {
            role: 'Applicant'
          }]
        }
      })
      .then(function(response) {
        cb(null, response.length.toString());
      });
  };

  Gamer.remoteMethod(
    'getMembersOnlyCount', {
      http: {
        path: '/getmembersonlycount',
        verb: 'get'
      },
      returns: {
        arg: 'count',
        type: 'string'
      }
    }
  );

  // Get a count of the total discord accounts associated with a forum account.
  Gamer.getForumAccountsCount = function(cb) {
    var response = Gamer.find({
        where: {
          lastForumVisit: {
            gt: '2000-01-01'
          }
        }
      })
      .then(function(response) {
        cb(null, response.length.toString());
      });
  };

  Gamer.remoteMethod(
    'getForumAccountsCount', {
      http: {
        path: '/getforumaccountscount',
        verb: 'get'
      },
      returns: {
        arg: 'count',
        type: 'string'
      }
    }
  );

  // Run the main functionality for the bot in creating or finding a user.
  Gamer.syncDBWithDiscord = function(userObject, cb) {
    var avatar = (userObject.avatarURL) ? userObject.avatarURL : '';
    Gamer.findOrCreate({
      where: {
        discordUserId: userObject.id
      }
    }, {
      userName: userObject.username,
      discordUserId: userObject.id,
      role: 'Guest',
      discordAvatarURL: avatar,
      lastDiscordChatMessage: ZERODATE,
      activeDiscordAccount: 'true',
      lastDiscordVoiceConnect: ZERODATE,
      lastForumPost: ZERODATE,
      lastForumVisit: ZERODATE,
      forumAlias: ''
    }).
    then(function(gamer) {
      var curGamer = gamer[0];
      return curGamer.save();
    }).
    then(function(saved) {
      return [saved, 0];
    }).
    then(cb);
  };

  Gamer.remoteMethod(
    'syncDBWithDiscord', {
      http: {
        path: '/syncdbwithdiscord',
        verb: 'put'
      },
      accepts: {
        arg: 'userObject',
        type: 'Object'
      },
      returns: {
        type: 'array',
        root: true
      }
    }
  );

  // Run the main functionality for the bot in creating or finding a user.
  Gamer.updateUser = function(userObject, cb) {
    var avatar = (userObject.avatarURL) ? userObject.avatarURL : '';
    Gamer.find({
      where: {
        discordUserId: userObject.id
      }
    }).
    then(function(user) {
      user.userName = userObject.username;
      user.discordAvatarURL = avatar;
      return user.save();
    }).
    then(cb);
  };

  Gamer.remoteMethod(
    'updateUser', {
      http: {
        path: '/updateuser',
        verb: 'put'
      },
      accepts: {
        arg: 'userObject',
        type: 'Object'
      },
      returns: {
        type: 'array',
        root: true
      }
    }
  );

};
