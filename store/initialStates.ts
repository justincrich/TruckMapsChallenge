import { UserState } from './types'

export const initialUserState: UserState = {
    you: {
        loading: false,
        value: {
            userId: 'justinrich2008@gmail.com',
            name: 'Justin',
        },
        error: null,
    },
    directory: {
        value: {
            'justinrich2008@gmail.com': {
                userId: 'justinrich2008@gmail.com',
                name: 'Justin',
            },
        },
        error: null,
    },
}
