import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  public constructor(private navCtrl: NavController) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorization = localStorage.getItem('Authorization');
    let modifiedRequest = request;

    if (authorization) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authorization}`,
        },
      });
    }

    // Continue the request with the modified request
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    }

    if (error.status === 401) {
      this.navCtrl.navigateBack('/auth');
    }

    // if (error.status === 503) {
    //   this.alertService.warning(this.privilegeService.httpError(error.status));
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   console.error(
    //     `Backend returned code ${error.status}, body was: `,
    //     error.error
    //   );
    // }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
