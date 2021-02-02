import { css } from 'styled-components'

export const ACTION_OPACITY = 0.5

export const button = (disabled = false) => () => {
    return css`
        cursor: pointer;
        user-select: none;
        ${disabled &&
        `
          opacity: 0.5;
          cursor: default;
        `}
        &:active {
            opacity: 0.5;
        }
    `
}
