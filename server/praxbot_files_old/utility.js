// Get all repos from the cache
var r = require('../praxbot_files/depFactory');
var db = require('../praxbot_files/botService');
var constructor = require('../praxbot_files/constructors');

console.log('utility');
console.log(constructor);

// utility.js contains all functions that don't have a place elsewhere.

var utility = function() {

  var randomQuote = function(quotes) {
    var quote = quotes[Math.floor(Math.random() * quotes.length)];
    return '"' + quote.quote + '" - ' + quote.origin;
  };

  var isBotActionRequired = function(message) {
    console.log(constructor);
    r.func.log('isBotActionRequired()', 2);
    return new Promise(function(resolve, reject) {
      var decision = new constructor.DecisionObject();
      console.log(decision);
      if (decision.originalContentLc === 'starwarsquote') {
        db.getQuotes('starwars')
        .then(function(quotes){
          decision.answer = 'send-reply';
          decision.reply = randomQuote(quotes);
          resolve(decision);
        });
      } else if (decision.originalContentLc === 'testbot') {
        decision.answer = 'send-reply';
        decision.reply = 'I\'m still running, ' + decision.authorObject;
        resolve(decision);
      } else if (decision.originalContentLc === 'praxusquote') {
        db.getQuotes('praxus')
        .then(function(quotes){
          decision.answer = 'send-reply';
          decision.reply = randomQuote(quotes);
          resolve(decision);
        });
      } else {
        resolve(decision);
      }
    });
  };

  return {
    isBotActionRequired: isBotActionRequired
  };
};

module.exports = utility();
