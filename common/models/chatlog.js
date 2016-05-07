var moment = require('moment');

module.exports = function(Chatlog) {
  // Run the main functionality for the bot in creating or finding a user.
  Chatlog.syncDBWithDiscord = function(userObject, cb) {
    var chatOn = moment().format('YYYY-MM-DD');
    Chatlog.findOrCreate({
      where: {
        gamerId: userObject.id,
        chatOn: chatOn
      }
    }, {
      gamerId: userObject.id,
      chatOn: chatOn
    }).
    then(cb);
  };

  Chatlog.remoteMethod(
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

};
