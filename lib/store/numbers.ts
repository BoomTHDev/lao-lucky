import { atom } from "recoil";

type Number = {
    id: number
    Date: Date
    number5: string
    number4: string
    number3: string
    number2top: string
    number2: string
}

type Loading = boolean

type Error = string | null

export const numberState = atom<Number>({
    key: 'number',
    default: {
        id: 0,
        Date: new Date(),
        number5: '',
        number4: '',
        number3: '',
        number2top: '',
        number2: ''
    },
})

export const numbersState = atom<Number[]>({
    key: 'numbers',
    default: [] as Number[]
})


export const loadingState = atom<Loading>({
    key: 'loading',
    default: true
})

export const errorState = atom<Error>({
    key: 'error',
    default: null
})