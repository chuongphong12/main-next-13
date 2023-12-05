import { atom } from 'recoil';
import TokenService from '@/services/token.service';
export const authAtom = atom<any>({
	key: 'authAtom',
	default: TokenService.getLocalAccessToken(),
});
