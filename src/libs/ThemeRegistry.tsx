'use client';
import WebInfoService from '@/services/web-info.service';
import { getDesignTokens } from '@/themes/get-design-tokens';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useServerInsertedHTML } from 'next/navigation';
import { createContext, useMemo, useState } from 'react';
import Providers from './provider';

export const ColorModeContext = createContext({
	toggleColorMode: (data: 'light' | 'dark') => {},
});

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: any) {
	const { options, children } = props;

	const [{ cache, flush }] = useState(() => {
		const cache = createCache(options);
		cache.compat = true;
		const prevInsert = cache.insert;
		let inserted: string[] = [];
		cache.insert = (...args) => {
			const serialized = args[1];
			if (cache.inserted[serialized.name] === undefined) {
				inserted.push(serialized.name);
			}
			return prevInsert(...args);
		};
		const flush = () => {
			const prevInserted = inserted;
			inserted = [];
			return prevInserted;
		};
		return { cache, flush };
	});

	useServerInsertedHTML(() => {
		const names = flush();
		if (names.length === 0) {
			return null;
		}
		let styles = '';
		for (const name of names) {
			styles += cache.inserted[name];
		}
		return (
			<style
				key={cache.key}
				data-emotion={`${cache.key} ${names.join(' ')}`}
				dangerouslySetInnerHTML={{
					__html: styles,
				}}
			/>
		);
	});

	const [mode, setMode] = useState<'light' | 'dark'>(
		WebInfoService.getThemeMode() || 'dark'
	);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: (updateMode: 'light' | 'dark') => {
				setMode(updateMode);
				WebInfoService.setThemeMode(updateMode);
			},
		}),
		[]
	);

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<CacheProvider value={cache}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Providers>{children}</Providers>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</CacheProvider>
	);
}
