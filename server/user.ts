import { Request, Response, Router } from 'express'
import { chatClient } from './ChatServerClient'
import { User } from '../util/types'
import { SOCKET_EVENTS } from '../util/constants'

export const router = Router()

router.get<{ id: string }>('/:id', (req, res) => {
    const { params } = req
    try {
        if (!params.id) {
            throw new Error('No ID provided')
        }
        const user = chatClient.getUser(params.id)
        res.json(user)
    } catch (e) {
        res.status(400).json({
            error: e.message,
        })
    }
})

router.get('/', (_, res) => {
    res.json(chatClient.getAllUsers())
})

router.put<undefined, object, User>('/', (req, res) => {
    try {
        if (!req.body) {
            throw new Error('No user data provided')
        }
        chatClient.setUser(req.body)
        res.io.emit(SOCKET_EVENTS.NEW_USER, req.body)
        res.json({ ...req.body })
    } catch (e) {
        res.status(400).json({
            error: e.message,
        })
    }
})
