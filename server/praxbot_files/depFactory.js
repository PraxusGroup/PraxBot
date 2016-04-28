// Putting all the dependencies in the cache with one require.
var DepFactory = function() {
  var repos = this;
  var repoList = [{
    name: 'app',
    source: '../server'
  }, {
    name: 'config',
    source: '../praxbot_files/config.json'
  }, {
    name: 'discord',
    source: 'discord.js'
  }, {
    name: 'cron',
    source: 'cron'
  }, {
    name: 'req',
    source: 'request'
  }, {
    name: 'func',
    source: '../praxbot_files/functions'
  }];
  repoList.forEach(function(repo) {
    repos[repo.name] = require(repo.source);
  });
};

module.exports = new DepFactory();
