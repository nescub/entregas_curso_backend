import * as io from "socket.io"
import MessageManager from '../business/MessageManager.js'

const messageManager = new MessageManager()

await messageManager.initialize()

function createWebSocket(httpServer) {
    const serverSocket = new io.Server(httpServer)

    serverSocket.on('connection', async socket => {
            socket.emit('message-list', await messageManager.getAllMessages())

            socket.on('new-message', async mensaje => {      
                try {
                    await messageManager.insertMessage(mensaje)
                }
                catch (error) {
                    socket.emit('message-error', { description: error.message})
                }

                serverSocket.sockets.emit('message-list', await messageManager.getAllMessages())
            })
    })
}

async function getMessage(req, res, next) {
    try {
        res.json(await messageManager.getMessagesByEmail(req.params.email))
    } catch (error) {
        next(error)
    }
}

export { createWebSocket, getMessage}