import {Component} from 'angular2/core';
import {StatcardsComponent} from './statcards/statcards.component';
import {PopgamelistComponent} from './popgamelist/popgamelist.component';
import {ActivitychartComponent} from './activitychart/activitychart.component';


@Component({
    selector: 'pcm-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    directives: [StatcardsComponent, PopgamelistComponent, ActivitychartComponent]
})

export class DashboardComponent {
    version: string = "0.0.1 - 4/10/2016";
    versionString: string = "Version: " + this.version;
}
