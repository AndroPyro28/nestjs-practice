import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(
    private errMsg: string = 'User Not Found!',
    private httpCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(errMsg, httpCode);
  }
}
