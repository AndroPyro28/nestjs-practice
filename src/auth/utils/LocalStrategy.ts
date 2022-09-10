import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local'
import { AuthServices } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (@Inject('AUTH_SERVICES') private readonly authServices: AuthServices) {
        super();
    }

    async validate(username: (string), password: (string)) {
        
    }
}