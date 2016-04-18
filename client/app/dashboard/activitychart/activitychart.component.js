System.register(['angular2/core', '../dashboard.service'], function(exports_1, context_1) {
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
    var core_1, dashboard_service_1;
    var ActivitychartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            }],
        execute: function() {
            ActivitychartComponent = (function () {
                function ActivitychartComponent(_dashboardService) {
                    this._dashboardService = _dashboardService;
                    this.allGameActivity = [];
                }
                ActivitychartComponent.prototype.ngOnInit = function () {
                    this.getActivity();
                };
                ActivitychartComponent.prototype.getActivity = function () {
                    var _this = this;
                    this._dashboardService.getAllActivity()
                        .subscribe(function (result) { return _this.renderChart(result); }, function (error) { return _this.errorMessage = error; });
                };
                ActivitychartComponent.prototype.renderChart = function (lineChartData) {
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
                };
                ActivitychartComponent = __decorate([
                    core_1.Component({
                        selector: 'pcm-activitychart',
                        templateUrl: 'app/dashboard/activitychart/activitychart.component.html'
                    }), 
                    __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
                ], ActivitychartComponent);
                return ActivitychartComponent;
            }());
            exports_1("ActivitychartComponent", ActivitychartComponent);
        }
    }
});
//# sourceMappingURL=activitychart.component.js.map