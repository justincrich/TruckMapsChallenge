import React from 'react'
import styled, { css } from 'styled-components'
import { SPACING } from '../styles/mixins/constants'
import { text } from '../styles/mixins/text'
import { color } from '../styles/color'
import { Spacer } from './Spacer'
import { IS_CLIENT } from '../config/env'

type Props = {
    message: string
    name: string
    isYou?: boolean
}

const parseUrl = (value: string): string => {
    const [url = ''] = value.match(/\bhttps?:\/\/\S+/gi) || []
    return url
}

/**
 * TODO: find a better way to use react tiny link component or make your own
 */
const EmbeddedLink = ({ url }: { url: string }): JSX.Element => {
    if (!IS_CLIENT) return <div>nolink</div>
    /* eslint-disable global-require, @typescript-eslint/no-var-requires */
    const Component: React.FunctionComponent<{
        url: string
    }> = require('react-tiny-link').ReactTinyLink
    /* eslint-enable global-require, @typescript-eslint/no-var-requires */
    return <Component url={url} />
}

// TODO: make message links clickable from within the text
export const ChatEntry = (props: Props): JSX.Element => {
    const { message, isYou, name } = props
    const embeddedUrl = parseUrl(message)

    return (
        <Container isYou={isYou}>
            <Content isYou={isYou}>{message}</Content>
            <Spacer vertical size={1} />
            <SubMessageContainer isYou={isYou}>{name}</SubMessageContainer>
            <Spacer vertical size={1} />
            {embeddedUrl ? <EmbeddedLink url={embeddedUrl} /> : null}
        </Container>
    )
}

const SubMessageContainer = styled.div<{ isYou?: boolean }>`
    ${text('sub', 'muted')}
    display: flex;
    flex-flow: row nowrap;
    ${(p) =>
        p.isYou
            ? css`
                  align-self: flex-end;
                  margin-right: ${SPACING[2]};
              `
            : css`
                  align-self: flex-start;
                  margin-left: ${SPACING[2]};
              `}
`

const Container = styled.div<{ isYou?: boolean }>`
    display: flex;
    flex-flow: column nowrap;
    ${(p) =>
        p.isYou
            ? css`
                  align-self: flex-end;
                  align-items: flex-end;
                  text-align: right;
              `
            : css`
                  align-self: flex-start;
                  text-align: left;
                  align-items: flex-start;
              `}
`

const Content = styled.div<{ isYou?: boolean }>`
    ${(p) => text('paragraph', p.isYou ? 'primary' : 'inverted')}
    background-color: ${(p) =>
        p.isYou ? color.background.content : color.brand.primary};
    border-radius: 20px;
    padding: ${SPACING[1]} ${SPACING[2]};
    max-width: 300px;
    display: flex;
    flex: 0 0 auto;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-self: flex;
    ${(p) =>
        p.isYou
            ? css`
                  border: 1px solid ${color.border.primary};
              `
            : css``}
`

ChatEntry.Container = Container
