import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private userSvc: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Promise<UserModel> {
    const user = new UserModel();

    return new Promise((resolve, reject) => {
      this.userSvc.getCurrentUser()
        .then(res => {
          if (res.providerData[0].providerId === 'password') {
            user.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
            user.name = res.displayName;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          } else {
            user.image = res.photoURL;
            user.name = res.displayName;
            user.provider = res.providerData[0].providerId;
            return resolve(user);
          }
        }, err => {
          this.router.navigate(['/login']);
          return reject(err);
        });
    });
  }
}
