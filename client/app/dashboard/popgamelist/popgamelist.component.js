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
    var PopgamelistComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            }],
        execute: function() {
            PopgamelistComponent = (function () {
                function PopgamelistComponent(_dashboardService) {
                    this._dashboardService = _dashboardService;
                }
                PopgamelistComponent.prototype.ngOnInit = function () {
                    this.getWeekPopularGames();
                };
                PopgamelistComponent.prototype.getWeekPopularGames = function () {
                    var _this = this;
                    this._dashboardService.getWeekPopularGames()
                        .subscribe(function (result) { return _this.popularGameList = result; }, function (error) { return _this.errorMessage = error; });
                };
                PopgamelistComponent = __decorate([
                    core_1.Component({
                        selector: 'pcm-popgamelist',
                        templateUrl: 'app/dashboard/popgamelist/popgamelist.component.html'
                    }), 
                    __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
                ], PopgamelistComponent);
                return PopgamelistComponent;
            }());
            exports_1("PopgamelistComponent", PopgamelistComponent);
        }
    }
});
//# sourceMappingURL=popgamelist.component.js.map