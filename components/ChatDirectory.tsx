import React from 'react'
import styled from 'styled-components'
import { color } from '../styles'
import { SPACING } from '../styles/mixins/constants'
import { text } from '../styles/mixins/text'
import { UserDirectory } from '../util/types'
import { Label } from './Label'
import { Spacer } from './Spacer'

export const ChatDirectory = ({
    directory,
}: {
    directory: UserDirectory
}): JSX.Element => {
    return (
        <Container>
            <Label>Directory</Label>
            <Spacer vertical size={1} />
            {Object.values(directory).map((user) => (
                <div key={user.userId}>{user.name}</div>
            ))}
        </Container>
    )
}

const Container = styled.div`
    ${text('paragraph', 'primary')}
    padding: ${SPACING[1]};
    width: 200px;
    height: 200px;
    overflow: auto;
    background-color: ${color.background.content};
    display: flex;
    flex-flow: column nowrap;
`
