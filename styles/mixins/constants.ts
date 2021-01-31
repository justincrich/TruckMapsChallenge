export const SPACING_PX = [
    0,
    8,
    16,
    24,
    32,
    40,
    48,
    56,
    64,
    72,
    80,
    88,
    96,
] as const

export const SPACING = SPACING_PX.map((value) => `${value}px`)

export const sizing = {
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    7: '56px',
    8: '64px',
    9: '72px',
    10: '80px',
    11: '88px',
    12: '96px',
    13: '104px',
    14: '112px',
} as const

export const BORDER_RADIUS = '5px'
