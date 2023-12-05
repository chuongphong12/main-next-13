import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs as MBreadcrumbs } from '@mui/material';
import Link from 'next/link';
import Typography from '@/elements/Typography';
import ChevronLeftIcon from '../../assets/icons/chevron-left';
import ChevronRightIcon from '../../assets/icons/chevron-right';
import Home from '../../assets/icons/home';

interface BreadcrumbProps {
	data: any;
	onClick?: any;
	triggerIndex?: number;
}

interface BreadcrumbItemProps {
	name: string;
	url?: string;
}

const Breadcrumbs = (props: BreadcrumbProps) => {
	const { data, onClick, triggerIndex } = props;
	const theme = useTheme();
	function handleClick(
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		index: number
	) {
		event.preventDefault();
		if (onClick && index === triggerIndex) onClick();
	}
	const breadcrumbs = data.map((breadcrumb: BreadcrumbItemProps, index: number) => {
		if (!breadcrumb.url) {
			return (
				<Typography key={index} cate={'caption_1'} color={theme.palette.main.white}>
					{breadcrumb.name}
				</Typography>
			);
		} else {
			return (
				<Link
					style={{
						textDecoration: 'none',
						color: 'primary',
						fontWeight: 600,
					}}
					key={index}
					color='inherit'
					href={breadcrumb.url}>
					{breadcrumb.name}
				</Link>
			);
		}
	});

	return (
		<Stack sx={{ py: 1.5 }} spacing={2}>
			<MBreadcrumbs
				separator={
					<Box px={2}>
						<ChevronRightIcon stroke={'#fff'} />
					</Box>
				}
				aria-label='breadcrumb'>
				<Home stroke={'#fff'} />
				{breadcrumbs}
			</MBreadcrumbs>
		</Stack>
	);
};

export default Breadcrumbs;
