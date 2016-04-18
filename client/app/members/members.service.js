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
    var MembersService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            MembersService = (function () {
                function MembersService(_http) {
                    this._http = _http;
                    this._getAllMembersUrl = 'http://159.203.160.46:3000/api/gamers';
                    this._getSingleMemberVoiplogUrl = 'http://159.203.160.46:3000/api/voiplogs?filter[where][gamerId]=';
                    this._getSingleMemberChatlogUrl = 'http://159.203.160.46:3000/api/chatlogs?filter[where][gamerId]=';
                    this._getSingleMemberForumviewlogUrl = 'http://159.203.160.46:3000/api/forumvisitlogs?filter[where][gamerId]=';
                    this._getSingleMemberForumpostlogUrl = 'http://159.203.160.46:3000/api/forumpostlogs?filter[where][gamerId]=';
                }
                MembersService.prototype.getAllMembers = function () {
                    return this._http.get(this._getAllMembersUrl)
                        .map(function (value) {
                        var newArray = value.json();
                        newArray.sort(function (a, b) {
                            if (a.userName < b.userName)
                                return -1;
                            if (a.userName > b.userName)
                                return 1;
                            return 0;
                        });
                        console.log(newArray);
                        for (var i = 0; i < newArray.length; i++) {
                            if (newArray[i].lastDiscordVoiceConnect === '1970-01-01T00:00:00.000Z') {
                                newArray[i].lastDiscordVoiceConnect = '';
                            }
                            else {
                                newArray[i].lastDiscordVoiceConnect = moment(newArray[i].lastDiscordVoiceConnect).format('MMMM Do YYYY, h:mm:ss a');
                            }
                            if (newArray[i].lastDiscordChatMessage === '1970-01-01T00:00:00.000Z') {
                                newArray[i].lastDiscordChatMessage = '';
                            }
                            else {
                                newArray[i].lastDiscordChatMessage = moment(newArray[i].lastDiscordChatMessage).format('MMMM Do YYYY, h:mm:ss a');
                            }
                            if (newArray[i].lastForumVisit === '1970-01-01T00:00:00.000Z') {
                                newArray[i].lastForumVisit = '';
                            }
                            else {
                                newArray[i].lastForumVisit = moment(newArray[i].lastForumVisit).format('MMMM Do YYYY, h:mm:ss a');
                            }
                            if (newArray[i].lastForumPost === '1970-01-01T00:00:00.000Z') {
                                newArray[i].lastForumPost = '';
                            }
                            else {
                                newArray[i].lastForumPost = moment(newArray[i].lastForumPost).format('MMMM Do YYYY, h:mm:ss a');
                            }
                        }
                        return newArray;
                    });
                    //.map(res => res.json())
                };
                MembersService.prototype.getSingleMember = function (id) {
                    return this._http.get(this._getAllMembersUrl + '/' + id)
                        .map(function (value) {
                        var newArray = value.json();
                        if (newArray.lastDiscordVoiceConnect === '1970-01-01T00:00:00.000Z') {
                            newArray.lastDiscordVoiceConnect = '';
                        }
                        else {
                            newArray.lastDiscordVoiceConnect = moment(newArray.lastDiscordVoiceConnect).format('MMMM Do YYYY, h:mm:ss a');
                        }
                        if (newArray.lastDiscordChatMessage === '1970-01-01T00:00:00.000Z') {
                            newArray.lastDiscordChatMessage = '';
                        }
                        else {
                            newArray.lastDiscordChatMessage = moment(newArray.lastDiscordChatMessage).format('MMMM Do YYYY, h:mm:ss a');
                        }
                        if (newArray.lastForumVisit === '1970-01-01T00:00:00.000Z') {
                            newArray.lastForumVisit = '';
                        }
                        else {
                            newArray.lastForumVisit = moment(newArray.lastForumVisit).format('MMMM Do YYYY, h:mm:ss a');
                        }
                        if (newArray.lastForumPost === '1970-01-01T00:00:00.000Z') {
                            newArray.lastForumPost = '';
                        }
                        else {
                            newArray.lastForumPost = moment(newArray.lastForumPost).format('MMMM Do YYYY, h:mm:ss a');
                        }
                        return newArray;
                    });
                    //.map(res => res.json())
                };
                MembersService.prototype.getSingleMemberVoiplog = function (id) {
                    return this._http.get(this._getSingleMemberVoiplogUrl + id)
                        .map(function (value) {
                        var newArray = value.json();
                        var endData = [];
                        var b = moment(newArray[newArray.length - 1].connectedOn.substr(0, 10)).toDate();
                        for (var i = 0; i < newArray.length; i++) {
                            var a = moment(newArray[i].connectedOn.substr(0, 10)).toDate();
                            endData.push([a, 1]);
                        }
                        endData.push([b, 0]);
                        return endData;
                    });
                    //.map(res => res.json())
                };
                MembersService.prototype.getSingleMemberChatlog = function (id) {
                    return this._http.get(this._getSingleMemberChatlogUrl + id)
                        .map(function (value) {
                        var newArray = value.json();
                        var endData = [];
                        var b = moment(newArray[newArray.length - 1].chatOn.substr(0, 10)).toDate();
                        for (var i = 0; i < newArray.length; i++) {
                            var a = moment(newArray[i].chatOn.substr(0, 10)).toDate();
                            endData.push([a, 1]);
                        }
                        endData.push([b, 0]);
                        return endData;
                    });
                    //.map(res => res.json())
                };
                MembersService.prototype.getSingleMemberForumviewlog = function (id) {
                    return this._http.get(this._getSingleMemberForumviewlogUrl + id)
                        .map(function (value) {
                        var newArray = value.json();
                        var endData = [];
                        var b = moment(newArray[newArray.length - 1].visitedOn.substr(0, 10)).toDate();
                        for (var i = 0; i < newArray.length; i++) {
                            var a = moment(newArray[i].visitedOn.substr(0, 10)).toDate();
                            endData.push([a, 1]);
                        }
                        endData.push([b, 0]);
                        return endData;
                    });
                    //.map(res => res.json())
                };
                MembersService.prototype.getSingleMemberForumpostlog = function (id) {
                    return this._http.get(this._getSingleMemberForumpostlogUrl + id)
                        .map(function (value) {
                        var newArray = value.json();
                        var endData = [];
                        var b = moment(newArray[newArray.length - 1].postedOn.substr(0, 10)).toDate();
                        for (var i = 0; i < newArray.length; i++) {
                            var a = moment(newArray[i].postedOn.substr(0, 10)).toDate();
                            endData.push([a, 1]);
                        }
                        endData.push([b, 0]);
                        return endData;
                    });
                    //.map(res => res.json())
                };
                MembersService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MembersService);
                return MembersService;
            }());
            exports_1("MembersService", MembersService);
        }
    }
});
//# sourceMappingURL=members.service.js.map