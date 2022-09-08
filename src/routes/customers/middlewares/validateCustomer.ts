import { NestMiddleware, Req, Res, Next, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ValidateCustomerMiddlewares implements NestMiddleware {
    use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        try {
            const { jwtheaders } = req.headers // all should be a lowercase
            console.log('this is validate customer middleware and request header:::', jwtheaders);
            next();
        } catch (error) {
            return res.status(error.status).send(error);
        }
    }
}