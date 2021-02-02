import { ListenerType } from './type'
import { ChatMessage } from '../util/types'
import { getChatSocket } from '../util/getChatSocket'
import { SOCKET_EVENTS } from '../util/constants'
import { parseEventError } from './tools'
import { SERVER_URL } from '../config/env'

const socket = getChatSocket()

const subscribeToChatLog: ListenerType<ChatMessage> = (onValue, onError) => {
    socket.on(SOCKET_EVENTS.NEW_MESSAGE, (data: any) => {
        if (parseEventError(data)) {
            return onError(new Error(data.error))
        }
        return onValue(data as ChatMessage)
    })
    return () => {
        socket.off(SOCKET_EVENTS.NEW_MESSAGE)
    }
}

const sendMessage = async (
    message: ChatMessage,
    userId: string
): Promise<void> => {
    await fetch(`${SERVER_URL}/chat`, {
        method: 'PUT',
        body: JSON.stringify({
            message,
            userId,
        }),
    })
}

export const chatClient = {
    subscribeToChatLog,
    sendMessage,
}
