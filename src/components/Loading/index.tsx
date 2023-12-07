'use client';
import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

const LoadingComponent = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		return () => {
			setLoading(false);
		};
	}, []);

	return (
		<Backdrop
			sx={{
				color: '#fff',
				zIndex: (theme) => {
					return theme.zIndex.drawer + 1000;
				},
			}}
			open={loading}>
			<CircularProgress color='inherit' />
		</Backdrop>
	);
};

export default LoadingComponent;
