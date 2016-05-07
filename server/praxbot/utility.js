var moment = require('moment');
var Prom = require('bluebird');

module.exports = utility();

function utility() {

  var _this = this;

  // Some console logging formatting
  _this.log = function(log) {
    var dateTime = moment().format('YYYY/MM/DD @ hh:mm:ss a');
    console.log('PraxBot: ' + dateTime + ': ' + log);
  };

  // Error stack console with formatting
  _this.err = function(err) {
    var dateTime = moment().format('YYYY/MM/DD @ hh:mm:ss a');
    console.log('PraxBot: ' + dateTime + ': ERR:');
    console.log(err.stack);
  };

  // Checks to see if the user is indeed starting a new game.
  _this.presenceGameConditional = function(userOld, userNew) {
    return (userOld.status === userNew.status) &&
      ((userNew.game && !userOld.game) ||
        (userNew.game && userOld.game));
  };

  // This is given an array of quote objects and it returns a
  // promise in shape of a quote string.
  _this.returnRandomQuote = function(quotes) {
    if (quotes) {
      return new Prom(function(resolve, reject) {
        var quote = quotes[
          Math.floor(Math.random() * quotes.length)
        ];
        resolve('"' + quote.quote + '" - ' + quote.origin);
      });
    } else {
      throw 'utility.returnRandomQuote - No quotes';
    }
  };

  _this.getPrimaryRole = function(rolesArray) {
    if (rolesArray.length > 0) {
      //this array is not empty
      for (var i = 0; i < rolesArray.length; i++) {
        if (_this.searchArrayNo('Executive Administrator', rolesArray, 'name') !== '666') {
          return 'Executive Administrator';
        } else if (_this.searchArrayNo('Administrators', rolesArray, 'name') !== '666') {
          return 'Administrator';
        } else if (_this.searchArrayNo('Member', rolesArray, 'name') !== '666') {
          return 'Member';
        } else if (_this.searchArrayNo('Applicant', rolesArray, 'name') !== '666') {
          return 'Applicant';
        } else {
          return 'Guest';
        }
      }
    } else {
      //this array is empty
      return 'Guest';
    }
  };

  _this.searchArrayNo = function(nameKey, myArray, myProperty) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].hasOwnProperty(myProperty)) {
        if (myArray[i][myProperty] === nameKey) {
          return i;
        }
      }
    }
    return '666';
  };

  _this.getGameName = function(gameTitle) {
    var titleToSwitch = gameTitle.toLowerCase();
    if (titleToSwitch === 'arma iii'.toLowerCase()) {
      return 'Arma 3';
    } else if (titleToSwitch === 'day z'.toLowerCase()) {
      return 'DayZ';
    } else if (titleToSwitch === 'skyrim'.toLowerCase()) {
      return 'The Elder Scrolls V: Skyrim';
    } else if (titleToSwitch === 'FINAL FANTASY XIV'.toLowerCase()) {
      return 'FINAL FANTASY XIV - A Realm Reborn';
    } else if (titleToSwitch === 'Total War Rome II'.toLowerCase()) {
      return 'Total War: ROME 2';
    } else {
      return gameTitle;
    }
  };

  return {
    log: _this.log,
    err: _this.log,
    returnRandomQuote: _this.returnRandomQuote,
    getPrimaryRole: _this.getPrimaryRole,
    getGameName: _this.getGameName,
    presenceGameConditional: _this.presenceGameConditional
  };
}
