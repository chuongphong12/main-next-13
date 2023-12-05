import { Box } from '@mui/material';
import LogoEnDark from '../../assets/icons/logo-en-dark';
import LogoEnLight from '../../assets/icons/logo-en-light';
import LogoKrDark from '../../assets/icons/logo-kr-dark';
import LogoKrLight from '../../assets/icons/logo-kr-light';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import WebInfoService from '@/services/web-info.service';

const CardAdd = () => {
	const { i18n } = useTranslation();
	const theme = WebInfoService.getThemeMode();
	const language = i18n.language;

	if (theme === 'dark' && language === 'en') {
		return (
			<Box mb={2}>
				<LogoEnDark />
			</Box>
		);
	} else if (theme === 'light' && language === 'en') {
		return (
			<Box mb={2}>
				<LogoEnLight />
			</Box>
		);
	} else if (theme === 'dark' && language === 'kr') {
		return (
			<Box mb={2}>
				<LogoKrDark />
			</Box>
		);
	} else {
		return (
			<Box mb={2}>
				<LogoKrLight />
			</Box>
		);
	}
};

export default CardAdd;
