import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountService } from '../../authentication/services/account.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(
    private location: Location,
    private accountSvc: AccountService
  ) { }

  ngOnInit() {
  }

  doLogout() {
    this.accountSvc.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log('Logout error', error);
    });
  }

}
