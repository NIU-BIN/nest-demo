import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class MonitorInterceptor implements NestInterceptor {
  private logger = new Logger('monitor')
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - start;
        this.logger.log(`Request ${req.method} ${req.url} took ${time}ms`);
      })
    )
  }
}