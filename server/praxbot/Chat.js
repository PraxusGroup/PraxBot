var BPromise = require('bluebird');
var utility = require('../praxbot/utility');

module.exports = Chat;

function Chat(parent) {
  utility.log('Init - Chat');
  this._parent = parent;
  this._Chat = this;
  this._Bot = parent.client;
  this._db = parent.app.models;
  this.initEvents();
}

// This function turns the event listener(s) on and all logic
// that needs to fire when triggered.
Chat.prototype.initEvents = function() {
  var _this = this;

  _this._Bot.on('message', function(message) {
    if (message.author.username !== 'PraxBot') {
      utility.log(message.author.username + ' wrote in chat');
    }
  });
};

Chat.prototype.handleOnMessage = function(message) {
  var _this = this;

  _this._Chat.tester(message);
  _this._Chat.getDunked(message);
  _this._Chat.starwarsQuote(message);
  _this._Chat.praxusQuote(message);
  _this._Chat.syncDBWithDiscord(message);
};

// When a user writes "testbot" in chat, the bot will reply to
// indicate it is still running.
Chat.prototype.tester = function(message) {
  var _this = this;

  if (message.content.toLowerCase() === 'testbot') {
    _this._Bot
      .sendMessage(
        message,
        'I\m still running, ' + message.author
      );
  }
};

// When Drevan writes "get dunked" the bot will add some
// power to the situation and reply "Oh snap!".
Chat.prototype.getDunked = function(message) {
  var _this = this;
  if (message.content.toLowerCase() === 'get dunked' &&
    message.author.username.toLowerCase() === 'drevan') {
    return _this._Bot.sendMessage(message, 'Oh snap!');
  }
};

// Fetches Star Wars quotes from the Quote model and
// returns one to the chat channel.
Chat.prototype.starwarsQuote = function(message) {
  var _this = this;

  if (message.content.toLowerCase() === 'starwarsquote') {

    _this._db.Quote
      .find({
        where: {
          category: 'starwars'
        }
      })
      .then(utility.returnRandomQuote)
      .then(function(quote) {
        return _this._Bot.sendMessage(message, quote);
      })
      .catch(utility.err);
  }
};

// Fetches Praxus quotes from the Quote model and
// returns one to the chat channel.
Chat.prototype.praxusQuote = function(message) {
  var _this = this;

  if (message.content.toLowerCase() === 'praxusquote') {
    _this._db.Quote
      .find({
        where: {
          category: 'praxus'
        }
      })
      .then(utility.returnRandomQuote)
      .then(function(quote) {
        return _this._Bot.sendMessage(message, quote);
      })
      .catch(utility.err);
  }
};

// Main function to sync chat activity with the db;
//   1. We create or find the user in the Gamer collection
//   2. We update the gamer's last discord activity
//   3. We store a record of the activity in the Chatlog collection
Chat.prototype.syncDBWithDiscord = function(message) {
  var _this = this;

  this._db.Gamer
    .syncDBWithDiscord(
      message.author,
      function(gamer) {
        gamer[0].lastDiscordChatMessage = new Date().toISOString();
        gamer[0].activeDiscordAccount = 'true';

        gamer[0]
          .save()
          .then(function(saved) {
            _this._db.Chatlog
              .syncDBWithDiscord(saved, function(chat) {

              });
          });
      });
};
