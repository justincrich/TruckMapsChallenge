/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'
import { ListenerType, Callback } from '../clients/type'

type Return<D> = {
    error: Error | null
    data: D | null
}

export const useClientSubscription = <Data>(params: {
    clientSubscriptionFn: ListenerType<Data>
    initialValue?: Data
    onValue?: Callback<Data>
    onError?: Callback<Error>
}): Return<Data> => {
    const { onValue, onError, clientSubscriptionFn } = params
    const [data, setData] = useState<Data | null>(params.initialValue || null)
    const [error, setError] = useState<Error | null>(null)
    const handleValue = useCallback<Callback<Data>>((nextData) => {
        setData(nextData)
        setError(null)
        onValue?.(nextData)
    }, [])

    const handleError: Callback<Error> = useCallback<Callback<Error>>(
        (nextError) => {
            setError(nextError)
            onError?.(nextError)
        },
        []
    )
    useEffect(() => {
        const unsubscribe = clientSubscriptionFn(handleValue, handleError)

        return () => {
            unsubscribe()
        }
    }, [])

    return {
        error,
        data,
    }
}
