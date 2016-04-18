import {Component, OnInit} from 'angular2/core';
import {DashboardService} from '../dashboard.service';


@Component({
    selector: 'pcm-statcards',
    templateUrl: 'app/dashboard/statcards/statcards.component.html'
})

export class StatcardsComponent implements OnInit {
  discordAccountCount: any;
  forumAccountCount: any;
  memberCount: any;
  gameCount: any;
  errorMessage: any;

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDiscordAccountCount();
    this.getForumAccountCount();
    this.getMemberCount();
    this.getGameCount();
  }

  getDiscordAccountCount() {
    this._dashboardService.getDiscordAccountCount()
                     .subscribe(
                       result => this.discordAccountCount = result.count,
                       error =>  this.errorMessage = <any>error);
  }

  getForumAccountCount() {
    this._dashboardService.getForumAccountCount()
                     .subscribe(
                       result => this.forumAccountCount = result.count,
                       error =>  this.errorMessage = <any>error);
  }
  getMemberCount() {
    this._dashboardService.getMemberCount()
                     .subscribe(
                       result => this.memberCount = result.count,
                       error =>  this.errorMessage = <any>error);
  }
  getGameCount() {
    this._dashboardService.getGameCount()
                     .subscribe(
                       result => this.gameCount = result.count,
                       error =>  this.errorMessage = <any>error);
  }
}
