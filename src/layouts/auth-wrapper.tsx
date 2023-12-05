'use client';
import CustomDrawer from '@/components/Drawer';
import { convertToRem } from '@/utils/convert-to-rem';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const drawerWidth = 320;
const drawerWidthClosed = 136;
const Main = styled('div', {
	shouldForwardProp: (prop) => prop !== 'open',
})<any>(({ theme, open }) => ({
	padding: '1rem 1.25rem',
	width: '100%',
	[theme.breakpoints.up('xl')]: {
		paddingRight: '6.5rem',
		...(open && {
			transition: theme.transitions.create('padding', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			paddingLeft: `calc(${convertToRem(drawerWidth)} + 5rem)`,
		}),
		...(!open && {
			transition: theme.transitions.create('padding', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			paddingLeft: `calc(${convertToRem(drawerWidthClosed)} + 5rem)`,
		}),
	},
	[theme.breakpoints.between('md', 'xl')]: {
		paddingTop: '2.5rem ',
		paddingRight: '2rem',
		paddingBottom: '2.5rem ',
		...(open && {
			transition: theme.transitions.create('padding', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			paddingLeft: `calc(${convertToRem(drawerWidth)} + 1.5rem)`,
		}),
		...(!open && {
			transition: theme.transitions.create('padding', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			paddingLeft: `calc(${convertToRem(drawerWidthClosed)} + 1.5rem)`,
		}),
	},
	backgroundColor: theme.palette.main.gray90,
}));
const AuthWrapper = ({ children }: any) => {
	const path = usePathname();
	const mdDown = useMediaQuery('(max-width: 768px)');
	const theme = useTheme();
	const [open, setOpen] = useState(mdDown ? false : true);

	const handleLayoutToggle = (state: boolean) => {
		setOpen(state);
	};
	// render the page without the sidebar
	// if (!TokenService.getAuth() || publicPaths.some((i) => path.includes(i))) {
	//   return <NonAuthWrapper>{children}</NonAuthWrapper>;
	// }

	return (
		<Box
			component={'div'}
			sx={{
				backgroundColor: theme.palette.main.gray90,
			}}
			className='wrapper'>
			{/* <Sidebar /> */}
			{/* <Sidebar anchor="left" ref={drawerPcRef}>
        <HamburgerIcon />
      </Sidebar> */}
			<CustomDrawer handleLayoutToggle={handleLayoutToggle} />
			<Main
				open={open}
				sx={{
					backgroundColor: theme.palette.main.gray90,
				}}>
				{children}
			</Main>
		</Box>
	);
};

export default AuthWrapper;
