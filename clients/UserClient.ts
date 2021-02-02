import { SERVER_URL } from '../config/env'
import { User } from '../util/types'
import { ListenerType } from './type'
import { getChatSocket } from '../util/getChatSocket'
import { SOCKET_EVENTS } from '../util/constants'
import { parseEventError } from './tools'

const socket = getChatSocket()
const USER_URL = `${SERVER_URL}/users`

const getUserDirectory = async (): Promise<Record<string, User>> => {
    const res = await fetch(USER_URL)
    const users: Record<string, User> = await res.json()
    return users
}

const addUser = async (email: string, name: string): Promise<User> => {
    await fetch(USER_URL, {
        method: 'PUT',
        body: JSON.stringify({
            userId: email,
            name,
        }),
    })
    return { userId: email, name }
}

const subscribeToUserDirectory: ListenerType<User> = (onValue, onError) => {
    socket.on(SOCKET_EVENTS.NEW_USER, (data: any): void => {
        if (parseEventError(data)) {
            return onError(new Error(data.error))
        }
        return onValue(data as User)
    })
    return () => {
        socket.off(SOCKET_EVENTS.NEW_USER)
    }
}

export const userClient = {
    getUserDirectory,
    addUser,
    subscribeToUserDirectory,
}
