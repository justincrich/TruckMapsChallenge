import { useEffect } from 'react'

export const useOnClickOutside = (
    ref: React.RefObject<HTMLDivElement | null>,
    handler: () => void
): void => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const listener = (event: any): void => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }

            handler()
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}
