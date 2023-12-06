'use client';

import { logingOutAtom } from '@/atoms/loging-out';
import { sidebarOpenAtom } from '@/atoms/sidebar-open';
import { userAtom } from '@/atoms/user';
import AppLogoSm from '@/elements/AppLogoSm';
import ThemeSwitch from '@/elements/ThemeSwitch';
import Typography from '@/elements/Typography';
import { ColorModeContext } from '@/libs/ThemeRegistry';
import { logout } from '@/services/auth.service';
import { updateUserProfile } from '@/services/user.service';
import WebInfoService from '@/services/web-info.service';
import { convertToRem } from '@/utils/convert-to-rem';
import {
	Avatar,
	Badge,
	Button,
	Grid,
	ListItem,
	ListItemIcon,
	MenuItem,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import { CSSObject, Theme, styled } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Admin from '../../assets/icons/admin';
import BlogIcon from '../../assets/icons/blog';
import BlogFilledIcon from '../../assets/icons/blog-filled';
import CommunityActiveDrawerIcon from '../../assets/icons/community-active-drawer-icon';
import CreditCardIcon from '../../assets/icons/credit-card';
import Customer from '../../assets/icons/customer';
import CustomerManagementIcon from '../../assets/icons/customer-management';
import DarkIcon from '../../assets/icons/dark';
import DrawerClose from '../../assets/icons/drawer-close';
import CommunityDrawerIcon from '../../assets/icons/drawer-community';
import DrawerOpen from '../../assets/icons/drawer-open';
import Home from '../../assets/icons/home';
import HomeActiveIcon from '../../assets/icons/home-active';
import LightIcon from '../../assets/icons/light';
import LogoutIcon from '../../assets/icons/log-out';
import MenuHeader from '../../assets/icons/menu-header';
import NotificationIcon from '../../assets/icons/notifications';
import RocketDrawer from '../../assets/icons/rocket-drawer';
import RocketDrawerFilled from '../../assets/icons/rocket-drawer-filled';
import SettingSmIcon from '../../assets/icons/setting-sm';
import UserIcon from '../../assets/icons/user';
import UserActiveIcon from '../../assets/icons/user-active';
import UserSmIcon from '../../assets/icons/user-sm';
import DrawerItem, { IDrawerItem } from './drawer-item';
import HeaderMenu from './header-menu';

const drawerWidth = 320;
const drawerWidthClosed = 136;
const appbarHeight = 104;
const appbarHeightSm = 64;

const RoundGradientButton = styled(Button)(({ theme }) => ({
	padding: '0.5rem 1rem',
	border: 'none',
	outline: 'none',
	position: 'relative',
	zIndex: 1,
	borderRadius: '0.5rem',
	background: theme.palette.gradation.sky,
	cursor: 'pointer',

	'&::before': {
		content: '""',
		position: 'absolute',
		left: '1px',
		right: '1px',
		top: '1px',
		bottom: '1px',
		borderRadius: '0.5rem',
		backgroundColor: theme.palette.main.black,
		zIndex: -1,
		transition: '200ms',
	},
}));

const openedMixin = (theme: Theme): CSSObject => ({
	width: '100%',
	[theme.breakpoints.up('md')]: {
		width: drawerWidth,
	},
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: 0,
	[theme.breakpoints.up('md')]: {
		width: convertToRem(drawerWidthClosed),
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	height: convertToRem(103),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	height: convertToRem(appbarHeightSm),
	[theme.breakpoints.up('md')]: {
		height: convertToRem(appbarHeight),
	},
	zIndex: theme.zIndex.drawer + 1,
	backgroundColor: theme.palette.main.black,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		backgroundColor: theme.palette.main.black,

		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const ToggleStyle = styled('div', {
	shouldForwardProp: (prop) => prop !== 'open',
})<any>(({ theme, open }) => ({
	width: convertToRem(16),
	backgroundColor: theme.palette.main.gray90,
	...(open && {
		transform: `translateX(0)`,
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
	...(!open && {
		transform: `translateX(${drawerWidthClosed - drawerWidth + 'px'})`,
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: '100%',
	height: convertToRem(appbarHeight),
	[theme.breakpoints.up('md')]: {
		width: drawerWidth,
	},
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	border: 'none',
	padding: '2.5rem 3rem',
	backgroundColor: theme.palette.main.gray90,

	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': {
			...openedMixin(theme),
			border: 'none',
		},
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': {
			...closedMixin(theme),
			border: 'none',
		},
	}),
}));

const CustomDrawer = ({ handleLayoutToggle }: any) => {
	const match = useMediaQuery('(max-width: 768px)');
	const router = useRouter();
	const path = usePathname();
	const [user, setUser] = useRecoilState(userAtom);
	const theme = useTheme();
	const [open, setOpen] = useState<boolean>(match ? false : true);
	const setSidebarOpen = useSetRecoilState(sidebarOpenAtom);

	useEffect(() => {
		setSidebarOpen(open);
	}, [open]);

	const drawerPersonalData: IDrawerItem[] = [
		{
			text: '메인 홈',
			to: '/blogs',
			icon: <Home stroke={theme.palette.main.gray10} />,
			activeIcon: <HomeActiveIcon />,
		},
		{
			text: '마이페이지',
			icon: <UserIcon stroke={theme.palette.main.gray10} />,
			activeIcon: <UserActiveIcon />,
			child: [
				{ text: '회원정보', to: '/me' },
				// { text: '결제관리', to: '/payment-management' },
				{ text: '커뮤니티관리', to: '/community-management' },
				{ text: '환경설정', to: '/setting' },
			],
		},
	];
	const drawerPublicData: IDrawerItem[] = [
		{
			text: '메인 홈',
			to: '/',
			icon: <RocketDrawer stroke={theme.palette.main.gray10} />,
			activeIcon: <RocketDrawerFilled />,
		},
		{
			text: '콘텐츠 블로그',
			to: '/blogs',
			icon: <BlogIcon stroke={theme.palette.main.gray10} />,
			activeIcon: <BlogFilledIcon />,
		},
		{
			text: '커뮤니티',
			icon: <CommunityDrawerIcon stroke={theme.palette.main.gray10} />,
			activeIcon: <CommunityActiveDrawerIcon />,
			child: [
				{ text: '교육행사 & 지원사업', to: '/community/events' },
				{ text: '인재 POOL', to: '/community/talents' },
			],
		},
	];
	const [currentDrawerData, setCurrentDrawerData] =
		useState<IDrawerItem[]>(drawerPersonalData);
	const colorMode = useContext(ColorModeContext);
	const setLogingOut = useSetRecoilState(logingOutAtom);

	const userPersonalUrls = ['setting', 'me', 'community-management'];
	const userPublicUrls = ['', 'community', 'blogs'];
	const parentPath = path.split('/')[1]?.split('?')[0];
	const handleLogout = async () => {
		setLogingOut(true);
		await logout();
	};
	useEffect(() => {
		if (userPersonalUrls.some((i) => i === parentPath)) {
			setCurrentDrawerData(drawerPersonalData);
		} else if (userPublicUrls.some((i) => i === parentPath)) {
			setCurrentDrawerData(drawerPublicData);
		} else {
			setCurrentDrawerData(drawerPersonalData);
		}
	}, [parentPath]);

	const handleDrawerToggle = () => {
		handleLayoutToggle(!open);
		setOpen((prev) => !prev);
	};

	const updateThemeMode = async (themeMode?: 'light' | 'dark' | any) => {
		let newMode: 'light' | 'dark' =
			!!themeMode && (themeMode === 'light' || themeMode === 'dark')
				? themeMode
				: user?.isDarkMode
				? 'light'
				: 'dark';
		const updateData = {
			isDarkMode: !user?.isDarkMode,
		};
		colorMode.toggleColorMode(newMode);
		const { data, error } = await updateUserProfile(updateData);
		if (data && !error) {
			setUser(data.data);
		} else {
		}
	};
	return (
		<>
			<AppBar position='fixed' open={false}>
				<Toolbar
					sx={{
						backgroundColor: theme.palette.main.black,
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<AppLogoSm />
					{match ? (
						<Box component={'div'} display={'flex'} alignItems={'center'}>
							<Badge
								variant='dot'
								sx={{
									marginRight: '1rem',
									'& .MuiBadge-badge': {
										transform: 'scale(1.5) translate(0%, 0%)',
										borderRadius: '250rem',
										background: theme.palette.main.primary_light,
									},
								}}>
								<Box
									component='div'
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: '2.5rem',
										height: '2.5rem',
									}}>
									<NotificationIcon stroke={theme.palette.main.white} />
								</Box>
							</Badge>
							<IconButton onClick={handleDrawerToggle}>
								<MenuHeader />
							</IconButton>
						</Box>
					) : (
						<Box component={'div'} display={'flex'} alignItems={'center'}>
							<RoundGradientButton>
								<Typography
									cate='body_3'
									sx={{
										background: theme.palette.gradation.sky,
										'-webkit-background-clip': 'text',
										'-webkit-text-fill-color': 'transparent',
									}}>
									업그레이드
								</Typography>
							</RoundGradientButton>
							<Badge
								variant='dot'
								sx={{
									marginLeft: '2rem',
									marginRight: '2rem',
									'& .MuiBadge-badge': {
										transform: 'scale(1.5) translate(0%, 0%)',
										borderRadius: '250rem',
										background: theme.palette.main.primary_light,
									},
								}}>
								<Box
									component='div'
									sx={{
										border: '1px solid ' + theme.palette.main.gray50,
										borderRadius: '250rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: '2.5rem',
										height: '2.5rem',
									}}>
									<NotificationIcon stroke={theme.palette.main.white} />
								</Box>
							</Badge>
							<HeaderMenu
								user={user}
								isDarkMode={WebInfoService.getThemeMode() === 'dark'}
								handleUpdateTheme={updateThemeMode}
							/>
						</Box>
					)}
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<DrawerHeader
					sx={{
						height: match ? appbarHeightSm : appbarHeight,
					}}></DrawerHeader>
				<Box
					component={'div'}
					flexDirection={'row'}
					display={'flex'}
					flexWrap={'nowrap'}
					sx={{
						height: '100%',
						width: '100%',
						[theme.breakpoints.up('md')]: {
							width: drawerWidth,
						},
						backgroundColor: theme.palette.main.gray90,
					}}>
					<Box
						component='div'
						sx={{
							width: '100%',
							[theme.breakpoints.up('md')]: {
								width: convertToRem(304),
							},
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'column',
							height: '100%',
							backgroundColor: theme.palette.main.black,
							padding: '2.5rem 3rem',
						}}>
						<List>
							{match && (
								<>
									<Box pb={2} display={'flex'} alignItems={'center'} width={'100%'}>
										<Avatar
											sx={{
												width: '2.5rem',
												height: '2.5rem',
											}}
											src={
												user?.avatar?.url ? user?.avatar?.url : 'images/blank-user.png'
											}
										/>
										<Box
											ml={1.5}
											display={'flex'}
											alignItems={'flex-start'}
											justifyContent={'space-between'}
											flexDirection={'column'}>
											<Typography cate='caption_1_semibold' mb={0.25}>
												담당자 (프리미엄)
											</Typography>
											<Typography cate='caption_2' color={theme.palette.main.gray30}>
												{user?.email}
											</Typography>
										</Box>
									</Box>
									<Grid container mb={5}>
										<Grid item xs={6}>
											<MenuItem
												sx={{
													padding: '0.62rem 0',
												}}
												onClick={() => {
													router.push('/me');
													setOpen(false);
												}}>
												<ListItemIcon>
													<UserSmIcon />
												</ListItemIcon>
												<Typography cate='caption_1' color='main.white'>
													회원정보
												</Typography>
											</MenuItem>
										</Grid>
										<Grid item xs={6}>
											<MenuItem
												onClick={() => {
													router.push('/setting');
													setOpen(false);
												}}
												sx={{
													padding: '0.62rem 0',
												}}>
												<ListItemIcon>
													<CreditCardIcon />
												</ListItemIcon>
												<Typography cate='caption_1' color='main.white'>
													결제관리
												</Typography>
											</MenuItem>
										</Grid>
										<Grid item xs={6}>
											<MenuItem
												sx={{
													padding: '0.62rem 0',
												}}
												onClick={() => {
													setOpen(false);
													router.push('/community-management');
												}}>
												<ListItemIcon>
													<CustomerManagementIcon />
												</ListItemIcon>
												<Typography cate='caption_1' color='main.white'>
													구독관리
												</Typography>
											</MenuItem>
										</Grid>

										<Grid item xs={6}>
											<MenuItem
												onClick={() => {
													router.push('/setting');
												}}
												sx={{
													padding: '0.62rem 0',
												}}>
												<ListItemIcon>
													<SettingSmIcon />
												</ListItemIcon>
												<Typography cate='caption_1' color='main.white'>
													환경설정
												</Typography>
											</MenuItem>
										</Grid>
									</Grid>
								</>
							)}
							{currentDrawerData.map((drawerItem: IDrawerItem, index: number) => (
								<DrawerItem
									{...drawerItem}
									setDrawerOpen={(data) => {
										handleLayoutToggle(!open);
										if (match) {
											setOpen(false);
										} else {
											setOpen(true);
										}
									}}
									drawerOpen={open}
									key={index}
									index={index}
								/>
							))}
							{match && (
								<>
									<ListItem onClick={handleLogout} sx={{ padding: '1rem 0' }}>
										<Customer stroke={theme.palette.main.white} />
										<Typography ml={2} cate='body_3_semibold'>
											고객센터
										</Typography>
									</ListItem>
									<ListItem onClick={handleLogout} sx={{ padding: '1rem 0' }}>
										<Admin />
										<Typography ml={2} cate='body_3_semibold'>
											관리자전환
										</Typography>
									</ListItem>
									<ListItem onClick={handleLogout} sx={{ padding: '1rem 0' }}>
										<LogoutIcon />
										<Typography ml={2} cate='body_3_semibold'>
											로그아웃
										</Typography>
									</ListItem>
								</>
							)}
						</List>
						<Box display='flex' justifyContent={'space-between'}>
							{open ? (
								<ThemeSwitch
									checked={WebInfoService.getThemeMode() === 'dark'}
									onChange={updateThemeMode}
								/>
							) : (
								<IconButton onClick={updateThemeMode} sx={{ marginLeft: -1.75 }}>
									{WebInfoService.getThemeMode() === 'dark' ? (
										<DarkIcon />
									) : (
										<LightIcon />
									)}
								</IconButton>
							)}
							{open && match && (
								<RoundGradientButton>
									<Typography
										cate='body_3'
										sx={{
											background: theme.palette.gradation.sky,
											'-webkit-background-clip': 'text',
											'-webkit-text-fill-color': 'transparent',
										}}>
										업그레이드
									</Typography>
								</RoundGradientButton>
							)}
						</Box>
					</Box>
					{!match && (
						<ToggleStyle open={open}>
							<Box
								component={'div'}
								sx={{
									position: 'absolute',
									transform: 'translateY(16px)',
								}}>
								<IconButton onClick={handleDrawerToggle} sx={{ padding: 0 }}>
									{!open ? <DrawerOpen /> : <DrawerClose />}
								</IconButton>
							</Box>
						</ToggleStyle>
					)}
				</Box>
			</Drawer>
		</>
	);
};

export default CustomDrawer;
