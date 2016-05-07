var moment = require('moment');
var b = require('../../server/praxbot_files_old/functions.js');

module.exports = function(Voiplog) {


  // Render all activity logs into an array for the chart
  // on the dashboard.
  Voiplog.getAllActivityData = function(cb) {
    var Chatlog = Voiplog.app.models.Chatlog;
    var Forumvisitlog = Voiplog.app.models.Forumvisitlog;
    var Forumpostlog = Voiplog.app.models.Forumpostlog;
    var voipLogs, chatLogs, forumVisitLogs, forumpostLogs = [];

    Voiplog.find()
      .then(function(data) {
        voipLogs = data;
        return Chatlog.find();
      })
      .then(function(data) {
        chatLogs = data;
        return Forumvisitlog.find();
      })
      .then(function(data) {
        forumVisitLogs = data;
        return Forumpostlog.find();
      })
      .then(function(data) {
        forumpostLogs = data;

        voipLogs.sort(function(a, b) {
          return new Date(a.connectedOn) - new Date(b.connectedOn);
        });


        var dateAppendage = "T00:00:00.000Z",
          minDate = moment(voipLogs[0].connectedOn.toISOString().substr(0, 10)).toDate(),
          maxDate = moment(voipLogs[voipLogs.length - 1].connectedOn.toISOString().substr(0, 10)).toDate(),
          result = [];

        for (var d = minDate; d <= maxDate; d.setDate(d.getDate() + 1)) {
          var dateValue = moment(d).format("YYYY-MM-DD");
          var voipcounter = voipLogs.filter(function(element) {
            return moment(element.connectedOn.toISOString().substr(0, 10)).toDate().toISOString() === d.toISOString();
          }).length;
          var chatcounter = chatLogs.filter(function(element) {
            return moment(element.chatOn.toISOString().substr(0, 10)).toDate().toISOString() === d.toISOString();
          }).length;
          var viewcounter = forumVisitLogs.filter(function(element) {
            return moment(element.visitedOn.toISOString().substr(0, 10)).toDate().toISOString() === d.toISOString();
          }).length;
          var postcounter = forumpostLogs.filter(function(element) {
            return moment(element.postedOn.toISOString().substr(0, 10)).toDate().toISOString() === d.toISOString();
          }).length;
          result.push([dateValue, voipcounter, chatcounter, viewcounter, postcounter])
        }
        cb(null, result);
      })
      .catch(b.errorHandler);
  };

  Voiplog.remoteMethod(
    'getAllActivityData', {
      http: {
        path: '/getallactivitydata',
        verb: 'get'
      },
      returns: {
        type: 'array',
        root: true
      }
    }
  );

};
