import { atom } from 'recoil'
import { IUser } from 'types/user.type'

export const userAtom = atom<IUser | null>({
  key: 'userAtom',
  default: null
})
