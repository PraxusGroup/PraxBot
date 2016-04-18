import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
declare var moment: any;


@Injectable()

export class MembersService {

    private _getAllMembersUrl = 'http://159.203.160.46:3000/api/gamers'
    private _getSingleMemberVoiplogUrl = 'http://159.203.160.46:3000/api/voiplogs?filter[where][gamerId]='
    private _getSingleMemberChatlogUrl = 'http://159.203.160.46:3000/api/chatlogs?filter[where][gamerId]='
    private _getSingleMemberForumviewlogUrl = 'http://159.203.160.46:3000/api/forumvisitlogs?filter[where][gamerId]='
    private _getSingleMemberForumpostlogUrl = 'http://159.203.160.46:3000/api/forumpostlogs?filter[where][gamerId]='

    constructor(private _http: Http) { }

    getAllMembers(): Observable<any> {
        return this._http.get(this._getAllMembersUrl)
            .map(function(value) {
            var newArray = value.json();
            newArray.sort(function(a,b){
              if(a.userName < b.userName) return -1;
              if(a.userName > b.userName) return 1;
              return 0;
            });
            console.log(newArray);
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i].lastDiscordVoiceConnect === '1970-01-01T00:00:00.000Z') {
                    newArray[i].lastDiscordVoiceConnect = ''
                } else {
                    newArray[i].lastDiscordVoiceConnect = moment(newArray[i].lastDiscordVoiceConnect).format('MMMM Do YYYY, h:mm:ss a');
                }

                if (newArray[i].lastDiscordChatMessage === '1970-01-01T00:00:00.000Z') {
                    newArray[i].lastDiscordChatMessage = ''
                } else {
                    newArray[i].lastDiscordChatMessage = moment(newArray[i].lastDiscordChatMessage).format('MMMM Do YYYY, h:mm:ss a');
                }

                if (newArray[i].lastForumVisit === '1970-01-01T00:00:00.000Z') {
                    newArray[i].lastForumVisit = ''
                } else {
                    newArray[i].lastForumVisit = moment(newArray[i].lastForumVisit).format('MMMM Do YYYY, h:mm:ss a');
                }

                if (newArray[i].lastForumPost === '1970-01-01T00:00:00.000Z') {
                    newArray[i].lastForumPost = ''
                } else {
                    newArray[i].lastForumPost = moment(newArray[i].lastForumPost).format('MMMM Do YYYY, h:mm:ss a');
                }
            }
            return newArray;
        })
        //.map(res => res.json())
    }

    getSingleMember(id): Observable<any> {
        return this._http.get(this._getAllMembersUrl + '/' + id)
            .map(function(value) {
            var newArray = value.json();
                if (newArray.lastDiscordVoiceConnect === '1970-01-01T00:00:00.000Z') {
                    newArray.lastDiscordVoiceConnect = ''
                } else {
                    newArray.lastDiscordVoiceConnect = moment(newArray.lastDiscordVoiceConnect).format('MMMM Do YYYY, h:mm:ss a');
                }

                if (newArray.lastDiscordChatMessage === '1970-01-01T00:00:00.000Z') {
                    newArray.lastDiscordChatMessage = ''
                } else {
                    newArray.lastDiscordChatMessage = moment(newArray.lastDiscordChatMessage).format('MMMM Do YYYY, h:mm:ss a');
                }

                if (newArray.lastForumVisit === '1970-01-01T00:00:00.000Z') {
                    newArray.lastForumVisit = ''
                } else {
                    newArray.lastForumVisit = moment(newArray.lastForumVisit).format('MMMM Do YYYY, h:mm:ss a');
                }

                if (newArray.lastForumPost === '1970-01-01T00:00:00.000Z') {
                    newArray.lastForumPost = ''
                } else {
                    newArray.lastForumPost = moment(newArray.lastForumPost).format('MMMM Do YYYY, h:mm:ss a');
                }

            return newArray;
        })
        //.map(res => res.json())
    }
    getSingleMemberVoiplog(id): Observable<any> {
        return this._http.get(this._getSingleMemberVoiplogUrl + id)
            .map(function(value) {
            var newArray = value.json();
            var endData = [];
            var b = moment(newArray[newArray.length-1].connectedOn.substr(0, 10)).toDate();
            for (let i = 0; i < newArray.length; i++) {
              var a = moment(newArray[i].connectedOn.substr(0, 10)).toDate();
              endData.push([a, 1]);
            }
            endData.push([b, 0]);
            return endData;
        })
        //.map(res => res.json())
    }
    getSingleMemberChatlog(id): Observable<any> {
        return this._http.get(this._getSingleMemberChatlogUrl + id)
            .map(function(value) {
            var newArray = value.json();
            var endData = [];
            var b = moment(newArray[newArray.length-1].chatOn.substr(0, 10)).toDate();
            for (let i = 0; i < newArray.length; i++) {
              var a = moment(newArray[i].chatOn.substr(0, 10)).toDate();
              endData.push([a, 1]);
            }
            endData.push([b, 0]);
            return endData;
        })
        //.map(res => res.json())
    }
    getSingleMemberForumviewlog(id): Observable<any> {
        return this._http.get(this._getSingleMemberForumviewlogUrl + id)
            .map(function(value) {
            var newArray = value.json();
            var endData = [];
            var b = moment(newArray[newArray.length-1].visitedOn.substr(0, 10)).toDate();
            for (let i = 0; i < newArray.length; i++) {
              var a = moment(newArray[i].visitedOn.substr(0, 10)).toDate();
              endData.push([a, 1]);
            }
            endData.push([b, 0]);
            return endData;
        })
        //.map(res => res.json())
    }
    getSingleMemberForumpostlog(id): Observable<any> {
        return this._http.get(this._getSingleMemberForumpostlogUrl + id)
            .map(function(value) {
            var newArray = value.json();
            var endData = [];
            var b = moment(newArray[newArray.length-1].postedOn.substr(0, 10)).toDate();
            for (let i = 0; i < newArray.length; i++) {
              var a = moment(newArray[i].postedOn.substr(0, 10)).toDate();
              endData.push([a, 1]);
            }
            endData.push([b, 0]);
            return endData;
        })
        //.map(res => res.json())
    }
}
