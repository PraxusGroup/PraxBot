module.exports = function(Gamer) {

  //gamer.app.models.games

  // Get a count of the total non-guest accounts on discord.
  Gamer.getMembersOnlyCount = function(cb) {
    var response = Gamer.find({
        where: {
          or: [{
            role: '@Executive Administrator'
          }, {
            role: '@Administrator'
          }, {
            role: '@Member'
          }, {
            role: '@Applicant'
          }]
        }
      })
      .then(function(response) {
        cb(null, response.length.toString());
      });
  };

  Gamer.remoteMethod(
    'getMembersOnlyCount', {
      http: {
        path: '/getmembersonlycount',
        verb: 'get'
      },
      returns: {
        arg: 'count',
        type: 'string'
      }
    }
  );

  // Get a count of the total discord accounts associated with a forum account.
  Gamer.getForumAccountsCount = function(cb) {
    var response = Gamer.find({
        where: {
          lastForumVisit: {
            gt: '2000-01-01'
          }
        }
      })
      .then(function(response) {
        cb(null, response.length.toString());
      });
  };

  Gamer.remoteMethod(
    'getForumAccountsCount', {
      http: {
        path: '/getforumaccountscount',
        verb: 'get'
      },
      returns: {
        arg: 'count',
        type: 'string'
      }
    }
  );
};
