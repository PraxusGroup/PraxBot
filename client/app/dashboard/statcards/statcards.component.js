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
    var StatcardsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dashboard_service_1_1) {
                dashboard_service_1 = dashboard_service_1_1;
            }],
        execute: function() {
            StatcardsComponent = (function () {
                function StatcardsComponent(_dashboardService) {
                    this._dashboardService = _dashboardService;
                }
                StatcardsComponent.prototype.ngOnInit = function () {
                    this.getDiscordAccountCount();
                    this.getForumAccountCount();
                    this.getMemberCount();
                    this.getGameCount();
                };
                StatcardsComponent.prototype.getDiscordAccountCount = function () {
                    var _this = this;
                    this._dashboardService.getDiscordAccountCount()
                        .subscribe(function (result) { return _this.discordAccountCount = result.count; }, function (error) { return _this.errorMessage = error; });
                };
                StatcardsComponent.prototype.getForumAccountCount = function () {
                    var _this = this;
                    this._dashboardService.getForumAccountCount()
                        .subscribe(function (result) { return _this.forumAccountCount = result.count; }, function (error) { return _this.errorMessage = error; });
                };
                StatcardsComponent.prototype.getMemberCount = function () {
                    var _this = this;
                    this._dashboardService.getMemberCount()
                        .subscribe(function (result) { return _this.memberCount = result.count; }, function (error) { return _this.errorMessage = error; });
                };
                StatcardsComponent.prototype.getGameCount = function () {
                    var _this = this;
                    this._dashboardService.getGameCount()
                        .subscribe(function (result) { return _this.gameCount = result.count; }, function (error) { return _this.errorMessage = error; });
                };
                StatcardsComponent = __decorate([
                    core_1.Component({
                        selector: 'pcm-statcards',
                        templateUrl: 'app/dashboard/statcards/statcards.component.html'
                    }), 
                    __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
                ], StatcardsComponent);
                return StatcardsComponent;
            }());
            exports_1("StatcardsComponent", StatcardsComponent);
        }
    }
});
//# sourceMappingURL=statcards.component.js.map