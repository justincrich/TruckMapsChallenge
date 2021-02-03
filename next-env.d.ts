/// <reference types="next" />
/// <reference types="next/types/global" />
import React from 'react'

declare module 'react-tiny-link' {
    export = React.Component<{ url: string }> 
}
