import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userSvc: UserService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.userSvc.getCurrentUser()
        .then(user => {
          this.router.navigate(['/overview']);
        return resolve(false);
        }, err => {
          return resolve(true);
        });
    });
  }
}
