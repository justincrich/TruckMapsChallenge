import { useEffect, useReducer, Reducer } from 'react'
import { v4 as uuid } from 'uuid'
import produce from 'immer'
import { ChatMessage } from '../util/types'
import { chatClient } from '../clients/ChatClient'
import { useClientSubscription } from './useClientSubscription'

type State = {
    error: null | Error
    value: ChatMessage[]
}

type ActionPattern<T, P> = { type: T; payload: P }
type SetMessageAction = ActionPattern<'SET_MESSAGE', ChatMessage>
type ErrorAction = ActionPattern<'SET_ERROR', Error>
type Action = SetMessageAction | ErrorAction

const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                value: [...state.value, action.payload],
                error: null,
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: null,
            }
        default:
            return { ...state }
    }
}

type Return = {
    send: (userId: string, message: string) => void
    messages: ChatMessage[] | null
    error: Error | null
}

export const useChatClient = ({
    initialMessages,
}: {
    initialMessages: ChatMessage[]
}): Return => {
    const [state, dispatch] = useReducer(reducer, {
        value: initialMessages,
        error: null,
    })

    useEffect(() => {
        chatClient.subscribeToChatLog(
            (chatMessage) => {
                console.log('new msg', chatMessage)
                dispatch({ type: 'SET_MESSAGE', payload: chatMessage })
            },
            (error) => {
                dispatch({ type: 'SET_ERROR', payload: error })
            }
        )
    }, [])

    return {
        messages: state.value,
        error: state.error,
        send: (userId, message) =>
            chatClient.emitMessage({
                userId,
                message,
                createdAt: Date.now(),
                id: uuid(),
            }),
    }
}
