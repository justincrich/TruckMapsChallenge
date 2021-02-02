import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
    SerializedError,
} from '@reduxjs/toolkit'

import { createActionType } from './utils'
import { User, UserDirectory } from '../util/types'
import { initialUserState } from './initialStates'
import { userClient } from '../clients/UserClient'
import { UserState } from './types'

const REDUCER_NAME = 'user'

// const socket = subscribeToSocketEvent()

const createUserActionType = (name: string): string =>
    createActionType(name, REDUCER_NAME)

export const registerUser = createAsyncThunk(
    createUserActionType('registerUser'),
    ({ email, name }: { email: string; name: string }): User => {
        const user = { userId: email, name }
        userClient.emitUser(user)
        return user
    }
)

const userSlice = createSlice({
    name: REDUCER_NAME,
    initialState: initialUserState,
    reducers: {
        addUser(draft, { payload }: PayloadAction<User>) {
            draft.directory.value[payload.userId] = payload
        },
        userDirectoryError(draft, { payload }: PayloadAction<Error>) {
            draft.directory.error = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (draft) => {
            draft.you.value = null
            draft.you.loading = true
            draft.you.error = null
        })
        builder.addCase(registerUser.rejected, (draft, action) => {
            draft.you.error = action.error
            draft.you.loading = false
        })
        builder.addCase(registerUser.fulfilled, (draft, action) => {
            draft.you.value = action.payload
            draft.you.loading = false
            draft.you.error = null
        })
    },
})

export const { addUser, userDirectoryError } = userSlice.actions

interface AppState {
    user: UserState
}

export const selectUserYou = (state: AppState): User | null =>
    state.user.you.value

export const selectUserYouUserId = (state: AppState): string | null =>
    state.user.you?.value?.userId || null

export const selectUserYouLoading = (state: AppState): boolean =>
    state.user.you.loading

export const selectUserYouError = (state: AppState): SerializedError | null =>
    state.user.you.error

export const selectUserDirectory = (state: AppState): UserDirectory =>
    state.user.directory.value

export const { reducer } = userSlice
