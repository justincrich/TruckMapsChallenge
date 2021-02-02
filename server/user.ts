import { Router } from 'express'
import SocketIo from 'socket.io'
import { chatDb } from './ChatDB'
import { User } from '../util/types'
import { SOCKET_EVENTS } from '../util/constants'

export const userRouter = (io: SocketIo.Server): Router => {
    const router = Router()

    router.get<{ id: string }>('/:id', (req, res) => {
        const { params } = req
        try {
            if (!params.id) {
                throw new Error('No ID provided')
            }
            const user = chatDb.getUser(params.id)
            res.json(user)
        } catch (e) {
            res.status(400).json({
                error: e.message,
            })
        }
    })

    router.get('/', (_, res) => {
        res.json(chatDb.getAllUsers())
    })

    router.put<undefined, object, User>('/', (req, res) => {
        try {
            if (!req.body) {
                throw new Error('No user data provided')
            }
            chatDb.setUser(req.body)
            io.emit(SOCKET_EVENTS.NEW_USER, req.body)
            res.json({ ...req.body })
        } catch (e) {
            res.status(400).json({
                error: e.message,
            })
        }
    })

    // LISTENERS

    io.on(SOCKET_EVENTS.CONNECTION_SERVER, (socket: SocketIo.Socket) => {
        socket.on(SOCKET_EVENTS.NEW_USER, (data: User) => {
            chatDb.setUser(data)
            io.emit(SOCKET_EVENTS.NEW_USER, data)
        })
    })

    return router
}
