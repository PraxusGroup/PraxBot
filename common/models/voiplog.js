module.exports = function(Voiplog) {

//cb(null, response.length.toString());
    
  // Render all activity logs into an array for the chart
  Voiplog.getAllActivityData = function(cb) {
    var response = Gamer.find({
        where: {
          lastForumVisit: {
            gt: '2000-01-01'
          }
        }
      })
      .then(function(response) {
        
      });
  };

  Gamer.remoteMethod(
    'getAllActivityData', {
      http: {
        path: '/getallactivitydata',
        verb: 'get'
      },
      returns: {
        arg: 'count',
        type: 'string'
      }
    }
  );

};
