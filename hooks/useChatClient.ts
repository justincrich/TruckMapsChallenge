import { useEffect, useReducer, Reducer } from 'react'
import produce from 'immer'
import { ChatMessage } from '../util/types'
import { chatClient } from '../clients/ChatClient'

type State = {
    error: null | Error
    value: ChatMessage[]
}

type ActionPattern<T, P> = { type: T; payload: P }
type SetMessageAction = ActionPattern<'SET_MESSAGE', ChatMessage>
type ErrorAction = ActionPattern<'SET_ERROR', Error>
type Action = SetMessageAction | ErrorAction

const reducer: Reducer<State, Action> = (state, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case 'SET_MESSAGE':
                draft.value.push(action.payload)
                draft.error = null
                break
            case 'SET_ERROR':
                draft.error = action.payload
                break
            default:
        }
    })

type Return = {
    send: (message: ChatMessage, userId: string) => Promise<void>
    messages: ChatMessage[] | null
    error: Error | null
}

export const useChatClient = (initialMessages: ChatMessage[]): Return => {
    const [state, dispatch] = useReducer(reducer, {
        value: initialMessages,
        error: null,
    })

    const isClient = typeof window !== 'undefined'

    useEffect(() => {
        if (!isClient) {
            return () => {}
        }
        const unsubscribe = chatClient.subscribeToChatLog(
            (message) => dispatch({ type: 'SET_MESSAGE', payload: message }),
            (nextError) => dispatch({ type: 'SET_ERROR', payload: nextError })
        )
        return unsubscribe
    }, [isClient])

    return {
        messages: state.value,
        error: state.error,
        send: chatClient.sendMessage,
    }
}
