'use client';

import { loadingAtom } from '@/atoms/loading';
import { logingOutAtom } from '@/atoms/loging-out';
import { userAtom } from '@/atoms/user';
import { userPoolAtom } from '@/atoms/user-pool';
import { ColorModeContext } from '@/libs/ThemeRegistry';
import { getUserPool } from '@/services/pool.service';
import TokenService from '@/services/token.service';
import { getUserProfile } from '@/services/user.service';
import WebInfoService from '@/services/web-info.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export const publicPaths = [
	'/sign-up',
	'/sign-in',
	'/forgot-password',
	'/reset-password',
	'/verify-signup',
];

const NavigationEvents = ({ children }: any) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const setUser = useSetRecoilState(userAtom);
	const setUserPool = useSetRecoilState(userPoolAtom);
	const [logingOut, setLogingOut] = useRecoilState(logingOutAtom);
	const colorMode = useContext(ColorModeContext);
	const { i18n } = useTranslation();
	const isLoading = useRecoilValue(loadingAtom);

	const authCheck = (url: any) => {
		// redirect to login page if accessing a private page and not logged in

		const path = url.split('?')[0];
		if (url.split('/')[1].split('?')[0] === 'verify-sub-email') {
			setLoading(false);
		} else if (!TokenService.getAuth() && publicPaths.every((i) => !path.includes(i))) {
			setLoading(false);
			router.push('/sign-in');
		} else if (TokenService.getAuth() && publicPaths.some((i) => path.includes(i))) {
			router.push('/');
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	const fetchData = async () => {
		const token = TokenService.getLocalAccessToken();
		if (token) {
			const data = await getUserProfile();
			setUser(data);
			colorMode.toggleColorMode(data.isDarkMode ? 'dark' : 'light');
			i18n.changeLanguage(data.language);
			WebInfoService.setLanguage(data?.language || 'kr');

			const userPool = await getUserPool();
			if (!!userPool) {
				setUserPool(userPool);
			} else {
				setUserPool(null);
			}
		} else {
			colorMode.toggleColorMode(WebInfoService.getThemeMode());
			i18n.changeLanguage(WebInfoService.getLanguage());
		}
	};

	useEffect(() => {
		const url = `${pathname}?${searchParams}`;
		authCheck(url);
		// const handleAuthCheck = () => authCheck(url);
		// const hideContent = () => setLoading(true);
	}, [pathname, searchParams]);

	useEffect(() => {
		if (loading === false) {
			setLogingOut(false);
		}
	}, [loading]);

	useEffect(() => {
		fetchData().catch(console.error);
	}, []);

	return (
		<>
			{children}
		</>
	);
};

export default NavigationEvents;
