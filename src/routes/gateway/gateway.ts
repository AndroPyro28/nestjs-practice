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
    private readonly io: Server;

    onModuleInit() {
        this.io.on('connection', (socket) => {
            socket.on('newMessage', (body) => {
                console.log(body)
                socket.emit('sendMessage', `you sent me a ${body} so i will give it back to you!`)
            })
        })
    }
} 