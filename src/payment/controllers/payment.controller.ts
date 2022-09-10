import { Controller, Get, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentController {

    @Get()
    getAllPayments(@Req() req: Request, @Res() res: Response) {
        const {count, page } = req.query;

        if(!count || !page) {
            throw new HttpException('missing count or page parameter', HttpStatus.BAD_REQUEST);
        }
        else {
            res.send(200);
        }
    }
}
