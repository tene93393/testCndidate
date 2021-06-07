import { Component, OnInit } from '@angular/core';
import { UserAuthorityService } from "src/app/feature/dash-board/service/user-authority.service";
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-authority-dashboard',
  templateUrl: './authority-dashboard.component.html',
  styleUrls: ['./authority-dashboard.component.css'],
  providers: [UserAuthorityService]
})
export class AuthorityDashboardComponent implements OnInit {
  authority: any[] = []
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userAuthorityService:UserAuthorityService
  ) { }

  async ngOnInit() {
    let userprofile = await this._userAuthorityService.getUserProfileById(-1)
    this.authority = (await this._userAuthorityService.getUserAuthority(userprofile.user.id,0)).filter(element=>element.used=="Y")
    console.log(this.authority)
    // this._userAuthorityService.getUserProfileById(-1).then(res=>{
    //   console.log(res)
      
    // })
  }

  gotoModule(item) {
    console.log(item.authority.code)
    this._router.navigate(["../../"+item.authority.linkURL, { id: item.authority.id }], { relativeTo: this._route });
    // this._router.navigate(["../../"+item.authority.code, { id: item.authority.id }], { relativeTo: this._route });
  }

}
