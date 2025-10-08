import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import snakecaseKeys from 'snakecase-keys';

@Injectable()
export class SnakeCaseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (['POST', 'PUT', 'PATCH'].includes(req.method.toUpperCase()) && req.body) {
      const snakeBody = snakecaseKeys(req.body, { deep: true });
      const cloned = req.clone({ body: snakeBody });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
