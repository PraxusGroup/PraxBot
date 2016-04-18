import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, Router, Location} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardService} from './dashboard/dashboard.service';
import {MembersComponent} from './members/members.component';
import {MemberDetailComponent} from './members/memberdetail.component';
import {MembersService} from './members/members.service';


@RouteConfig([
  {path: '/', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
  {path: '/members', name: 'Members', component: MembersComponent},
  {path: '/member/:id', name: 'MemberDetail', component: MemberDetailComponent}
])

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, DashboardService, MembersService]
})

export class AppComponent {
    pageTitle: string = "PraxBotMetrics";
}
