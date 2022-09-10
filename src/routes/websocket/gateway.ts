import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import { Server } from "socket.io";
@WebSocketGateway({
    cors: {
        origin:"*"
    }
})
export class MyGateway implements OnModuleInit {

    @WebSocketServer() // this is decorator that tells that this application is a server of a socket
    private readonly io: Server;

    onModuleInit() { // a on module init method is a method from OnModuleInit interface so we need to follow it and it is the only method that we can only put a io server

        this.io.on('connection', (socket) => {
            socket.on('newMessage', (body) => {
                console.log(body)
                socket.emit('sendMessage', `you sent me a ${body} so i will give it back to you!`)
            })
        })
        
    }
} 