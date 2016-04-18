System.register(['angular2/core', './statcards/statcards.component', './popgamelist/popgamelist.component', './activitychart/activitychart.component'], function(exports_1, context_1) {
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
    var core_1, statcards_component_1, popgamelist_component_1, activitychart_component_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (statcards_component_1_1) {
                statcards_component_1 = statcards_component_1_1;
            },
            function (popgamelist_component_1_1) {
                popgamelist_component_1 = popgamelist_component_1_1;
            },
            function (activitychart_component_1_1) {
                activitychart_component_1 = activitychart_component_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent() {
                    this.version = "0.0.1 - 4/10/2016";
                    this.versionString = "Version: " + this.version;
                }
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'pcm-dashboard',
                        templateUrl: 'app/dashboard/dashboard.component.html',
                        directives: [statcards_component_1.StatcardsComponent, popgamelist_component_1.PopgamelistComponent, activitychart_component_1.ActivitychartComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map