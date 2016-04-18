System.register(['angular2/core', 'angular2/router', './members.service'], function(exports_1, context_1) {
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
    var core_1, router_1, members_service_1;
    var MemberDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (members_service_1_1) {
                members_service_1 = members_service_1_1;
            }],
        execute: function() {
            MemberDetailComponent = (function () {
                function MemberDetailComponent(_membersService, _routeParams, _router) {
                    this._membersService = _membersService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.pageTitle = 'Member Activity';
                    this.currentId = '';
                    this.currentMember = [];
                    this.currentMemberVoiplog = [];
                    this.currentMemberChatlog = [];
                    this.currentMemberForumviewlog = [];
                    this.currentId = this._routeParams.get('id');
                    //let id = +this._routeParams.get('id');
                    //console.log(id);
                    //this.pageTitle += `: ${id}`;
                }
                MemberDetailComponent.prototype.ngOnInit = function () {
                    this.getSingleMember();
                    this.getSingleMemberVoiplog();
                    this.getSingleMemberChatlog();
                    this.getSingleMemberForumviewlog();
                    this.getSingleMemberForumpostlog();
                };
                MemberDetailComponent.prototype.getSingleMember = function () {
                    var _this = this;
                    this._membersService.getSingleMember(this.currentId)
                        .subscribe(function (result) { return _this.currentMember = result; }, function (error) { return _this.errorMessage = error; });
                };
                MemberDetailComponent.prototype.getSingleMemberVoiplog = function () {
                    var _this = this;
                    this._membersService.getSingleMemberVoiplog(this.currentId)
                        .subscribe(function (result) { return _this.renderChartOne(result); }, function (error) { return _this.errorMessage = error; });
                };
                MemberDetailComponent.prototype.getSingleMemberChatlog = function () {
                    var _this = this;
                    this._membersService.getSingleMemberChatlog(this.currentId)
                        .subscribe(function (result) { return _this.renderChartTwo(result); }, function (error) { return _this.errorMessage = error; });
                };
                MemberDetailComponent.prototype.getSingleMemberForumviewlog = function () {
                    var _this = this;
                    this._membersService.getSingleMemberForumviewlog(this.currentId)
                        .subscribe(function (result) { return _this.renderChartThree(result); }, function (error) { return _this.errorMessage = error; });
                };
                MemberDetailComponent.prototype.getSingleMemberForumpostlog = function () {
                    var _this = this;
                    this._membersService.getSingleMemberForumpostlog(this.currentId)
                        .subscribe(function (result) { return _this.renderChartFour(result); }, function (error) { return _this.errorMessage = error; });
                };
                MemberDetailComponent.prototype.onBack = function () {
                    this._router.navigate(['Members']);
                };
                MemberDetailComponent.prototype.renderChartOne = function (CalendarChartDataOne) {
                    google.charts.setOnLoadCallback(drawCalendarChart);
                    function drawCalendarChart() {
                        var dataTable = new google.visualization.DataTable();
                        dataTable.addColumn({
                            type: 'date',
                            id: 'Date'
                        });
                        dataTable.addColumn({
                            type: 'number',
                            id: 'Connected'
                        });
                        dataTable.addRows(CalendarChartDataOne);
                        var chart = new google.visualization.Calendar(document.getElementById('calendar_basic_one'));
                        var options = {
                            title: "Discord Voice",
                            height: 200
                        };
                        chart.draw(dataTable, options);
                    }
                };
                MemberDetailComponent.prototype.renderChartTwo = function (CalendarChartData) {
                    google.charts.setOnLoadCallback(drawCalendarChart);
                    function drawCalendarChart() {
                        var dataTable = new google.visualization.DataTable();
                        dataTable.addColumn({
                            type: 'date',
                            id: 'Date'
                        });
                        dataTable.addColumn({
                            type: 'number',
                            id: 'Connected'
                        });
                        dataTable.addRows(CalendarChartData);
                        var chart = new google.visualization.Calendar(document.getElementById('calendar_basic_two'));
                        var options = {
                            title: "Discord Chat",
                            height: 200
                        };
                        chart.draw(dataTable, options);
                    }
                };
                MemberDetailComponent.prototype.renderChartThree = function (CalendarChartData) {
                    google.charts.setOnLoadCallback(drawCalendarChart);
                    function drawCalendarChart() {
                        var dataTable = new google.visualization.DataTable();
                        dataTable.addColumn({
                            type: 'date',
                            id: 'Date'
                        });
                        dataTable.addColumn({
                            type: 'number',
                            id: 'Connected'
                        });
                        dataTable.addRows(CalendarChartData);
                        var chart = new google.visualization.Calendar(document.getElementById('calendar_basic_three'));
                        var options = {
                            title: "Forum View",
                            height: 200
                        };
                        chart.draw(dataTable, options);
                    }
                };
                MemberDetailComponent.prototype.renderChartFour = function (CalendarChartData) {
                    google.charts.setOnLoadCallback(drawCalendarChart);
                    function drawCalendarChart() {
                        var dataTable = new google.visualization.DataTable();
                        dataTable.addColumn({
                            type: 'date',
                            id: 'Date'
                        });
                        dataTable.addColumn({
                            type: 'number',
                            id: 'Connected'
                        });
                        dataTable.addRows(CalendarChartData);
                        var chart = new google.visualization.Calendar(document.getElementById('calendar_basic_four'));
                        var options = {
                            title: "Forum View",
                            height: 200
                        };
                        chart.draw(dataTable, options);
                    }
                };
                MemberDetailComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/members/memberdetail.component.html'
                    }), 
                    __metadata('design:paramtypes', [members_service_1.MembersService, router_1.RouteParams, router_1.Router])
                ], MemberDetailComponent);
                return MemberDetailComponent;
            }());
            exports_1("MemberDetailComponent", MemberDetailComponent);
        }
    }
});
//# sourceMappingURL=memberdetail.component.js.map