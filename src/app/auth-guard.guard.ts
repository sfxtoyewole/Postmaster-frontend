import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: NavController
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Allow access to the route
    } else {
      this.router.navigateBack(['/login']); // Redirect to the login page if not authenticated
      return false;
    }
  }

  isSignedIn() {
    return this.authService.isAuthenticated();
  }
}
