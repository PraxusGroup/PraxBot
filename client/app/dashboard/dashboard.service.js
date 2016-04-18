System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var DashboardService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            DashboardService = (function () {
                function DashboardService(_http) {
                    this._http = _http;
                    this._getDiscordAccountCountUrl = 'http://159.203.160.46:3000/api/gamers/count';
                    this._getForumAccountsUrl = 'http://159.203.160.46:3000/api/gamers/getforumaccountscount';
                    this._getMemberCountUrl = 'http://159.203.160.46:3000/api/gamers/getmembersonlycount';
                    this._getGameCountUrl = 'http://159.203.160.46:3000/api/games/count';
                    this._getAllActivityUrl = 'http://159.203.160.46:3000/api/voiplogs/getallactivitydata';
                    this._getThisWeekPopularGamesUrl = 'http://159.203.160.46:3000/api/gamepopularitylogs/getweeklist?weeknumber=';
                    this._weekNo = moment().isoWeek();
                }
                DashboardService.prototype.getDiscordAccountCount = function () {
                    return this._http.get(this._getDiscordAccountCountUrl)
                        .map(function (res) { return res.json(); });
                };
                DashboardService.prototype.getForumAccountCount = function () {
                    return this._http.get(this._getForumAccountsUrl)
                        .map(function (res) { return res.json(); });
                };
                DashboardService.prototype.getMemberCount = function () {
                    return this._http.get(this._getMemberCountUrl)
                        .map(function (res) { return res.json(); });
                };
                DashboardService.prototype.getGameCount = function () {
                    return this._http.get(this._getGameCountUrl)
                        .map(function (res) { return res.json(); });
                };
                DashboardService.prototype.getWeekPopularGames = function () {
                    return this._http.get(this._getThisWeekPopularGamesUrl + this._weekNo)
                        .map(function (res) { return res.json(); });
                };
                DashboardService.prototype.getAllActivity = function () {
                    return this._http.get(this._getAllActivityUrl)
                        .map(function (res) { return res.json(); });
                };
                DashboardService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DashboardService);
                return DashboardService;
            }());
            exports_1("DashboardService", DashboardService);
        }
    }
});
//# sourceMappingURL=dashboard.service.js.map