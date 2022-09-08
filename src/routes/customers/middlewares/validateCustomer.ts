import { NestMiddleware, Req, Res, Next, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ValidateCustomerMiddlewares implements NestMiddleware {
    use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        // next()
        const { jwtheader } = req.headers
        console.log('this is validation  middleware and request header', jwtheader);
        next();
    }
}