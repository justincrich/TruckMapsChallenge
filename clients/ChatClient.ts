import { ListenerType } from './type'
import { ChatMessage } from '../util/types'
import { subscribeToSocketEvent, emitToSocket } from '../util/socket'
import { SERVER_URL } from '../config/env'

const subscribeToChatLog: ListenerType<ChatMessage> = (onValue, onError) =>
    subscribeToSocketEvent({
        event: 'NEW_MESSAGE',
        onValue,
        onError,
    })
const emitMessage = (message: ChatMessage): void =>
    emitToSocket<ChatMessage>('SEND_MESSAGE', message)

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
    emitMessage,
}
