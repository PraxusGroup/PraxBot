import {Component, OnInit} from 'angular2/core';
import {DashboardService} from '../dashboard.service';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
declare var google: any;


@Component({
    selector: 'pcm-activitychart',
    templateUrl: 'app/dashboard/activitychart/activitychart.component.html'
})

export class ActivitychartComponent implements OnInit {
  allGameActivity: any = [];
  errorMessage: any;


  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {
    this.getActivity();
  }

  getActivity() {
    this._dashboardService.getAllActivity()
                     .subscribe(
                       result => this.renderChart(result),
                       error =>  this.errorMessage = <any>error);
  }

  renderChart(lineChartData) {
    google.charts.setOnLoadCallback(drawLineChart);

    function drawLineChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'X');
      data.addColumn('number', 'Discord Voice');
      data.addColumn('number', 'Discord Chat');
      data.addColumn('number', 'Forum View');
      data.addColumn('number', 'Forum Post');

      data.addRows(lineChartData);
      //data.addRows(data);

      var options = {
        title: '',
        legend: {
          position: 'top'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

      chart.draw(data, options);
    }
  }
}
