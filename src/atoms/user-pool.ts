import { atom } from 'recoil'
import { IPool } from 'types/pool.type'

export const userPoolAtom = atom<IPool | null>({
  key: 'userPoolAtom',
  default: null
})
