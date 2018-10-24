import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountSvc: AccountService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  doRegister() {
    const formValues = this.registerForm.value;
    this.accountSvc.doRegister(formValues)
    .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.successMessage = 'Your account has been created';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

  doGoogleRegister() {
    this.accountSvc.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    }, err => console.log(err)
    );
  }

  doRegisterWithFacebook() {
    this.accountSvc.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/user']);
    }, err => console.log(err)
    );
  }

}
