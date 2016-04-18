import {Component, OnInit} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {MembersService} from './members.service';
import {MemberFilterPipe} from './member-filter.pipe';


@Component({
    selector: 'pcm-memberlist',
    templateUrl: 'app/members/members.component.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [MemberFilterPipe]
})

export class MembersComponent implements OnInit {
  allMembers: any;
  errorMessage: any;
  listFilter: string = '';

  constructor(private _membersService: MembersService) {}

  ngOnInit() {
    this.getAllMembers();
  }

  getAllMembers() {
    this._membersService.getAllMembers()
                     .subscribe(
                       result => this.allMembers = result,
                       error =>  this.errorMessage = <any>error);
  }
}
