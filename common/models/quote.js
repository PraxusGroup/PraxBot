module.exports = function(Quote) {
  // Render all activity logs into an array for the chart
  // on the dashboard.
  Quote.getQuotesForCategory = function(categoryArg, cb) {
    Quote.find({
        where: {
          category: categoryArg
        }
      })
      .then(function(result) {
        cb(null, result);
      })
      .catch(console.log);
  };

  Quote.remoteMethod(
    'getQuotesForCategory', {
      http: {
        path: '/getquotesforcategory',
        verb: 'get'
      },
      returns: {
        type: 'array',
        root: true
      },
      accepts: {
        arg: 'categoryArg',
        type: 'string'
      },
    }
  );

};
