import NavigationEvents from '@/layouts/navigation-event';
import ThemeRegistry from '@/libs/ThemeRegistry';
import moment from 'moment';
import 'moment/locale/ko';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import './globals.scss';
moment().locale('ko');

const pretendard = localFont({
	src: [
		{
			path: '../../public/fonts/Pretendard-Regular.otf',
			weight: '400',
		},
		{
			path: '../../public/fonts/Pretendard-Bold.otf',
			weight: '700',
		},
		{
			path: '../../public/fonts/Pretendard-SemiBold.otf',
			weight: '600',
		},
		{
			path: '../../public/fonts/Pretendard-Regular.otf',
			weight: '400',
			style: 'italic',
		},
	],
	variable: '--font-pretendard',
});

const roboto_mono = Roboto_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
	title: 'Schumpeter',
};

export const viewport = {
	width: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={`${pretendard.className} ${roboto_mono.variable}`}>
				<ThemeRegistry options={{ key: 'mui' }}>
					<Suspense fallback={null}>
						<NavigationEvents>{children}</NavigationEvents>
					</Suspense>
				</ThemeRegistry>
			</body>
		</html>
	);
}
