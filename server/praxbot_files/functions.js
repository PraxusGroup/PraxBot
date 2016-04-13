var moment = require('moment');
var quotes = require('../praxbot_files/quotes.json');

exports.randomQuote = function(quoteType) {
  var quoteList = quotes[quoteType];
  var returnedQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
  return returnedQuote;
};

exports.parseDate = function(dateSent) {
  var obj = {
    shortDate: moment(dateSent).format('YYYY/MM/DD @ hh:mm:ss a'),
    dbDate: moment(dateSent).format('YYYY-MM-DD'),
    year: moment(dateSent).format('YYYY'),
    month: moment(dateSent).format('MM'),
    day: moment(dateSent).format('DD'),
    dateISO: new Date().toISOString()
  };
  return obj;
};

exports.searchArray = function(nameKey, myArray, myProperty) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i][myProperty] === nameKey) {
      return myArray[i];
    }
  }
};

exports.searchArrayNo = function(nameKey, myArray, myProperty) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i][myProperty] === nameKey) {
      return i;
    }
  }
};

exports.errorHandler = function(err) {
  console.log(err.stack);
};

exports.getPrimaryRole = function(rolesArray) {
  if (rolesArray.length > 0) {
    //this array is not empty
    for (var i = 0; i < rolesArray.length; i++) {
      if (exports.searchArrayNo('@Executive Administrator', rolesArray, 'name') !== undefined) {
        return '@Executive Administrator';
      } else if (exports.searchArrayNo('@Administrators', rolesArray, 'name') !== undefined) {
        return '@Administrator';
      } else if (exports.searchArrayNo('@Member', rolesArray, 'name') !== undefined) {
        return '@Member';
      } else if (exports.searchArrayNo('@Applicant', rolesArray, 'name') !== undefined) {
        return '@Applicant';
      } else {
        return '@Guest';
      }
    }
  } else {
    //this array is empty
    return '@Guest';
  }
};

exports.getGameName = function(gameTitle) {
  var titleToSwitch = gameTitle.toLowerCase();
  if (titleToSwitch === 'arma III') {
    return 'Arma 3';
  } else {
    return gameTitle;
  }
};

exports.presenceGameConditional = function(userOld, userNew) {
  return (userOld.status === userNew.status) &&
    ((userNew.game && !userOld.game) ||
      (userNew.game && userOld.game));
};

exports.presenceUsernameChangeConditional = function(userOld, userNew) {
  return (userOld.username !== userNew.username);
};
