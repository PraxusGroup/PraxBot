/* jshint maxlen: false */
/*jshint quotmark: false */
module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  /* Initialize all the things */
  var discord = require('discord.js'),
    config = require('../praxbot_files/config.json'),
    b = require('../praxbot_files/functions.js'),
    CronJob = require('cron').CronJob,
    request = require('request'),
    praxBot = new discord.Client(),
    Gamer = app.models.Gamer,
    Voiplog = app.models.Voiplog,
    Chatlog = app.models.Chatlog,
    Gamelog = app.models.Gamelog,
    Forumvisitlog = app.models.Forumvisitlog,
    Forumpostlog = app.models.Forumpostlog,
    Game = app.models.Game,
    botLogin = config.praxbot.login,
    botPassword = config.praxbot.password,
    generalChannelId = config.praxbot.generalChatChannelId,
    serverId = config.praxbot.id;

  loadPraxbot();

  function loadPraxbot() {
    praxBot.login(botLogin, botPassword)
      .then(function(loadedBot) {
        console.log('Praxbot Connected');

        /* On a disconnect, usually due to DDOS attacks*/
        /* We will wait 5 seconds and log back in.*/
        praxBot.on('disconnected', function() {
          console.log('Praxbot Disconnected... attempting to reconnect.');
          setTimeout(function() {
            loadPraxbot();
          }, 5000);
        });

        /* On a new user joining the server for the first time*/
        praxBot.on('serverNewMember', function(server, newDude) {
          /* 129037173486911488 is the id for the "general" textChannel */
          praxBot.sendMessage(generalChannelId, newDude.username +
            ' is new on the Praxus Discord. Welcome ' +
            newDude.username + '. Feel free to introduce yourself!');

          var praxusServer = praxBot.servers.get("id", serverId);
          var primaryRole = b.getPrimaryRole(praxusServer.rolesOfUser(newDude));
          var zeroDate = new Date(0).toISOString();

          Gamer.findOrCreate({
              where: {
                userName: newDude.username
              }
            }, {
              userName: newDude.username,
              discordUserId: newDude.id,
              lastForumPost: zeroDate,
              lastForumVisit: zeroDate,
              lastDiscordChatMessage: zeroDate,
              lastDiscordVoiceConnect: zeroDate,
              activeDiscordAccount: "true",
              role: primaryRole
            })
            .then(function(res) {
              var curGamer = res[0];
              curGamer.lastForumPost = (curGamer.lastForumPost) ? curGamer.lastForumPost : zeroDate;
              curGamer.lastForumVisit = (curGamer.lastForumVisit) ? curGamer.lastForumVisit : zeroDate;
              curGamer.lastDiscordChatMessage = (curGamer.lastDiscordChatMessage) ? curGamer.lastDiscordChatMessage : zeroDate;
              curGamer.lastDiscordVoiceConnect = (curGamer.lastDiscordVoiceConnect) ? curGamer.lastDiscordVoiceConnect : zeroDate;
              curGamer.activeDiscordAccount = "true";
              curGamer.role = primaryRole;
              return curGamer.save();
            });

        });

        /* On written message commands */
        praxBot.on('message', function(message) {

          var content = message.content.toLowerCase();
          var author = message.author.username;

          /* Praxus Quotes */
          if (content === 'praxusquote') {
            praxBot.sendMessage(message, b.randomQuote(message.content));
          }
          if (content === 'starwarsquote') {
            praxBot.sendMessage(message, b.randomQuote(message.content));
          }
          /* To do a quick test if the bot is really running and catching events*/
          if (content === 'testbot') {
            praxBot.sendMessage(message, "I'm still running, " + author);
          }
          // In case I forget how the message object is structured.
          if (content === 'botlog') {
            console.log(praxBot.servers[0].members);
            //console.log(message);
          }
          // Build all the Discord members in the database
          if (content === 'getallmembers()' &&
            author === 'Whiplash') {
            getAllMembers();
          }
          // Make sure every member record has its properties
          if (content === 'initmemberproperties()' &&
            author === 'Whiplash') {
            initMemberProperties();
          }
          // A little extra bot support for a powerful Drevan move.
          if (content === 'get dunked' &&
            author === 'Drevan') {
            praxBot.sendMessage(message, 'Oh snap!');
          }

          var today = new Date();
          var curDate = b.parseDate(today);
          var zeroDate = new Date(0).toISOString();


          /* We're going to add a log of the user posting */
          /* a chat message once per day, per user */
          Gamer.findOrCreate({
              where: {
                userName: author
              }
            }, {
              userName: author,
              lastForumPost: zeroDate,
              lastForumVisit: zeroDate,
              lastDiscordChatMessage: zeroDate,
              lastDiscordVoiceConnect: zeroDate,
              activeDiscordAccount: "true",
              role: '@Guest'
            })
            .then(function(res) {
              var curGamer = res[0];
              curGamer.lastDiscordVoiceConnect = (curGamer.lastDiscordVoiceConnect) ? curGamer.lastDiscordVoiceConnect : zeroDate;
              curGamer.lastForumPost = (curGamer.lastForumPost) ? curGamer.lastForumPost : zeroDate;
              curGamer.lastForumVisit = (curGamer.lastForumVisit) ? curGamer.lastForumVisit : zeroDate;
              curGamer.role = (curGamer.role) ? curGamer.role : '@Guest';
              curGamer.activeDiscordAccount = "true";
              curGamer.lastDiscordChatMessage = curDate.dateISO;
              return curGamer.save();
            })
            .then(function(curGamer) {
              Chatlog.findOrCreate({
                where: {
                  chatOn: curDate.dbDate,
                  gamerId: curGamer.id
                }
              }, {
                chatOn: curDate.dbDate,
                gamerId: curGamer.id
              });
            })
            .catch(function(err) {
              console.log(err);
            });
        });

        // Fires when we update a member's roles
        // We gotta make sure its reflected in the DB
        praxBot.on('serverMemberUpdated', function(server, user) {
          var today = new Date();
          var curDate = b.parseDate(today); // "2011-01-23"
          var zeroDate = new Date(0).toISOString();

          var praxusServer = praxBot.servers.get("id", serverId);
          var primaryRole = b.getPrimaryRole(praxusServer.rolesOfUser(user));

          Gamer.findOrCreate({
              where: {
                userName: user.username
              }
            }, {
              userName: user.username,
              discordUserId: user.id,
              lastForumPost: zeroDate,
              lastForumVisit: zeroDate,
              lastDiscordChatMessage: zeroDate,
              lastDiscordVoiceConnect: zeroDate,
              activeDiscordAccount: "true",
              role: primaryRole
            })
            .then(function(res) {
              var curGamer = res[0];
              curGamer.lastForumPost = (curGamer.lastForumPost) ? curGamer.lastForumPost : zeroDate;
              curGamer.lastForumVisit = (curGamer.lastForumVisit) ? curGamer.lastForumVisit : zeroDate;
              curGamer.lastDiscordChatMessage = (curGamer.lastDiscordChatMessage) ? curGamer.lastDiscordChatMessage : zeroDate;
              curGamer.lastDiscordVoiceConnect = (curGamer.lastDiscordVoiceConnect) ? curGamer.lastDiscordVoiceConnect : zeroDate;
              curGamer.activeDiscordAccount = "true";
              curGamer.role = primaryRole;
              return curGamer.save();
            })
            .then(function(done) {
              console.log(user.username + ' updated');
            });
        });

        // Fires when we remove a member from the server
        // We gotta make sure its reflected in the DB
        praxBot.on('serverMemberRemoved', function(server, user) {
          var today = new Date();
          var curDate = b.parseDate(today); // "2011-01-23"
          var zeroDate = new Date(0).toISOString(); // "GMT"

          var praxusServer = praxBot.servers.get("id", serverId);
          var primaryRole = b.getPrimaryRole(praxusServer.rolesOfUser(user));

          Gamer.findOrCreate({
              where: {
                userName: user.username
              }
            }, {
              userName: user.username,
              discordUserId: user.id,
              lastForumPost: zeroDate,
              lastForumVisit: zeroDate,
              lastDiscordChatMessage: zeroDate,
              lastDiscordVoiceConnect: zeroDate,
              activeDiscordAccount: "false",
              role: primaryRole
            })
            .then(function(res) {
              var curGamer = res[0];
              curGamer.lastForumPost = (curGamer.lastForumPost) ? curGamer.lastForumPost : zeroDate;
              curGamer.lastForumVisit = (curGamer.lastForumVisit) ? curGamer.lastForumVisit : zeroDate;
              curGamer.lastDiscordChatMessage = (curGamer.lastDiscordChatMessage) ? curGamer.lastDiscordChatMessage : zeroDate;
              curGamer.lastDiscordVoiceConnect = (curGamer.lastDiscordVoiceConnect) ? curGamer.lastDiscordVoiceConnect : zeroDate;
              curGamer.activeDiscordAccount = "false";
              curGamer.role = primaryRole;
              return curGamer.save();
            })
            .then(function(done) {
              console.log(user.username + ' deactivated');
            });
        });

        // When a Praxian joins a voice channel
        praxBot.on('voiceJoin', function(channel, user) {
          console.log(user.username + ' joined channel: ' + user.voiceChannel.name);
          if (user.voiceChannel.name !== 'AFK') {

            var today = new Date();
            var curDate = b.parseDate(today); // "2011-01-23"
            var zeroDate = new Date(0).toISOString();

            var praxusServer = praxBot.servers.get("id", serverId);
            var primaryRole = b.getPrimaryRole(praxusServer.rolesOfUser(user));

            Gamer.findOrCreate({
                where: {
                  userName: user.username
                }
              }, {
                userName: user.username,
                discordUserId: user.id,
                lastForumPost: zeroDate,
                lastForumVisit: zeroDate,
                lastDiscordChatMessage: zeroDate,
                lastDiscordVoiceConnect: zeroDate,
                activeDiscordAccount: "true",
                role: primaryRole
              })
              .then(function(res) {
                var curGamer = res[0];
                curGamer.lastForumPost = (curGamer.lastForumPost) ? curGamer.lastForumPost : zeroDate;
                curGamer.lastForumVisit = (curGamer.lastForumVisit) ? curGamer.lastForumVisit : zeroDate;
                curGamer.lastDiscordChatMessage = (curGamer.lastDiscordChatMessage) ? curGamer.lastDiscordChatMessage : zeroDate;
                curGamer.activeDiscordAccount = "true";
                curGamer.lastDiscordVoiceConnect = curDate.dateISO;
                curGamer.role = primaryRole;
                return curGamer.save();
              })
              .then(function(curGamer) {
                Voiplog.findOrCreate({
                  where: {
                    connectedOn: curDate.dbDate,
                    gamerId: curGamer.id
                  }
                }, {
                  connectedOn: curDate.dbDate,
                  gamerId: curGamer.id
                });
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        });

        // When a Praxian starts a game or changes their username
        praxBot.on('presence', function(userOld, userNew) {
          // If the member starts playing a game
          if (b.presenceGameConditional(userOld, userNew)) {

            var today = new Date();
            var curDate = b.parseDate(today);
            var gameName = b.getGameName(userNew.game.name);
            var zeroDate = new Date(0).toISOString();

            console.log(userNew.username + ' started playing ' + gameName);

            Gamer.findOrCreate({
                where: {
                  userName: userNew.username
                }
              }, {
                userName: userNew.username,
                discordUserId: userNew.id,
                lastForumPost: zeroDate,
                lastForumVisit: zeroDate,
                lastDiscordChatMessage: zeroDate,
                lastDiscordVoiceConnect: zeroDate,
                activeDiscordAccount: "true",
                role: '@Guest'
              })
              .then(function(user) {

                Game.findOrCreate({
                    where: {
                      title: gameName
                    }
                  }, {
                    title: gameName
                  })
                  .then(function(game) {
                    var curGamer = user[0],
                      curGame = game[0];
                    Gamelog.findOrCreate({
                      where: {
                        gamerId: curGamer.id,
                        playedOn: curDate.dbDate,
                        gameId: curGame.id
                      }
                    }, {
                      gamerId: curGamer.id,
                      playedOn: curDate.dbDate,
                      gameId: curGame.id
                    });
                  });
              })
              .catch(function(err) {
                console.log(err);
              });
          } else if (b.presenceUsernameChangeConditional(userOld, userNew)) {
            //if the member changes their username
            var today0 = new Date();
            var curDate0 = b.parseDate(today0);
            var zeroDate0 = new Date(0).toISOString();

            console.log(userOld.username + ' changed username to ' + userNew.username);

            Gamer.findOrCreate({
                where: {
                  userName: userOld.username
                }
              }, {
                userName: userOld.username,
                discordUserId: userOld.id,
                lastForumPost: zeroDate0,
                lastForumVisit: zeroDate0,
                lastDiscordChatMessage: zeroDate0,
                lastDiscordVoiceConnect: zeroDate0,
                activeDiscordAccount: "true",
                role: '@Guest'
              })
              .then(function(user) {
                var curGamer = user[0];
                curGamer.userName = userNew.username;
                return curGamer.save();
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        });

        // Initiate the Cron that will get forum activity
        // cronTime: '0 */15 * * * *' --> every 15 minutes
        var forumCron = new CronJob({
          cronTime: '0 */30 * * * *',
          onTick: function() {
            console.log("Updating forum activity statistics");
            updateForumVariables();
          },
          start: true
        });

        function updateForumVariables() {
          Gamer.find()
            .then(function(allGamers) {
              function updateGamer(i) {
                if (i < allGamers.length) {
                  console.log("Forum Activity Update " + (i + 1) + "/" + allGamers.length + " - " + allGamers[i].userName);
                  var gamerURLTag = ((allGamers[i].forumAlias) ? allGamers[i].forumAlias.toLowerCase() : allGamers[i].userName.toLowerCase().replace(" ", "-")),
                    url = 'http://nodebb.praxusgroup.com/api/user/' + gamerURLTag;
                  request.get({
                    url: url,
                    json: true
                  }, function(e, r, b) {
                    var lastOnline = new Date(0).toISOString(),
                      lastPost = new Date(0).toISOString();
                    if (!e && r.statusCode === 200) {
                      lastOnline = new Date(b.lastonline).toISOString();
                      lastPost = new Date(b.lastposttime).toISOString();
                    }
                    allGamers[i].lastForumPost = lastPost;
                    allGamers[i].lastForumVisit = lastOnline;
                    allGamers[i].save()
                      .then(function(complete) {
                        Forumvisitlog.findOrCreate({
                            where: {
                              visitedOn: lastOnline.substr(0, 10),
                              gamerId: allGamers[i].id
                            }
                          }, {
                            visitedOn: lastOnline.substr(0, 10),
                            gamerId: allGamers[i].id
                          })
                          .then(function(morecomplete) {
                            Forumpostlog.findOrCreate({
                                where: {
                                  postedOn: lastPost.substr(0, 10),
                                  gamerId: allGamers[i].id
                                }
                              }, {
                                postedOn: lastPost.substr(0, 10),
                                gamerId: allGamers[i].id
                              })
                              .then(function(finalcomplete) {
                                updateGamer(i + 1);
                              });
                          });
                      });
                  });
                } else {
                  console.log("Forum activity update completed");
                }
              }
              updateGamer(0);
            })
            .catch(console.log);
        }

        function getAllMembers() {
          console.log("Starting");
          var allMembers = praxBot.servers[0].members;
          var i = 0;
          var zeroDate = new Date(0).toISOString();
          var praxusServer = praxBot.servers.get("id", serverId);
          var primaryRole = "";

          function updateGamer(i) {
            if (i < allMembers.length) {
              primaryRole = b.getPrimaryRole(praxusServer.rolesOfUser(allMembers[i]));
              console.log("Forum Activity Update " + (i + 1) + "/" + allMembers.length + " - " + allMembers[i].username + " " + primaryRole);
              Gamer.findOrCreate({
                  where: {
                    userName: allMembers[i].username
                  }
                }, {
                  userName: allMembers[i].username,
                  discordUserId: allMembers[i].id,
                  lastForumPost: zeroDate,
                  lastForumVisit: zeroDate,
                  lastDiscordChatMessage: zeroDate,
                  lastDiscordVoiceConnect: zeroDate,
                  activeDiscordAccount: "true",
                  role: primaryRole
                })
                .then(function(res) {
                  var curGamer = res[0];
                  curGamer.discordUserId = allMembers[i].id;
                  curGamer.role = primaryRole;
                  return curGamer.save();
                })
                .then(function(complete) {
                  updateGamer(i + 1);
                });
            }
          }
          updateGamer(0);
        }

        function initMemberProperties() {
          console.log("Starting");
          var i = 0;
          var zeroDate = new Date(0).toISOString();

          Gamer.find()
            .then(function(allGamers) {
              function updateGamer(i) {
                if (i < allGamers.length) {
                  console.log("Updating Properties " + (i + 1) + "/" + allGamers.length + " - " + allGamers[i].username);
                  var curGamer = allGamers[i];
                  if (curGamer.lastForumPost) {
                    if (curGamer.lastForumPost === '1980-01-01T00:00:00.000Z') {
                      curGamer.lastForumPost = zeroDate;
                    }
                  }
                  if (curGamer.lastForumVisit) {
                    if (curGamer.lastForumVisit === '1980-01-01T00:00:00.000Z') {
                      curGamer.lastForumVisit = zeroDate;
                    }
                  }
                  curGamer.lastForumPost = (curGamer.lastForumPost) ? curGamer.lastForumPost : zeroDate;
                  curGamer.lastForumVisit = (curGamer.lastForumVisit) ? curGamer.lastForumVisit : zeroDate;
                  curGamer.lastDiscordChatMessage = (curGamer.lastDiscordChatMessage) ? curGamer.lastDiscordChatMessage : zeroDate;
                  curGamer.lastDiscordVoiceConnect = (curGamer.lastDiscordVoiceConnect) ? curGamer.lastDiscordVoiceConnect : zeroDate;
                  curGamer.activeDiscordAccount = (curGamer.activeDiscordAccount) ? curGamer.activeDiscordAccount : "true";
                  curGamer.role = (curGamer.role) ? curGamer.role : '@Guest';
                  curGamer.activeDiscordAccount = "true";
                  curGamer.save()
                    .then(function(completed) {
                      console.log("Updating Properties " + (i + 1) + "/" + allGamers.length + " - " + allGamers[i].username + ' - done');
                      updateGamer(i + 1);
                    });
                }
              }
              updateGamer(0);
            });
        }
      });
  }
};
