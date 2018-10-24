import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { OverviewComponent } from './core/overview/overview.component';
import { AuthGuard } from './authentication/services/auth.guard';
import { AuthService} from './authentication/services/auth.service';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'overview', component: OverviewComponent,  resolve: { data: AuthService}}
];
