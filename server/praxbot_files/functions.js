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

exports.calculateGameWeekStats = function(dayValues, allValues) {
  for (var i = 0; i < dayValues.length; i++) {
    var dayValuesGame = dayValues[i].toJSON();
    var curGame = dayValuesGame.game.title,
      recScore = Number(dayValues[i].score),
      newScore = 0,
      targetElement = this.searchArrayNo(curGame, allValues, 'title');
    if (targetElement === '666') {
      allValues.push({
        title: curGame,
        weekscore: recScore
      });
    } else {
      newScore = (Number(allValues[targetElement].weekscore) + recScore);
      allValues[targetElement].weekscore = newScore;
    }
  }
  return allValues;
};

//broken
/*exports.searchArrayNoEmbed = function(nameKey, myArray, myPropertyOne, myPropertyTwo) {
  console.log(myArray);
  for (var i = 0; i < myArray.length; i++) {
    //console.log(myArray[i].hasOwnProperty(myPropertyOne));
    if (myArray[i].hasOwnProperty(myPropertyOne)) {
      if (myArray[i][myPropertyOne].hasOwnProperty(myPropertyTwo)) {
        if (myArray[i][myPropertyOne][myPropertyTwo] === nameKey) {
          return i;
        }
      } else {
        return '666';
      }
    } else {
      return '666';
    }
  }
  return '666';
};*/

exports.searchArray = function(nameKey, myArray, myProperty) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i][myProperty] === nameKey) {
      return myArray[i];
    }
  }
};

exports.searchArrayNo = function(nameKey, myArray, myProperty) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].hasOwnProperty(myProperty)) {
      if (myArray[i][myProperty] === nameKey) {
        return i;
      }
    }
  }
  return '666';
};

exports.errorHandler = function(err) {
  console.log(err.stack);
};

exports.getPrimaryRole = function(rolesArray) {
  if (rolesArray.length > 0) {
    //this array is not empty
    for (var i = 0; i < rolesArray.length; i++) {
      if (exports.searchArrayNo('@Executive Administrator', rolesArray, 'name') !== '666') {
        return '@Executive Administrator';
      } else if (exports.searchArrayNo('@Administrators', rolesArray, 'name') !== '666') {
        return '@Administrator';
      } else if (exports.searchArrayNo('@Member', rolesArray, 'name') !== '666') {
        return '@Member';
      } else if (exports.searchArrayNo('@Applicant', rolesArray, 'name') !== '666') {
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

exports.presenceGameConditional = function(userOld, userNew) {
  return (userOld.status === userNew.status) &&
    ((userNew.game && !userOld.game) ||
      (userNew.game && userOld.game));
};

exports.presenceUsernameChangeConditional = function(userOld, userNew) {
  return (userOld.username !== userNew.username);
};
