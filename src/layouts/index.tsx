import { loadingAtom } from '@/atoms/loading';
import { logingOutAtom } from '@/atoms/loging-out';
import { userAtom } from '@/atoms/user';
import { userPoolAtom } from '@/atoms/user-pool';
import { ColorModeContext } from '@/libs/ThemeRegistry';
import { getUserPool } from '@/services/pool.service';
import TokenService from '@/services/token.service';
import { getUserProfile } from '@/services/user.service';
import WebInfoService from '@/services/web-info.service';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const Layout = ({ children, loading }: any) => {
	const path = usePathname();
	const setUser = useSetRecoilState(userAtom);
	const setUserPool = useSetRecoilState(userPoolAtom);
	const [logingOut, setLogingOut] = useRecoilState(logingOutAtom);
	const colorMode = useContext(ColorModeContext);
	const { i18n } = useTranslation();
	const isLoading = useRecoilValue(loadingAtom);

	useEffect(() => {
		if (loading === false) {
			setLogingOut(false);
		}
	}, [loading]);

	useEffect(() => {
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

		fetchData().catch(console.error);
	}, []);

	return <>{children}</>;
};

export default Layout;
