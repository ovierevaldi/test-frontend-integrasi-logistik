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
    readonly: boolean ,
    placeholder?: string,
    controlReadonly? : boolean,
    name?: string,

    error? : {
        isError: boolean,
        message: string
    }
}

export type SelectMenu = {
    label: string,
    value: string,
    options?: {
        value: string[],
        label: string[]
    },
    readonly: boolean,
    basis? : string,
    name?: string
}