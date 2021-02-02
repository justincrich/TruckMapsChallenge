import { createServer } from 'http'
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import BodyParser from 'body-parser'
import NextJS from 'next'
import SocketIo from 'socket.io'

import { router as userRouter } from './user'
import { router as chatRouter } from './chat'

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Response {
            io: SocketIo.Server
        }
    }
}

dotenv.config()
const port = process.env.PORT || 3000
const BASE_PATH = '/api'

const dev = process.env.NODE_ENV !== 'production'
const app = NextJS({ dev })
const handle = app.getRequestHandler()

const initiateServer = async (): Promise<void> => {
    try {
        const router = express()
        const server = createServer(router)
        await app.prepare()
        router.use(BodyParser.json())
        const io = new SocketIo.Server(server)
        router.response.io = io
        router.use(`${BASE_PATH}/users`, userRouter)
        router.use(`${BASE_PATH}/chat`, chatRouter)
        router.all('*', (req: Request, res: Response) => {
            handle(req, res)
        })
        server.listen(port, () => {
            // eslint-disable-next-line no-console
            console.log(`Server running on ${port}`)
        })
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        process.exit(1)
    }
}

initiateServer()

//         io.emit(SOCKET_EVENTS.NEW_USER, this.users)
//    io.emit(SOCKET_EVENTS.NEW_MESSAGE, this.messages)
