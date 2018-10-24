import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountSvc: AccountService
  ) { }

  ngOnInit() {
    this.initDoCreateForm();
  }

  private initDoCreateForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  doLogin() {
    const formValues = this.loginForm.value;
    console.log(formValues);
    this.accountSvc.doLogin(formValues)
      .then(res => {
        this.router.navigate(['/overview']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

  tryFacebookLogin() {
    this.accountSvc.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/overview']);
    });
  }

}
