import { NavState } from "./enums"

export type NavMenu = {
    nama: string,
    state : NavState,
    comp: React.ReactNode
};

export type InputMenu = {
    label: string,
    value: string | number,
    type: 'text' | 'date' | 'number'
    disabled: boolean ,
    placeholder?: string,
    controlDisable? : boolean
}

export type SelectMenu = {
    label: string,
    value: string,
    options?: {
        value: string[],
        label: string[]
    },
    disabled: boolean ,
    basis? : string
}