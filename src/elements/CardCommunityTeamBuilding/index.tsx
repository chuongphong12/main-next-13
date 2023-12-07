import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
	Box,
	CardActionArea,
	styled,
	useMediaQuery,
	useTheme,
	ChipProps as MChipProps,
	Chip as MChip,
	Avatar,
	IconButton,
} from '@mui/material';
import { convertToRem } from 'utils/convert-to-rem';
import PlusLgIcon from '../../assets/icons/plus-lg';
import Typography from '@/elements/Typography';
import Image from "next/legacy/image";
import HeartBlankIcon from '../../assets/icons/heart-blank';
import HeartIcon from '../../assets/icons/heart';
import BookmarkCheckbox from '@/elements/BookmarkCheckbox';
import YoutubeIcon from '../../assets/icons/youtube-logo';
import BookmarkFilledIcon from '../../assets/icons/bookmark-sm-filled';
import HeartFilledIcon from '../../assets/icons/heart-filled';
import Bookmark from '../../assets/icons/bookmark';
import { useState } from 'react';
import BookmarkFilled from '../../assets/icons/bookmark-filled';
export type ChipProps = MChipProps & {
	type?: string;
};
const Chip = styled(MChip)<ChipProps>(({ theme, type }) => ({
	backgroundColor:
		type === 'error'
			? theme.palette.main.danger
			: type === 'warning'
			? '#FC7900'
			: theme.palette.main.primary,
	padding: '1px 5px 2px 5px',
	color: theme.palette.main.white,
	borderRadius: '2px',
	fontSize: convertToRem(12),
	'.MuiChip-label': {
		padding: 0,
	},
	fieldset: {
		border: 0,
		backgroundColor: theme.palette.main.gray70,
	},
}));
export default function CardCommunityTeamBuilding() {
	const theme = useTheme();
	const md = useMediaQuery('(max-width: 768px)');
	const xs = useMediaQuery('(max-width: 375px)');
	const [bookmark, setBookmark] = useState(false);
	const toggleBookmark = () => {
		setBookmark((prev) => !prev);
	};

	return (
		<Card
			sx={{
				maxWidth: convertToRem(335),
				height: '100%',
				maxHeight: convertToRem(370),
				minHeight: convertToRem(370),
				width: md ? '100%' : convertToRem(335),
				backgroundColor: theme.palette.main.gray80,
				borderRadius: convertToRem(16),
				position: 'relative',
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				flexDirection: 'column',
			}}>
			<Box position={'absolute'} zIndex={3} top={12} right={16}>
				<IconButton
					sx={{
						backgroundColor: theme.palette.main.gray90,
						width: '2rem',
						height: '2rem',
						padding: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						'&:hover': {
							backgroundColor: theme.palette.main.gray80,
						},
					}}
					onClick={toggleBookmark}>
					{bookmark ? <BookmarkFilled /> : <Bookmark stroke={theme.palette.main.white} />}
				</IconButton>
			</Box>

			<CardActionArea
				onClick={() => {}}
				sx={{
					maxWidth: 335,
					zIndex: 1,
					height: '100%',
					maxHeight: convertToRem(370),
					minHeight: convertToRem(370),
					width: md ? '100%' : convertToRem(335),
					backgroundColor: theme.palette.main.gray80,
					padding: convertToRem(16),
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Box display='flex' width='100%' justifyContent='flex-start'>
					<Image
						src='/images/test-img.png'
						width={88}
						height={88}
						style={{ borderRadius: '0.5rem' }}
					/>
				</Box>
				<Box
					display={'flex'}
					flexDirection={'column'}
					width={'100%'}
					justifyContent={'flex-start'}
					alignItems={'flex-start'}
					zIndex={2}
					gap={1}
					my={3}>
					<Typography cate='caption_1' color={theme.palette.main.gray30}>
						@메인콘텐츠
					</Typography>
					<Typography
						cate='body_3_semibold'
						color={theme.palette.main.gray10}
						zIndex={2}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '2',
							WebkitBoxOrient: 'vertical',
						}}>
						데이터 기반 프로그램 코파운블록체인 기반 가상화폐 DeFi(탈중앙화 금융..더 모집
						데이터 기반 프로그램 코파운블록체인 기반 가상화폐 DeFi(탈중앙화 금융..더 모집
					</Typography>
					<Typography
						cate='body_3'
						color={theme.palette.main.gray30}
						zIndex={2}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '2',
							WebkitBoxOrient: 'vertical',
						}}>
						데이터 기반 프로그램 코파운블록체인 기반 가상화폐 DeFi(탈중앙화 금융..더 모집
						데이터 기반 프로그램 코파운블록체인 기반 가상화폐 DeFi(탈중앙화 금융..더 모집
					</Typography>
					<Typography
						cate='caption_1_semibold'
						color={theme.palette.main.primary_light}
						zIndex={2}
						mt={1}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '1',
							WebkitBoxOrient: 'vertical',
						}}>
						프론트 개발자: 1명 모집
					</Typography>
					<Typography
						cate='caption_1_semibold'
						color={theme.palette.main.primary_light}
						zIndex={2}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '1',
							WebkitBoxOrient: 'vertical',
						}}>
						백앤드 개발자: 1명 보집
					</Typography>
				</Box>

				<Box
					display={'flex'}
					alignItems='center'
					justifyContent={'space-between'}
					width={'100%'}
					zIndex={2}>
					<Box display={'flex'} alignItems={'center'}>
						<Typography cate='caption_2' color={theme.palette.main.gray30} mr={1}>
							1일전
						</Typography>
						<BookmarkFilledIcon />
						<Typography cate='caption_2' color={theme.palette.main.gray30} mr={1}>
							12
						</Typography>
						<HeartFilledIcon />
						<Typography cate='caption_2' color={theme.palette.main.gray30}>
							4,100
						</Typography>
					</Box>
				</Box>
			</CardActionArea>
		</Card>
	);
}
