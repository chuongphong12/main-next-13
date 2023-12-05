'use client';

import React, { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { Box, styled } from '@mui/material';
import CheckRoundIcon from '../assets/icons/check-round';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';
import Layout, { publicPaths } from '@/layouts';
import { useRouter } from 'next/router';
import TokenService from '@/services/token.service';

declare module '@mui/material/styles' {
	interface Palette {
		main: {
			primary: string;
			point: string;
			waiting: string;
			white: string;
			danger: string;
			black: string;
			gray10: string;
			gray20: string;
			gray30: string;
			gray40: string;
			gray50: string;
			gray60: string;
			gray70: string;
			gray80: string;
			gray90: string;
			primary_light: string;
			button_secondary_active: string;
			orange: string;
		};
		gradation: {
			blue: string;
			sky: string;
			blue1: string;
		};
	}
	// allow configuration using `createTheme`
	interface PaletteOptions {
		main?: {
			primary?: string;
			white?: string;
			point?: string;
			waiting?: string;
			danger?: string;
			black?: string;
			gray10?: string;
			gray20?: string;
			gray30?: string;
			gray40?: string;
			gray50?: string;
			gray60?: string;
			gray70?: string;
			gray80?: string;
			gray90?: string;
			primary_light?: string;
			button_secondary_active?: string;
			orange?: string;
		};
		gradation?: {
			blue?: string;
			sky?: string;
			blue1?: string;
		};
	}

	interface TypographyOptions {
		allVariants?: any;
		large_title?: any;
		title_1_bold?: any;
		title_2_bold?: any;
		title_3?: any;
		title_3_semibold?: any;
		subtitle_1?: any;
		subtitle_1_semibold?: any;
		body_1?: any;
		body_2?: any;
		body_2_semibold?: any;
		body_3?: any;
		body_3_semibold?: any;
		caption_1?: any;
		caption_1_semibold?: any;
		caption_2?: any;
		caption_2_semibold?: any;
		button_1_semibold?: any;
		button_2_semibold?: any;
		button_3_semibold?: any;
	}
}

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
	'&.notistack-MuiContent-error': {
		fontFamily: 'var(--font-pretendard)',
		backgroundColor: '#FF0A09',
	},
	'&.notistack-MuiContent-info': {
		fontFamily: 'var(--font-pretendard)',
		backgroundColor: '#2D68FE',
	},
	'&.notistack-MuiContent-success': {
		fontFamily: 'var(--font-pretendard)',
	},
	'&.notistack-MuiContent-warning': {
		fontFamily: 'var(--font-pretendard)',
	},
	'&.notistack-MuiContent-primary': {
		fontFamily: 'var(--font-pretendard)',
	},
}));

const queryCache = new QueryCache();
const queryClient = new QueryClient({
	queryCache: queryCache,
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function Providers({ children }: React.PropsWithChildren) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<SnackbarProvider
					maxSnack={3}
					Components={{
						info: StyledMaterialDesignContent,
						error: StyledMaterialDesignContent,
					}}
					iconVariant={{
						info: (
							<Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
								<CheckRoundIcon stroke={'#fff'} />
							</Box>
						),
					}}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					{children}
				</SnackbarProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</RecoilRoot>
	);
}

export default Providers;
