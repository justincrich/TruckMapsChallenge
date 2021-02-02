import { SerializedError } from '@reduxjs/toolkit'
import { User } from '../util/types'

export type AsyncState<Value> =
    | { value: Value; loading: false; error: null }
    | { value: null; loading: true; error: null }
    | { value: null; loading: false; error: SerializedError }
    | { value: null; loading: false; error: null }

export interface UserState {
    you: {
        value: User | null
        loading: boolean
        error: SerializedError | null
    }
    directory: {
        value: Record<string, User>
        error: SerializedError | null
    }
}
