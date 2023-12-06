'use client';
import { publicPaths } from '@/layouts/navigation-event';
import TokenService from '@/services/token.service';
import { Container, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomeContainer = () => {
	const path = usePathname();
	const router = useRouter();

	useEffect(() => {
		router.push('/blogs');
	}, []);

	if (!TokenService.getAuth() || publicPaths.some((i) => path.includes(i))) {
		return <></>;
	} else {
		return (
			<Container>
				<Typography>Home</Typography>
			</Container>
		);
	}
};

export default HomeContainer;
