import { io, Socket } from 'socket.io-client'
import { IS_CLIENT } from '../config/env'
import { SocketEvent, SocketMessage, SOCKET_EVENTS } from './constants'
import { Callback, Unsubscribe } from '../clients/type'

type ErrorData = { error: string }
const parseEventError = (data?: any): data is ErrorData => {
    return typeof data?.error === 'string'
}

let socket: Socket | null = null
if (IS_CLIENT) {
    window.addEventListener('load', () => {
        socket = io()
        window.dispatchEvent(new Event('socket-init'))
    })
    window.addEventListener('beforeunload', () => {
        socket?.close()
    })
}

export const emitToSocket = <Data>(type: SocketMessage, data: Data): void => {
    if (!socket) throw new Error('Socket not ready')
    socket.emit(type, data)
}

export const subscribeToSocketEvent = <Data>(params: {
    event: SocketEvent
    onValue: Callback<Data>
    onError: Callback<Error>
}): Unsubscribe => {
    const unsubscribe = (): void => {
        socket?.offAny()
    }

    if (!IS_CLIENT) return unsubscribe
    const handleSubscription = (currentSocket: Socket): void => {
        currentSocket.on(params.event, (data: any) => {
            if (parseEventError(data)) {
                params.onError(new Error(data.error))
                return
            }
            params.onValue(data as Data)
        })
    }
    if (!socket) {
        window.addEventListener('socket-init', () => {
            handleSubscription(socket)
        })
    } else {
        handleSubscription(socket)
    }

    return unsubscribe
}
