import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    if(exception instanceof BadRequestException) {
    response.status(status).redirect('500');
    } else if(exception instanceof HttpException) {
      response.status(status).redirect('404');
    } else {
      response
        .status(status)
        .json((exception["message"], null, "ERROR", true));
    }
  }
}