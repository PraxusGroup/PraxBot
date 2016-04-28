// Get all repos from the cache
var r = require('../praxbot_files/depFactory');
var db = require('../praxbot_files/botService');
var constructor = require('../praxbot_files/constructors');
var utility = require('../praxbot_files/utility');

var botFunctions = function() {
  
  // Initialize some variables
  var bot = new constructor.BotObject();

  // We're connecting to the Praxus Server
  var connect = function() {
    return new Promise(function(resolve, reject) {
      r.func.log('Connecting...', 1);
      bot.client.login(bot.botLogin, bot.botPassw, function(err, token) {
        if (token) {
          r.func.log('Connection established', 1);
          resolve(token);
        } else {
          reject(err);
        }
      });
    });
  };

  // We're caching all the (off-line) users and info
  var onReady = function() {
    return new Promise(function(resolve, reject) {
      r.func.log('Caching discord data', 1);
      bot.client.on('ready', function() {
        r.func.log('Discord data cached. Bot Ready.', 1);
        resolve(true);
      });
    });
  };


  // When a new user joins Discord, we notify everyone in general chat.
  // Then we save the user to the db. (If he doesn't exist)
  var onNewMember = function() {
    bot.client.on('serverNewMember', function(server, user) {
      var newMember = user.username;
      var messageToSend = newMember + 'is new on the Praxus Discord. ' +
        'Welcome, ' + newMember + '.';
      r.func.log('New user - ' + newMember, 1);
      bot.client.sendMessage(bot.general, messageToSend);
      db.saveUser(server, user);
    });
  };

  // When a user writes a message in chat, we figure out if action
  // is required. 2 types of action are possible for now:
  //    1. Send a reply in chat, or
  //    2. Run a function
  // Then we log the chat activity.
  var onChatMessage = function() {
    bot.client.on('message', function(message) {
      r.func.log(message.author.username + ' wrote in chat', 1);
      utility.isBotActionRequired(message)
      .then(function(decision){
        if (decision.answer === 'send-reply') {
          bot.client.sendMessage(message, decision.reply);
        } else if (decision.answer === 'run-function') {
          decision.reply();
        }
        return decision;
      })
      .then(function(decision){
        db.saveChatActivity(bot.serverObject, decision);
      });
    });
  };

  return {
    connect: connect,
    onReady: onReady,
    onNewMember: onNewMember,
    onChatMessage: onChatMessage
  };
};



module.exports = botFunctions();
