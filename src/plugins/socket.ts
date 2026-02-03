import { ZeyoAppConstructor } from "./lib";
import SocketIO, { Socket } from "socket.io-client";
declare module 'socket.io-client' {
    interface Socket {
        wait(event: string, time?: number): Promise<[any, boolean]>;
        waitSocket(): Promise<boolean>;
    }
}

export default function Socketio<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        socket: Socket = SocketIO()
        
        msgId() {
            return new Array(25).join("0").replace(/[018]/g, (c: any) =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(24)
            );
        }

        setSocket(accessToken: string, refreshToken: string) {
            if(this.socket.connected) return console.log("já conectado")
            this.socket = SocketIO(process.env.SERVER_URL || "https://backend.metaorg.app", {
                auth: {
                    accessToken,
                    refreshToken
                }
            })
            const socket = this.socket.connect()
            this.socket.on("connect", () => {
                console.log('conectado ao socket')
            })
            this.socket.on("disconnect", () => {
                console.log('desconectado do socket', this.socket.auth)
            })
        
            Socket.prototype.wait = (event: string, time?: number): Promise<[any, boolean]> => {
                return new Promise(res => {
                    let timeout: any = 0
                    function response(result: any) {
                        res(result)
                        socket.off(event, response)
                        clearTimeout(timeout)
                    }
                    if (time)
                        timeout = setTimeout(() => {
                            res(["time out foi acionando", true])
                            socket.off(event, response)
                        }, time);
                    socket.on(event, response)
                })
            }
            Socket.prototype.waitSocket = (): Promise<boolean> => {
                return new Promise((res) => {
                    if (socket.connected) res(true)
                    else
                        setTimeout(async () => {
                            console.log("esperando socket...");
                            if (!socket.connected) res(await socket.waitSocket());
                            else res(true)
                        }, 50);
                })
            }
            
            return this
        }


        waitSocket() {
            return new Promise(async (res) => {
                if (typeof this.socket.waitSocket === 'function') res(await this.socket.waitSocket())
                else
                    setTimeout(async () => {
                        console.log("esperando configurar socket...");
                        if (typeof this.socket.waitSocket !== 'function') res(await this.waitSocket());
                        else res(true)
                    }, 50);
            })
        }
    }
}