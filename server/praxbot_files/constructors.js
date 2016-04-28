// Get all repos from the cache
var r = require('../praxbot_files/depFactory');
var utility = require('../praxbot_files/utility');

var constructors = function() {


  var BotObject = function() {
    r.func.log('constructor - BotObject - start');
    this.client = new r.discord.Client(r.config.praxbot.botOptions);
    this.botLogin = r.config.praxbot.login;
    this.botPassw = r.config.praxbot.password;
    this.general = r.config.praxbot.generalChatChannelId;
    this.serverId = r.config.praxbot.id;
    this.serverObject = this.client.servers.get('id', this.serverId);
  };

  var DecisionObject = function (message) {
    this.answer = '';
    this.reply = '';
    this.originalContent = message.content;
    this.originalContentLc = message.content.toLowerCase();
    this.authorObject = message.author;
    this.author = message.author.username;
  };

  var ChatlogObject = function(user) {
    var curDateString = r.moment().format('YYYY-MM-DD');
    this.where = {
      where: {
        chatOn: curDateString,
        gamerId: user.id
      }
    };
    this.save = {
      chatOn: curDateString,
      gamerId: user.id
    };
  };

  var ModelsObject = function() {
    r.func.log('constructor - ModelsObject');
    this.Gamer = r.app.models.Gamer;
    this.Voiplog = r.app.models.Voiplog;
    this.Chatlog = r.app.models.Chatlog;
    this.Gamelog = r.app.models.Gamelog;
    this.Forumvisitlog = r.app.models.Forumvisitlog;
    this.Forumpostlog = r.app.models.Forumpostlog;
    this.Gamepopularitylog = r.app.models.Gamepopularitylog;
    this.Game = r.app.models.Game;
    this.Quote = r.app.models.Quote;
  };

  var QuoteCategoryObject = function(category) {
    r.func.log('constructor - QuoteCategoryObject');
    return {
      where: {
        category: category
      }
    };
  };

  var UserObject = function(server, user) {
    r.func.log('constructor - UserObject - ' + user.username, 3);
    var zeroDate = new Date(0).toISOString();
    var primaryRole = utility.getPrimaryRole(server.rolesOfUser(user));
    this.where = {
      where: {
        userName: user.username
      }
    };
    this.save = {
      userName: user.username,
      discordUserId: user.id,
      lastForumPost: zeroDate,
      lastForumVisit: zeroDate,
      lastDiscordChatMessage: zeroDate,
      lastDiscordVoiceConnect: zeroDate,
      activeDiscordAccount: 'true',
      role: primaryRole
    };
  };

  return {
    UserObject: UserObject,
    BotObject: BotObject,
    ModelsObject: ModelsObject,
    DecisionObject: DecisionObject,
    QuoteCategoryObject: QuoteCategoryObject,
    ChatlogObject: ChatlogObject
  };
};

module.exports = constructors();
