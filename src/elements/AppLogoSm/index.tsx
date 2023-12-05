import LogoEnDarkSm from '../../assets/icons/logo-en-dark-sm';
import LogoEnLightSm from '../../assets/icons/logo-en-light-sm';
import LogoKrDarkSm from '../../assets/icons/logo-kr-dark-sm';
import LogoKrLightSm from '../../assets/icons/logo-kr-light-sm';
import WebInfoService from '@/services/web-info.service';

const AppLogoSm = () => {
	const theme = WebInfoService.getThemeMode();
	const language = WebInfoService.getLanguage();

	if (theme === 'dark' && language === 'en') {
		return <LogoEnDarkSm />;
	} else if (theme === 'light' && language === 'en') {
		return <LogoEnLightSm />;
	} else if (theme === 'dark' && language === 'kr') {
		return <LogoKrDarkSm />;
	} else {
		return <LogoKrLightSm />;
	}
};

export default AppLogoSm;
