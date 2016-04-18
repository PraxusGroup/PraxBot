import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
declare var moment: any;


@Injectable()

export class DashboardService {

    private _getDiscordAccountCountUrl = 'http://159.203.160.46:3000/api/gamers/count'
    private _getForumAccountsUrl = 'http://159.203.160.46:3000/api/gamers/getforumaccountscount'
    private _getMemberCountUrl = 'http://159.203.160.46:3000/api/gamers/getmembersonlycount'
    private _getGameCountUrl = 'http://159.203.160.46:3000/api/games/count'
    private _getAllActivityUrl = 'http://159.203.160.46:3000/api/voiplogs/getallactivitydata'
    private _getThisWeekPopularGamesUrl = 'http://159.203.160.46:3000/api/gamepopularitylogs/getweeklist?weeknumber='
    private _weekNo = moment().isoWeek()


    constructor(private _http: Http) { }

    getDiscordAccountCount(): Observable<any> {
        return this._http.get(this._getDiscordAccountCountUrl)
            .map(res => res.json())
    }

    getForumAccountCount(): Observable<any> {
        return this._http.get(this._getForumAccountsUrl)
            .map(res => res.json())
    }

    getMemberCount(): Observable<any> {
        return this._http.get(this._getMemberCountUrl)
            .map(res => res.json())
    }

    getGameCount(): Observable<any> {
        return this._http.get(this._getGameCountUrl)
            .map(res => res.json())
    }

    getWeekPopularGames(): Observable<any> {
        return this._http.get(this._getThisWeekPopularGamesUrl+this._weekNo)
            .map(res => res.json())
    }

    getAllActivity(): Observable<any> {
        return this._http.get(this._getAllActivityUrl)
            .map(res => res.json())
    }
}
