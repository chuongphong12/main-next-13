'use client';

import { logingOutAtom } from '@/atoms/loging-out';
import {
	DropdownMenuItem,
	DropdownNestedMenuItem,
} from '@/elements/NestedMenuItem/NestedMenuItem';
import Typography from '@/elements/Typography';
import { logout } from '@/services/auth.service';
import { IUser } from '@/types/user.type';
import { convertToRem } from '@/utils/convert-to-rem';
import { ArrowRight } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	Divider,
	ListItemIcon,
	Menu,
	MenuItem,
	styled,
	useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import CheckIcon from '../../assets/icons/check';
import ChevronDownIcon from '../../assets/icons/chevron-down';
import CustomerManagementIcon from '../../assets/icons/customer-management';
import SettingSmIcon from '../../assets/icons/setting-sm';
import SwitchThemeIcon from '../../assets/icons/switch';
import UserSmIcon from '../../assets/icons/user-sm';
import { ListItemLinkProps } from './drawer.type';

export interface drawerItemProps extends IDrawerItem {
	drawerOpen: boolean;
	setDrawerOpen: (state: boolean) => void;
}
export interface IDrawerItem {
	to?: string;
	text?: string;
	icon?: ReactNode;
	child?: Array<ListItemLinkProps> | undefined;
	index?: number;
	activeIcon?: ReactNode;
}

const RoundGradientAvatar = styled('div')(({ theme }) => ({
	padding: '0.25rem',
	border: 'none',
	outline: 'none',
	position: 'relative',
	width: '2.5rem',
	height: '2.5rem',
	zIndex: 1,
	borderRadius: '250rem',
	background: theme.palette.gradation.sky,
	cursor: 'pointer',

	'&::before': {
		content: '""',
		position: 'absolute',
		left: '1px',
		right: '1px',
		top: '1px',
		bottom: '1px',
		borderRadius: '250rem',
		backgroundColor: theme.palette.main.black,
		zIndex: -1,
		transition: '200ms',
	},
}));

const HeaderMenu = ({
	user,
	isDarkMode,
	handleUpdateTheme,
}: {
	user: IUser | null;
	isDarkMode: boolean;
	handleUpdateTheme: (theme?: 'light' | 'dark') => void;
}) => {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const setLogingOut = useSetRecoilState(logingOutAtom);
	const menuOpen = Boolean(anchorEl);
	const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeUserMenu = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		setLogingOut(true);
		await logout();
	};
	const theme = useTheme();
	return (
		<>
			<Button
				id='demo-positioned-button'
				aria-controls={menuOpen ? 'demo-positioned-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={menuOpen ? 'true' : undefined}
				onClick={openUserMenu}
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}>
				<RoundGradientAvatar>
					<Avatar
						sx={{
							width: '2rem',
							height: '2rem',
						}}
						src={user?.avatar?.url ? user?.avatar?.url : '/images/blank-user.png'}
					/>
				</RoundGradientAvatar>
				<Typography cate='body_3' color={theme.palette.main.white} mx={1}>
					{user?.nickname}
				</Typography>
				<ChevronDownIcon stroke={theme.palette.main.white} />
			</Button>
			<Menu
				id='demo-positioned-menu'
				aria-labelledby='demo-positioned-button'
				anchorEl={anchorEl}
				open={menuOpen}
				onClose={closeUserMenu}
				sx={{
					width: '20rem',
					'& .MuiPaper-root': {
						backgroundColor: theme.palette.main.gray80,
						backgroundImage: 'none',
					},
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}>
				<Box px={1} py={0.75} display={'flex'} alignItems={'center'} width={'15rem'}>
					<Avatar
						sx={{
							width: '2.5rem',
							height: '2.5rem',
						}}
						src={user?.avatar?.url ? user?.avatar?.url : '/images/blank-user.png'}
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
				<Divider />
				<MenuItem
					sx={{
						padding: '0.62rem 1rem',
					}}
					onClick={() => {
						router.push('/me');
						closeUserMenu();
					}}>
					<ListItemIcon>
						<UserSmIcon />
					</ListItemIcon>
					<Typography cate='caption_1' color='main.white'>
						회원정보
					</Typography>
				</MenuItem>
				<MenuItem
					sx={{
						padding: '0.62rem 1rem',
					}}
					onClick={() => {
						router.push('/community-management');
						closeUserMenu();
					}}>
					<ListItemIcon>
						<CustomerManagementIcon />
					</ListItemIcon>
					<Typography cate='caption_1' color='main.white'>
						구독관리
					</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						router.push('/setting');
						closeUserMenu();
					}}
					sx={{
						padding: '0.62rem 1rem',
					}}>
					<ListItemIcon>
						<SettingSmIcon />
					</ListItemIcon>
					<Typography cate='caption_1' color='main.white'>
						환경설정
					</Typography>
				</MenuItem>
				<DropdownNestedMenuItem
					rightAnchore={true}
					label={
						<>
							<ListItemIcon>
								<SwitchThemeIcon />
							</ListItemIcon>
							<Typography cate='caption_1' color='main.white'>
								모드변경
							</Typography>
						</>
					}
					parentMenuOpen={menuOpen}
					rightIcon={<ArrowRight />}>
					<>
						<DropdownMenuItem
							onClick={() => {
								handleUpdateTheme('dark');
							}}>
							<Box sx={{ width: convertToRem(24) }}>{isDarkMode && <CheckIcon />}</Box>
							Dark mode
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								handleUpdateTheme('light');
							}}>
							<Box sx={{ width: convertToRem(24) }}>{!isDarkMode && <CheckIcon />}</Box>
							Light mode
						</DropdownMenuItem>
					</>
				</DropdownNestedMenuItem>
				<MenuItem
					sx={{
						padding: '0.62rem 1rem',
					}}
					onClick={handleLogout}>
					<Typography cate='caption_1' color='main.white'>
						로그아웃
					</Typography>
				</MenuItem>
			</Menu>
		</>
	);
};
export default HeaderMenu;
