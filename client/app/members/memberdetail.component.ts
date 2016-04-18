import { Component, OnInit } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';
import {MembersService} from './members.service';
declare var google: any;

@Component({
    templateUrl: 'app/members/memberdetail.component.html'
})

export class MemberDetailComponent implements OnInit {
    pageTitle: string = 'Member Activity';
    currentId: string = '';
    currentMember: any = [];
    currentMemberVoiplog: any = [];
    currentMemberChatlog: any = [];
    currentMemberForumviewlog: any = [];
    errorMessage: any;

    constructor(private _membersService: MembersService,
        private _routeParams: RouteParams,
        private _router: Router) {
        this.currentId = this._routeParams.get('id');
        //let id = +this._routeParams.get('id');
        //console.log(id);
        //this.pageTitle += `: ${id}`;
    }

    ngOnInit() {
        this.getSingleMember();
        this.getSingleMemberVoiplog();
        this.getSingleMemberChatlog();
        this.getSingleMemberForumviewlog();
        this.getSingleMemberForumpostlog();
    }

    getSingleMember() {
        this._membersService.getSingleMember(this.currentId)
            .subscribe(
            result => this.currentMember = result,
            error => this.errorMessage = <any>error);
    }

    getSingleMemberVoiplog() {
        this._membersService.getSingleMemberVoiplog(this.currentId)
            .subscribe(
            result => this.renderChartOne(result),
            error => this.errorMessage = <any>error);
    }

    getSingleMemberChatlog() {
        this._membersService.getSingleMemberChatlog(this.currentId)
            .subscribe(
            result => this.renderChartTwo(result),
            error => this.errorMessage = <any>error);
    }

    getSingleMemberForumviewlog() {
        this._membersService.getSingleMemberForumviewlog(this.currentId)
            .subscribe(
            result => this.renderChartThree(result),
            error => this.errorMessage = <any>error);
    }

    getSingleMemberForumpostlog() {
        this._membersService.getSingleMemberForumpostlog(this.currentId)
            .subscribe(
            result => this.renderChartFour(result),
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['Members']);
    }

    renderChartOne(CalendarChartDataOne) {

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
    }

    renderChartTwo(CalendarChartData) {

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
    }

    renderChartThree(CalendarChartData) {

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
    }

    renderChartFour(CalendarChartData) {

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
    }
}
