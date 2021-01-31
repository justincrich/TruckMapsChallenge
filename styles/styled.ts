import { css } from 'styled-components/macro'
import { AppTheme } from './theme'

declare module 'styled-components/macro' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends AppTheme {
        // empty, see AppTheme
    }
}

export { css }
