import React from 'react'
import styled from 'styled-components/macro'
import { SPACING_PX } from '../styles/mixins/constants'

type Props = {
    size: number | 'fill'
    vertical?: boolean
}
export const Spacer = (props: Props): JSX.Element => {
    const { size: sizeIdx, vertical } = props
    const size = SPACING_PX[sizeIdx === 'fill' ? 0 : sizeIdx] || 0
    return (
        <Container
            isHorizontal={!vertical}
            size={size}
            fill={sizeIdx === 'fill'}
        />
    )
}

const Container = styled.div<{
    isHorizontal: boolean
    size: number
    fill: boolean
}>`
    width: ${(p) => (p.isHorizontal ? p.size : 0)}px;
    height: ${(p) => (p.isHorizontal ? 0 : p.size)}px;
    ${(p) =>
        p.fill
            ? `
      width: 0px;
      height: 0px;
      margin-${p.isHorizontal ? 'left' : 'bottom'}: auto;
    `
            : ''}
`
