import {Server as ServerIO} from "socket.io"
export const config = {
    api: {
        bodyParser: true,
    },
}

export default async (req, res) => {
    if (!res.socket.server.io) {
        console.log("New Socket.io server...")
        // adapt Next's net Server to http Server
        const httpServer = res.socket.server
        const io = new ServerIO(httpServer, {
            path: "/api/socketio",
        })
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io

        io.on("connection", socket => {
            console.log(socket.id)

            socket.on("Success_Refills", data => {
                io.emit("Receive_Refills", {
                    from: data.from,
                    to: data.to,
                })
            })

            socket.on("_events", data => {
                io.emit("re_events", data)
            })

            socket.on("socket_off", id => {
                socket.disconnect()
                console.log(`Socket id:${id} off.`)
            })

            socket.on("disconnect", () => {
                console.log(socket.id, "OFF") // undefined
            })
        })
    }
    res.end()
}
