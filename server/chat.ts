import { Request, Response, Router } from 'express'
import { chatClient } from './ChatServerClient'
import { User, ChatMessage } from '../util/types'
import { SOCKET_EVENTS } from '../util/constants'

export const router = Router()

router.get('/history', (_, res) => {
    res.json(chatClient.getAllMessages())
})

router.put<undefined, object | undefined, ChatMessage>('/', (req, res) => {
    const { body } = req
    try {
        if (!body) throw new Error('Invalid data')
        chatClient.setMessage(body)
        res.io.emit(SOCKET_EVENTS.NEW_MESSAGE, body)
        res.sendStatus(200)
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
})
