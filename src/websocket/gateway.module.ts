import { Module } from "@nestjs/common"
import { MyGateway } from "./gateway";

@Module({ // we use module in socket for nestjs because unlike express you can just create it in a server file with http.createserver
    providers: [MyGateway]
})

export class GatewayModule { }