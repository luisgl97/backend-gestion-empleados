import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    console.log('auth  middleware')
    /* const { authorization } = req.headers;
    if(!authorization){
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    } */

    next();
  }
}
