/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import produce from 'immer'
import {
    configureStore,
    getDefaultMiddleware,
    Action,
    EnhancedStore,
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { rootReducer, RootState } from './rootReducer'
import { initialUserState } from './initialStates'
import { UserDirectory } from '../util/types'

const initialState = {
    user: initialUserState,
}

let store: EnhancedStore | undefined

function initStore(preloadedState = initialState): EnhancedStore {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: [...getDefaultMiddleware<RootState>()] as const,
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export const initializeStore = (preloadedState: RootState): EnhancedStore => {
    let _store = store ?? initStore(preloadedState)

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })

        store = undefined
    }

    if (typeof window === 'undefined') return _store

    if (!store) store = _store

    return _store
}

export type AppDispatch = EnhancedStore['dispatch']

export type ReduxDispatch = ThunkDispatch<RootState, undefined, Action>

export const useReduxDispatch = (): ReduxDispatch =>
    useDispatch<ReduxDispatch>()

export const buildBaseState = (params: {
    directory: UserDirectory
}): RootState =>
    produce(initialState, (draft): void => {
        draft.user.directory.value = params.directory
    })
export const useStore = (nextState: RootState): EnhancedStore => {
    const nextStore = useMemo(() => initializeStore(nextState), [nextState])

    return nextStore
}
