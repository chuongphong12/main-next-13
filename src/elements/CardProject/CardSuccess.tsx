import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, CardActionArea, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { convertToRem } from 'utils/convert-to-rem';
import Typography from '@/elements/Typography';
import ProjectSuccessIcon from '../../assets/icons/project-success';
import Image from "next/legacy/image";
import FavCheckbox from '@/elements/FavCheckbox';
import MenuIcon from '../../assets/icons/menu';

export default function CardSuccess() {
	const theme = useTheme();
	const md = useMediaQuery('(max-width: 768px)');
	const xs = useMediaQuery('(max-width: 375px)');

	return (
		<Card
			sx={{
				maxWidth: 456,
				height: '100%',
				maxHeight: convertToRem(248),
				minHeight: xs ? convertToRem(182) : convertToRem(248),
				width: md ? '100%' : convertToRem(456),
				backgroundColor: theme.palette.main.gray80,
				borderRadius: convertToRem(16),
				display: 'flex',
				alignItems: 'flex-end',
				justifyContent: 'flex-start',
				flexDirection: 'column',
				position: 'relative',
			}}>
			<Box display={'flex'} zIndex={2} mt={2} mr={2}>
				<Box p={1}>
					<FavCheckbox />
				</Box>
				<IconButton>
					<MenuIcon />
				</IconButton>
			</Box>
			<CardActionArea
				onClick={() => {}}
				sx={{
					maxWidth: 456,
					zIndex: 1,
					height: '100%',
					maxHeight: convertToRem(248),
					minHeight: xs ? convertToRem(182) : convertToRem(248),
					width: md ? '100%' : convertToRem(456),
					backgroundColor: theme.palette.main.gray80,
					padding: convertToRem(16),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					position: 'absolute',
				}}>
				<Image width={96} height={100} src='/images/project-success.png' />
				<Box
					position={'absolute'}
					sx={{ background: theme.palette.main.black }}
					width={40}
					height={27}
					paddingY={0.5}
					paddingX={1}
					borderRadius={1}
					top={'43%'}>
					<Typography cate='body_3' color={theme.palette.main.gray10}>
						4개
					</Typography>
				</Box>
				<Typography cate='body_2' color={theme.palette.main.gray10} mt={2.5}>
					완료된 프로젝트 폴더
				</Typography>
			</CardActionArea>
		</Card>
	);
}
