// Get all repos from the cache
var r = require('../praxbot_files/depFactory');
var constructor = require('../praxbot_files/constructors');
var utility = require('../praxbot_files/utility');


// Initialize all the loopback model objects
var m = new constructor.ModelsObject();


var dbFunctions = function() {

  var saveUser = function(server, user) {
    r.func.log('saveUser() - ' + user.username, 2);
    var u = new constructor.UserObject(server, user);
    return m.Gamer.findOrCreate(u.where, u.save);
  };

  var saveChatlog = function(user) {
    console.log(user);
    var chat = new constructor.ChatlogObject(user[0]);
      return m.Chatlog.findOrCreate(chat.where, chat.save);
  };

  var getQuotes = function(category) {
    r.func.log('getQuotes()', 2);
    var w = new constructor.QuoteCategoryObject(category);
    return m.Quote.find(w);
  };

  var saveChatActivity = function(serverObject, messageObject) {
    r.func.log('saveChatActivity() - ' + messageObject.author, 2);
    saveUser(serverObject, messageObject.authorObject)
    .then(function(user){
      user[0].lastDiscordChatMessage = new Date().toISOString();
      return user.save();
    });

  };

  return {
    saveUser: saveUser,
    getQuotes: getQuotes
  };
};

module.exports = dbFunctions();
