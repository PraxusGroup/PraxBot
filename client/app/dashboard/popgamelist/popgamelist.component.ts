import {Component, OnInit} from 'angular2/core';
import {DashboardService} from '../dashboard.service';


@Component({
    selector: 'pcm-popgamelist',
    templateUrl: 'app/dashboard/popgamelist/popgamelist.component.html'
})

export class PopgamelistComponent implements OnInit {
  popularGameList: any;
  errorMessage: any;

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {
    this.getWeekPopularGames();
  }

  getWeekPopularGames() {
    this._dashboardService.getWeekPopularGames()
                     .subscribe(
                       result => this.popularGameList = result,
                       error =>  this.errorMessage = <any>error);
  }
}
