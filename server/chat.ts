import { Router } from 'express'
import SocketIo from 'socket.io'
import { chatDb } from './ChatDB'
import { ChatMessage } from '../util/types'
import { SOCKET_EVENTS } from '../util/constants'

export const chatRouter = (io: SocketIo.Server): Router => {
    const router = Router()
    router.get('/history', (_, res) => {
        res.json(chatDb.getAllMessages())
    })

    router.put<undefined, object | undefined, ChatMessage>('/', (req, res) => {
        const { body } = req
        try {
            if (!body) throw new Error('Invalid data')
            chatDb.setMessage(body)
            io.emit(SOCKET_EVENTS.NEW_MESSAGE, body)
            res.sendStatus(200)
        } catch (e) {
            res.status(400).json({ error: e.message })
        }
    })

    io.on(SOCKET_EVENTS.CONNECTION_SERVER, (socket: SocketIo.Socket) => {
        socket.on(SOCKET_EVENTS.SEND_MESSAGE, (message: ChatMessage) => {
            chatDb.setMessage(message)
            io.emit(SOCKET_EVENTS.NEW_MESSAGE, message)
        })
    })

    return router
}
