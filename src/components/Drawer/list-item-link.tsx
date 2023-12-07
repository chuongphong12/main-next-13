import Typography from '@/elements/Typography';
import { Box, ListItem, useTheme } from '@mui/material';
import Link from 'next/link';
import { ListItemLinkProps } from './drawer.type';

const ListItemLink = ({
	to = '',
	text = '',
	activeIcon,
	icon,
	drawerOpen,
	isParent = false,
	onClick,
	highlight,
	child,
}: ListItemLinkProps) => {
	const theme = useTheme();
	if (to) {
		if (isParent) {
			return (
                <ListItem
					disablePadding
					sx={{ cursor: 'pointer' }}
					className='disable-text-selection'
					onClick={onClick}>
					<Link href={to} legacyBehavior>
						<Box display='flex'>
							<Box sx={{ marginRight: drawerOpen ? '1rem' : 0 }} component={'div'}>
								{highlight ? activeIcon : null}
								{!highlight ? icon : null}
							</Box>
							{drawerOpen && (
								<Typography
									cate='subtitle_1_semibold'
									color={!highlight ? theme.palette.main.gray10 : undefined}
									sx={{
										...(highlight && {
											background: theme.palette.gradation.blue,
											'-webkit-background-clip': 'text',
											'-webkit-text-fill-color': 'transparent',
										}),
										...(!highlight && {
											color: theme.palette.main.gray10,
										}),
									}}>
									{text}
								</Typography>
							)}
						</Box>
					</Link>
				</ListItem>
            );
		}
		return (
            <ListItem
				sx={{
					padding: '0.5rem 2.5rem',
					cursor: 'pointer',
				}}
				onClick={onClick}
				className='disable-text-selection'>
				{icon && icon}
				<Link href={to} legacyBehavior>
					<Typography
						cate='body_3'
						color={highlight ? theme.palette.main.point : theme.palette.main.gray10}>
						{text}
					</Typography>
				</Link>
			</ListItem>
        );
	}
	return (
        <ListItem
			disablePadding
			onClick={onClick}
			sx={{ cursor: 'pointer' }}
			className='disable-text-selection'>
			<Link href={child && child[0].to} legacyBehavior>
				<Box display='flex'>
					<Box sx={{ marginRight: drawerOpen ? '1rem' : 0 }} component={'div'}>
						{highlight ? activeIcon : null}
						{!highlight ? icon : null}
					</Box>
					{drawerOpen && (
						<Typography
							cate='subtitle_1_semibold'
							color={!highlight ? theme.palette.main.gray10 : undefined}
							sx={{
								...(highlight && {
									background: theme.palette.gradation.blue,
									'-webkit-background-clip': 'text',
									'-webkit-text-fill-color': 'transparent',
								}),
								...(!highlight && {
									color: theme.palette.main.gray10,
								}),
							}}>
							{text}
						</Typography>
					)}
				</Box>
			</Link>
		</ListItem>
    );
};

export default ListItemLink;
