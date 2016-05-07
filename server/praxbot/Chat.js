var Prom = require('bluebird');
var utility = require('../praxbot/utility');

module.exports = Chat;

var _parent;
var _Chat;
var _Bot;
var _db;

function Chat(parent) {
  utility.log('Init - Chat');
  _parent = parent;
  _Chat = this;
  _Bot = parent.client;
  _db = parent.app.models;
  this.initEvents();
}

// This function turns the event listener(s) on and all logic
// that needs to fire when triggered.
Chat.prototype.initEvents = function() {
  _Bot.on('message', function(message) {
    if (message.author.username !== 'PraxBot') {
      utility.log(message.author.username + ' wrote in chat');
      _Chat.tester(message);
      _Chat.getDunked(message);
      _Chat.starwarsQuote(message);
      _Chat.praxusQuote(message);
      _Chat.syncDBWithDiscord(message);
    }
  });
};

// When a user writes "testbot" in chat, the bot will reply to
// indicate it is still running.
Chat.prototype.tester = function(message) {
  if (message.content.toLowerCase() === 'testbot') {
    _Bot.sendMessage(message, 'I\m still running, ' +
      message.author);

  }
};

// When Drevan writes "get dunked" the bot will add some
// power to the situation and reply "Oh snap!".
Chat.prototype.getDunked = function(message) {
  if (message.content.toLowerCase() === 'get dunked' &&
    message.author.username.toLowerCase() === 'drevan') {
    return _Bot.sendMessage(message, 'Oh snap!');
  }
};

// Fetches Star Wars quotes from the Quote model and
// returns one to the chat channel.
Chat.prototype.starwarsQuote = function(message) {
  if (message.content.toLowerCase() === 'starwarsquote') {
    _db.Quote.find({
      where: {
        category: 'starwars'
      }
    }).
    then(utility.returnRandomQuote).
    then(function(quote) {
      return _Bot.sendMessage(message, quote);
    }).
    catch(utility.err);
  }
};

// Fetches Praxus quotes from the Quote model and
// returns one to the chat channel.
Chat.prototype.praxusQuote = function(message) {
  if (message.content.toLowerCase() === 'praxusquote') {
    _db.Quote.find({
      where: {
        category: 'praxus'
      }
    }).
    then(utility.returnRandomQuote).
    then(function(quote) {
      return _Bot.sendMessage(message, quote);
    }).
    catch(utility.err);
  }
};

// Main function to sync chat activity with the db;
//   1. We create or find the user in the Gamer collection
//   2. We update the gamer's last discord activity
//   3. We store a record of the activity in the Chatlog collection
Chat.prototype.syncDBWithDiscord = function(message) {
  _db.Gamer.
  syncDBWithDiscord(message.author, function(gamer){
    gamer[0].lastDiscordChatMessage = new Date().toISOString();
    gamer[0].activeDiscordAccount = 'true';
    gamer[0].save().
    then(function(saved){
      _db.Chatlog.
      syncDBWithDiscord(saved, function(chat){
      });
    });
  });
};
