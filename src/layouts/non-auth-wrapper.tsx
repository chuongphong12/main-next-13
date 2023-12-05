'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import styles from './styles.module.scss';

const NonAuthWrapper = ({ children }: any) => {
	const match = useMediaQuery('(max-width: 768px)');
	const theme = useTheme();
	return (
		<Box
			className={styles.nonauth_wrapper}
			sx={{
				backgroundColor: theme.palette.main.black,
			}}>
			<Box
				component={'img'}
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					userSelect: 'none',
					pointerEvents: 'none',
				}}
				src={`images/bg-layer-${match ? 'sm' : 'lg'}1.png`}
			/>
			<Box
				component={'img'}
				sx={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					userSelect: 'none',
					pointerEvents: 'none',
				}}
				src={`images/bg-layer-${match ? 'sm' : 'lg'}2.png`}
			/>
			{children}
		</Box>
	);
};

export default NonAuthWrapper;
