var moment = require('moment');
var b = require('../../server/praxbot_files/functions.js');

//server\praxbot_files\functions.js

module.exports = function(Gamepopularitylog) {

  // This function renders a list of the most popular games based on
  // the week number argument.
  Gamepopularitylog.getWeekList = function(weeknumber, cb) {
    var realWeek = moment().week(weeknumber + 1),
      monday = realWeek.weekday(1).format('YYYY-MM-DD'),
      tuesday = realWeek.weekday(2).format('YYYY-MM-DD'),
      wednesday = realWeek.weekday(3).format('YYYY-MM-DD'),
      thursday = realWeek.weekday(4).format('YYYY-MM-DD'),
      friday = realWeek.weekday(5).format('YYYY-MM-DD'),
      saturday = realWeek.weekday(6).format('YYYY-MM-DD'),
      sunday = realWeek.weekday(7).format('YYYY-MM-DD'),
      response = [],
      curGame = {};

    Gamepopularitylog.find({
        where: {
          date: monday
        },
        include: 'game'
      })
      .then(function(mondayRecords) {
        response = b.calculateGameWeekStats(mondayRecords, response);
        return Gamepopularitylog.find({
          where: {
            date: tuesday
          },
          include: 'game'
        });
      })
      .then(function(tuesdayRecords) {
        response = b.calculateGameWeekStats(tuesdayRecords, response);
        return Gamepopularitylog.find({
          where: {
            date: wednesday
          },
          include: 'game'
        });
      })
      .then(function(wednesdayRecords) {
        response = b.calculateGameWeekStats(wednesdayRecords, response);
        return Gamepopularitylog.find({
          where: {
            date: thursday
          },
          include: 'game'
        });
      })
      .then(function(thursdayRecords) {
        response = b.calculateGameWeekStats(thursdayRecords, response);
        return Gamepopularitylog.find({
          where: {
            date: friday
          },
          include: 'game'
        });
      })
      .then(function(fridayRecords) {
        response = b.calculateGameWeekStats(fridayRecords, response);
        return Gamepopularitylog.find({
          where: {
            date: saturday
          },
          include: 'game'
        });
      })
      .then(function(saturdayRecords) {
        response = b.calculateGameWeekStats(saturdayRecords, response);
        return Gamepopularitylog.find({
          where: {
            date: sunday
          },
          include: 'game'
        });
      })
      .then(function(sundayRecords) {
        response = b.calculateGameWeekStats(sundayRecords, response);
        response.sort(function(a, b) {
          return b.weekscore - a.weekscore;
        });
        cb(null, response);
      })
      .catch(console.log);
  };

  Gamepopularitylog.remoteMethod(
    'getWeekList', {
      http: {
        path: '/getweeklist',
        verb: 'get'
      },
      returns: {
        type: 'array',
        root: true
      },
      accepts: {
        arg: 'weeknumber',
        type: 'number',
        required: true
      }
    }
  );


};
