var bot = require('../praxbot_files/botWrapper');

// First we connect the client to the Praxus discord.
// Then we cache the data the server has to offer such as registered (offline) users,
// we start listening for events (onNewMember, onChat, etc) and
// we fire up the cron jobs that interface with the forums.

var main = function() {
  var start = function() {
    bot.connect()
      .then(function(token){
          return bot.onReady();
      })
      .then(function(ready) {
        bot.onNewMember();
        bot.onChatMessage();
      });
  };
  return {
    start: start
  };
};

module.exports = main();
