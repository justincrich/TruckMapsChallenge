import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { color } from '../styles'
import { BORDER_RADIUS, SPACING } from '../styles/mixins/constants'
import { text } from '../styles/mixins/text'
import { Button as RawButton } from './Button'
import { Input } from './Input'
import { Spacer } from './Spacer'
import { useUserClient } from '../hooks/useUserClient'

const schema = yup.object().shape({
    name: yup.string().required('required'),
    email: yup.string().required('required').email('Must be valid email'),
})

type Data = {
    name: string
    email: string
}

export const SignupModal = (): JSX.Element => {
    const { register: submitRegistration } = useUserClient()
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    })

    return (
        <Container>
            <Content>
                <Title>Join Chatroom</Title>
                <Spacer vertical size={4} />
                <Input
                    name="name"
                    label="Name"
                    ref={register()}
                    error={errors.name?.message}
                />
                <Spacer vertical size={2} />
                <Input
                    name="email"
                    label="Email"
                    ref={register()}
                    error={errors.email?.message}
                />
                <Spacer vertical size={2} />
                <Row>
                    <Spacer size="fill" />
                    <Button
                        onClick={handleSubmit(({ name, email }) =>
                            submitRegistration(name, email)
                        )}
                    >
                        Join
                    </Button>
                </Row>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1 0 auto;
    padding: ${SPACING[2]};
`

const Title = styled.div`
    ${text('title', 'primary', 'text')}
`

const Button = styled(RawButton)`
    && {
        padding: ${SPACING[1]} ${SPACING[2]};
        height: auto;
    }
`

const Content = styled.div`
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    max-width: 500px;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${color.background.content};
    border-radius: ${BORDER_RADIUS};
    padding: ${SPACING[2]};
`

const Row = styled.div`
    display: flex;
    flex-flow: row;
    flex: 1 1 auto;
`
