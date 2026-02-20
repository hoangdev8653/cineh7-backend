import { ArgumentsHost, Catch, RpcExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class GlobalRpcExceptionFilter implements RpcExceptionFilter<any> {
    catch(exception: any, host: ArgumentsHost): Observable<any> {
        const errorResponse = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            error: 'Internal Server Error',
            timestamp: new Date().toISOString(),
        };

        if (exception instanceof HttpException) {
            const response = exception.getResponse();
            errorResponse.statusCode = exception.getStatus();
            errorResponse.message = typeof response === 'string' ? response : (response as any).message || exception.message;
            errorResponse.error = (response as any).error || 'Error';
        } else if (exception instanceof RpcException) {
            const error = exception.getError();
            errorResponse.message = typeof error === 'string' ? error : (error as any).message || exception.message;
        } else {
            errorResponse.message = exception.message || 'Internal server error';
        }

        // In microservices, we return the error object. 
        // The Gateway will receive this object as the response if it uses client.send()
        return throwError(() => errorResponse);
    }
}
