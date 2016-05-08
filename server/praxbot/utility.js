var moment = require('moment');
var BPromise = require('bluebird');

module.exports = utility();

function utility() {

  return {
    log: log,
    err: err,
    returnRandomQuote: returnRandomQuote,
    getPrimaryRole: getPrimaryRole,
    getGameName: getGameName,
    presenceGameConditional: presenceGameConditional,
    userToObject: userToObject
  };

  // Some console logging formatting
  function log(log) {
    var dateTime = moment().format('YYYY/MM/DD @ hh:mm:ss a');
    console.log('PraxBot: ' + dateTime + ': ' + log);
  }

  // Error stack console with formatting
  function err(err) {
    var dateTime = moment().format('YYYY/MM/DD @ hh:mm:ss a');
    console.log('PraxBot: ' + dateTime + ': ERR:');
    console.log(err.stack);
  }

  // Checks to see if the user is indeed starting a new game.
  function presenceGameConditional(userOld, userNew) {
    return (userOld.status === userNew.status) &&
      ((userNew.game && !userOld.game) ||
        (userNew.game && userOld.game));
  }

  // This is given an array of quote objects and it returns a
  // promise in shape of a quote string.
  function returnRandomQuote(quotes) {
    if (quotes) {
      return new BPromise(function(resolve, reject) {
        var quote = quotes[
          Math.floor(Math.random() * quotes.length)
        ];
        resolve('"' + quote.quote + '" - ' + quote.origin);
      });
    } else {
      throw 'utility.returnRandomQuote - No quotes';
    }
  }

  function getPrimaryRole(rolesArray) {
    if (rolesArray.length > 0) {
      //this array is not empty
      for (var i = 0; i < rolesArray.length; i++) {
        if (searchArrayNo('Executive Administrator', rolesArray, 'name') !== '666') {
          return 'Executive Administrator';
        } else if (searchArrayNo('Administrators', rolesArray, 'name') !== '666') {
          return 'Administrator';
        } else if (searchArrayNo('Member', rolesArray, 'name') !== '666') {
          return 'Member';
        } else if (searchArrayNo('Applicant', rolesArray, 'name') !== '666') {
          return 'Applicant';
        } else {
          return 'Guest';
        }
      }
    } else {
      //this array is empty
      return 'Guest';
    }
  }

  function searchArrayNo(nameKey, myArray, myProperty) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].hasOwnProperty(myProperty)) {
        if (myArray[i][myProperty] === nameKey) {
          return i;
        }
      }
    }
    return '666';
  }

  function userToObject(user) {
    if (user.client) delete user.client;

    return user;
  }

  function getGameName(gameTitle) {
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
  }


}
