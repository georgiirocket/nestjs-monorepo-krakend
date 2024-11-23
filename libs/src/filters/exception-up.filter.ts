import { Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

/**
 * Up errors from microservices
 */
@Catch()
export class ExceptionUpFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor(name: string) {
    this.logger = new Logger(name);
  }

  catch(exception: Error): Observable<any> {
    this.logger.error(exception.message);

    return throwError(() => exception.message);
  }
}
