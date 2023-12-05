import { Backdrop, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

export default function Home({ children }: { children: ReactNode }) {
	return <main>{children}</main>;
}
