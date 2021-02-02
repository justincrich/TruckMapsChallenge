const ENV_VARIABLE_NAMES = ['PORT', 'NEXT_PUBLIC_HOST'] as const

type EnvVariable = typeof ENV_VARIABLE_NAMES[number]

const selectVariable = (key: EnvVariable): never => {
    throw new Error(`Invalid variable ${key}`)
}

export const URL =
    process.env.NEXT_PUBLIC_HOST || selectVariable('NEXT_PUBLIC_HOST')
export const SERVER_URL = `${URL}/api`
