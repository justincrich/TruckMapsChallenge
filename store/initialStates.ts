import { UserState } from './types'

export const initialUserState: UserState = {
    you: {
        loading: false,
        value: null,
        error: null,
    },
    directory: {
        value: {},
        error: null,
    },
}
