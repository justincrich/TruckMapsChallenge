export const SOCKET_MESSAGES = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    REGISTER_USER: 'REGISTER_USER',
} as const

export const SOCKET_EVENTS = {
    CONNECTION_SERVER: 'connection',
    CONNECTED_CLIENT: 'connected',
    INIT: 'INIT',
    NEW_MESSAGE: 'NEW_MESSAGE',
    NEW_USER: 'NEW_USER',
    ...SOCKET_MESSAGES,
} as const

export type SocketEvent = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS]

export type SocketMessage = typeof SOCKET_MESSAGES[keyof typeof SOCKET_MESSAGES]
