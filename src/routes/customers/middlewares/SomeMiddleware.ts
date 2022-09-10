import {
  NestMiddleware,
  Req,
  Res,
  Next,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SomeMiddleWare implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const { jwtheaders } = req.headers; // all should be a lowercase
      if (!jwtheaders) {
        next(new HttpException('jwtHeader not found', HttpStatus.BAD_REQUEST));
      }
      console.log('this is Some middleware and request header:::', jwtheaders);
      next();
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }
}
