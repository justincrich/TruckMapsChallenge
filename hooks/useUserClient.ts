import isEqual from 'lodash/isEqual'
import { useSelector } from 'react-redux'
import { selectUserDirectory } from '../store/user'
import { UserDirectory } from '../util/types'

type Return = {
    userDirectory: UserDirectory
}

export const useUserClient = (): Return => {
    const userDirectory = useSelector(selectUserDirectory, isEqual)

    return {
        userDirectory,
    }
}
