type Callback<T> = (data: T) => void
type Unsubscribe = () => void
export type ListenerType<Value> = (
    onValue: Callback<Value>,
    onError: Callback<Error>
) => Unsubscribe
