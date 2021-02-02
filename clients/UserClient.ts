import { SERVER_URL } from '../config/env'
import { User } from '../util/types'
import { ListenerType } from './type'
import { subscribeToSocketEvent, emitToSocket } from '../util/socket'
import { SOCKET_EVENTS } from '../util/constants'
import { parseEventError } from './tools'

const USER_URL = `${SERVER_URL}/users`

const getUserDirectory = async (): Promise<Record<string, User>> => {
    const res = await fetch(USER_URL)
    const users: Record<string, User> = await res.json()
    return users
}

const addUser = async (email: string, name: string): Promise<User> => {
    await fetch(USER_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: email,
            name,
        }),
    })
    return { userId: email, name }
}

const emitUser = (user: User): void => emitToSocket<User>('REGISTER_USER', user)

const subscribeToUserDirectory: ListenerType<User> = (onValue, onError) =>
    subscribeToSocketEvent({
        onError,
        onValue,
        event: 'NEW_USER',
    })

export const userClient = {
    getUserDirectory,
    addUser,
    subscribeToUserDirectory,
    emitUser,
}
