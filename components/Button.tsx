import styled from 'styled-components'
import { color } from '../styles/color'
import { mixins } from '../styles/mixins/index'
import { button } from '../styles/mixins/button'
import { BORDER_RADIUS } from '../styles/mixins/constants'

interface ButtonProps {
    disabled?: boolean
    onClick: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
    size?: 'small' | 'large'
}

export const Button = styled.button<ButtonProps>`
    ${(p) => button(p.disabled)}
    ${(p) => mixins.text(p.size === 'small' ? 'sub' : 'paragraph', 'inverted')}
    padding: ${mixins.spacing[1]};
    background-color: ${(p) =>
        p.disabled ? color.brand.muted : color.brand.primary};
    font-weight: bold;
    outline: none;
    border: 0px;
    border-radius: ${BORDER_RADIUS};
    height: ${(p) => (p.size === 'small' ? 38 : 60)}px;
`
