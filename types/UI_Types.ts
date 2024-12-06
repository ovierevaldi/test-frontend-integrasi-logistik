import { NavState } from "./enums"

export type NavMenu = {
    nama: string,
    state : NavState,
    comp: React.ReactNode
};

export type InputMenu = {
    label: string,
    value: string,
    type: 'string' | 'date' | 'number'
    disabled: boolean ,
    placeholder?: string
}

export type SelectMenu = {
    label: string,
    value: string,
    options: string[],
    disabled: boolean ,
    basis? : string
}