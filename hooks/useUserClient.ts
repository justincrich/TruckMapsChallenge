import { useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import { shallowEqual, useSelector } from 'react-redux'
import {
    selectUserDirectory,
    selectUserYou,
    registerUser,
    selectUserYouLoading,
    selectUserYouError,
    addUser,
    userDirectoryError,
} from '../store/user'
import { UserDirectory, User } from '../util/types'
import { useReduxDispatch } from '../store/index'
import { useClientSubscription } from './useClientSubscription'
import { userClient } from '../clients/UserClient'

type Return = {
    userDirectory: UserDirectory
    you: User | null
    youIsLoading: boolean
    youError: string | undefined
    register: (name: string, email: string) => void
}

export const useUserClient = (): Return => {
    const userDirectory = useSelector(selectUserDirectory, isEqual)
    const you = useSelector(selectUserYou, isEqual)
    const youIsLoading = useSelector(selectUserYouLoading, shallowEqual)
    const { message: youError } = useSelector(selectUserYouError, isEqual) || {}
    const dispatch = useReduxDispatch()
    useClientSubscription({
        clientSubscriptionFn: userClient.subscribeToUserDirectory,
        onValue: (user) => dispatch(addUser(user)),
        onError: (error) => dispatch(userDirectoryError(error)),
    })

    return {
        userDirectory,
        you,
        youIsLoading,
        youError,
        register: (name, email) => dispatch(registerUser({ name, email })),
    }
}
