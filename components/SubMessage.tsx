import styled from 'styled-components'
import { color } from '../styles'
import { mixins } from '../styles/mixins'

export const SubMessage = styled.div<{ isError?: boolean }>`
    ${mixins.text('sub')}
    ${(p) => (p.isError ? `color: ${color.status.error(p)};` : '')}
`
