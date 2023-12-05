import { atom } from 'recoil'
export const subEmailVerifyAtom = atom<boolean | null>({
    key: 'subEmailVerifyAtom',
    default: null
})
