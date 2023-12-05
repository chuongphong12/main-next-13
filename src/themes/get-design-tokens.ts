import { convertToRem } from '@/utils/convert-to-rem';
import { PaletteMode } from '@mui/material';
import { amber, grey } from '@mui/material/colors';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export type TypoCategoriesType = keyof typeof typoCategories;

const defaultTypo = {
	fontFamily: 'var(--font-pretendard)',
	fontWeight: 400,
	color: '#FFFFFF',
	letterSpacing: 0,
	fontSize: convertToRem(16),
	lineHeight: convertToRem(20),
	textTransform: 'none',
};

const getTextStyles = (fz: number, lh: number, fw: number, ls?: number) => ({
	...defaultTypo,
	fontSize: convertToRem(fz),
	lineHeight: `${lh}%`,
	fontWeight: fw,
	fontFamily: 'var(--font-pretendard)',
	letterSpacing: ls ? `${ls}%` : 'inherit',
});

const typoCategories = {
	large_title: getTextStyles(40, 100, 700, 0),
	title_1_bold: getTextStyles(36, 120, 700, 0),
	title_2_bold: getTextStyles(28, 120, 700, 0),
	title_3: getTextStyles(24, 120, 400, 0),
	title_3_semibold: getTextStyles(24, 120, 600, 0),
	subtitle_1: getTextStyles(20, 120, 400, 0),
	subtitle_1_semibold: getTextStyles(20, 120, 600, 0),
	body_1: getTextStyles(20, 150, 400, 0),
	body_2: getTextStyles(18, 150, 400, 0),
	body_2_semibold: getTextStyles(18, 150, 600, 0),
	body_3: getTextStyles(16, 150, 400, 0),
	body_3_semibold: getTextStyles(16, 150, 600, 0),
	caption_1: getTextStyles(14, 120, 400, 0),
	caption_1_semibold: getTextStyles(14, 120, 600, 0),
	caption_2: getTextStyles(12, 120, 400, 0),
	caption_2_semibold: getTextStyles(12, 120, 600, 0),
	button_1_semibold: getTextStyles(18, 150, 600, 0),
	button_2_semibold: getTextStyles(16, 125, 600, 0),
	button_3_semibold: getTextStyles(14, 125, 600, 0),
};

export const getDesignTokens = (mode: PaletteMode) => {
	return {
		palette: {
			type: mode,
			mode,
			...(mode === 'light'
				? {
						// palette values for light mode
						main: {
							primary: '#2D68FE',
							white: '#FFFFFF',
							point: '#28FFFF',
							waiting: '#00C7BE',
							danger: '#FF0A09',
							black: '#000000',
							gray10: '#F2F3F5',
							gray20: '#C3C3C3',
							gray30: '#9F9EA4',
							gray40: '#7E7E86',
							gray50: '#62626C',
							gray60: '#333439',
							gray70: '#2C2C34',
							gray80: '#1F1F29',
							gray90: '#101014',
							primary_light: '#729AFE',
							button_secondary_active: 'rgba(49, 130, 247, 0.10)',
							orange: '#FC6A00',
						},
						gradation: {
							blue: 'linear-gradient(90deg, #28FFFF 0%, #3182F7 100%, #3182F7 100%)',
							sky: 'linear-gradient(4deg, #00C7BE 0%, #3182F7 100%)',
							blue1: 'linear-gradient(180deg, #3182F7 0%, #4052E2 100%)',
						},
						background: {
							default: '#101014',
							paper: '#101014',
						},
						primary: amber,
						divider: amber[200],
						text: {
							primary: grey[900],
							secondary: grey[800],
						},
				  }
				: {
						main: {
							primary: '#2D68FE',
							white: '#FFFFFF',
							point: '#28FFFF',
							waiting: '#00C7BE',
							danger: '#FF0A09',
							black: '#000000',
							gray10: '#F2F3F5',
							gray20: '#C3C3C3',
							gray30: '#9F9EA4',
							gray40: '#7E7E86',
							gray50: '#62626C',
							gray60: '#333439',
							gray70: '#2C2C34',
							gray80: '#1F1F29',
							gray90: '#101014',
							primary_light: '#729AFE',
							button_secondary_active: 'rgba(49, 130, 247, 0.10)',
							orange: '#FC6A00',
						},
						gradation: {
							blue: 'linear-gradient(90deg, #28FFFF 0%, #3182F7 100%, #3182F7 100%)',
							sky: 'linear-gradient(4deg, #00C7BE 0%, #3182F7 100%)',
							blue1: 'linear-gradient(180deg, #3182F7 0%, #4052E2 100%)',
						},
						background: {
							default: '#101014',
							paper: '#101014',
						},
						text: {
							primary: '#fff',
							secondary: grey[500],
						},
				  }),
		},
		typography: {
			allVariants: defaultTypo,
			...typoCategories,
		} as TypographyOptions,
		breakpoints: {
			values: {
				xs: 0,
				sm: 576,
				md: 768,
				lg: 992,
				xl: 1200,
				xxl: 1400,
			},
		},
	};
};
