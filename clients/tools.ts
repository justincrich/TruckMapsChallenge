type ErrorData = { error: string }

export const parseEventError = (data?: any): data is ErrorData => {
    return typeof data?.error === 'string'
}
