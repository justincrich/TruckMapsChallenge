import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Input } from './Input'
import { SubMessage } from './SubMessage'

type Props = {
    onSubmit: (value: string) => void
    isLoading?: boolean
    disabled?: boolean
    className?: string
}

const schema = yup.object().shape({
    message: yup.string().min(1, 'Invalid message'),
})

export const ChatInput = (props: Props): JSX.Element => {
    const { onSubmit, isLoading, disabled, className } = props
    const {
        register,
        errors,
        handleSubmit: fnHandleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm<{
        message: string
    }>({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ message: '' })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <Container className={className}>
            <StyledInput
                placeholder="Press enter to send message..."
                name="message"
                ref={register()}
                onEnterPress={fnHandleSubmit(({ message }) => {
                    onSubmit(message)
                })}
                disabled={disabled}
                action={{
                    icon: 'FaPaperPlane',
                    onAction: fnHandleSubmit(({ message }) => {
                        onSubmit(message)
                    }),
                    disabled: isLoading || disabled,
                }}
            />
            {errors?.message ? (
                <ErrContainer>
                    <SubMessage isError>{errors.message.message}</SubMessage>
                </ErrContainer>
            ) : (
                <div />
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-flow: column nowrap;
    min-width: 0;
    min-height: 0;
    position: relative;
    align-items: center;
`

const StyledInput = styled(Input).attrs({
    kind: 'textarea',
})`
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
`

const ErrContainer = styled.div`
    display: absolute;
    bottom: 10px;
`

ChatInput.Input = StyledInput
