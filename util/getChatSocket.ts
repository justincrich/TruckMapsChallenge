import { io, Socket } from 'socket.io-client'

const socket = io()

export const getChatSocket = (): Socket => socket
