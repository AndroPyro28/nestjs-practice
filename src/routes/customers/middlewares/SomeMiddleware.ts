import { NestMiddleware, Req, Res, Next, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class SomeMiddleWare implements NestMiddleware {

    use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        try {
            const { jwtheader } = req.headers
            if (!jwtheader) {
                next(new HttpException('jwtHeader not found', HttpStatus.BAD_REQUEST));
            }
            console.log('this is Some middleware and request header:::', jwtheader);
            next();
        } catch (error) {
            return res.status(error.status).send(error);
        }
    }
}