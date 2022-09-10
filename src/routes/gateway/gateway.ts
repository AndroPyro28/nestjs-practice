import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server } from "socket.io";
@WebSocketGateway({
    cors: {
        origin:"*"
    }
})
export class MyGateway implements OnModuleInit {

    @WebSocketServer()
    private server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            socket.on('newMessage', (body) => {
                console.log(body)
            })
        })
    }
} 