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
    praxBot = new discord.Client(),
    Gamer = app.models.Gamer,
    Voiplog = app.models.Voiplog,
    Chatlog = app.models.Chatlog,
    Gamelog = app.models.Gamelog,
    Game = app.models.Game,
    botLogin = config.praxbot.login,
    botPassword = config.praxbot.password,
    generalChannelId = config.praxbot.generalChatChannelId,
    serverId = config.praxbot.id;

  praxBot.login(botLogin, botPassword);
  console.log('Praxbot Connected');

  /* On a disconnect, usually due to DDOS attacks*/
  /* We will wait 5 seconds and log back in.*/
  praxBot.on('disconnected', function() {
    console.log('Praxbot Disconnected... attempting to reconnect.');
    setTimeout(function() {
      praxBot.login(botLogin, botPassword);
      console.log('Praxbot Connected');
    }, 5000);
  });


  /* On a new user joining the server for the first time*/
  praxBot.on('serverNewMember', function(server, newDude) {
    /* 129037173486911488 is the id for the "general" textChannel */
    praxBot.sendMessage(generalChannelId, newDude.username +
      ' is new on the Praxus Discord. Welcome ' +
      newDude.username + '. Feel free to introduce yourself!');
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
      console.log(message);
    }
    // A little extra bot support for a powerful Drevan move.
    if (content === 'get dunked' &&
      author === 'Drevan') {
      praxBot.sendMessage(message, 'Oh snap!');
    }

    var today = new Date();
    var curDate = b.parseDate(today);

    /* We're going to add a log of the user posting */
    /* a chat message once per day, per user */
    Gamer.findOrCreate({
        where: {
          userName: author
        }
      }, {
        userName: author
      })
      .then(function(res) {
        var curGamer = res[0];
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
      .catch(console.log);
  });

  // When a Praxian joins a voice channel
  praxBot.on('voiceJoin', function(channel, user) {
    console.log(user.username + ' joined channel: ' + user.voiceChannel.name);
    if (user.voiceChannel.name !== 'AFK') {

      var today = new Date();
      var curDate = b.parseDate(today); // "2011-01-23"

      var praxusServer = praxBot.servers.get("id", serverId);
      var primaryRole = b.getPrimaryRole(praxusServer.rolesOfUser(user));

      Gamer.findOrCreate({
          where: {
            userName: user.username
          }
        }, {
          userName: user.username
        })
        .then(function(res) {
          var curGamer = res[0];
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
        .catch(console.log);
    }
  });

  // When a Praxian starts a game
  praxBot.on('presence', function(userOld, userNew) {
    if ((userOld.status === userNew.status) && ((userNew.game && !userOld.game) || (userNew.game && userOld.game))) {
      var today = new Date();
      var curDate = b.parseDate(today);
      var gameName = b.getGameName(userNew.game.name);

      console.log(userNew.username + ' started playing ' + gameName);

      Gamer.findOrCreate({
          where: {
            userName: userNew.username
          }
        }, {
          userName: userNew.username
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
        .catch(console.log);
    }
  });
};
