import { useEffect, useReducer, Reducer } from 'react'
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
    send: (message: ChatMessage, userId: string) => void
    messages: ChatMessage[] | null
    error: Error | null
}

export const useChatClient = (initialMessages: ChatMessage[]): Return => {
    const [state, dispatch] = useReducer(reducer, {
        value: initialMessages,
        error: null,
    })
    useClientSubscription<ChatMessage>({
        clientSubscriptionFn: chatClient.subscribeToChatLog,
        onValue: (message) =>
            dispatch({ type: 'SET_MESSAGE', payload: message }),
        onError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    })

    return {
        messages: state.value,
        error: state.error,
        send: (message) => chatClient.emitMessage(message),
    }
}
