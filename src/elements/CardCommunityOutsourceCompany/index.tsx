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
import Image from 'next/image';
import HeartBlankIcon from '../../assets/icons/heart-blank';
import HeartIcon from '../../assets/icons/heart';
import BookmarkCheckbox from '@/elements/BookmarkCheckbox';
import YoutubeIcon from '../../assets/icons/youtube-logo';
import { IBlog } from 'types/blog.type';
import { formatCurrency } from 'utils/format-currency';
import moment from 'moment';
import HeartSmIcon from '../../assets/icons/heart-sm';
import HeartFilledIcon from '../../assets/icons/heart-filled';
import BookmarkSmFilledIcon from '../../assets/icons/bookmark-sm-filled';
import BookmarkFilled from '../../assets/icons/bookmark-filled';
import Bookmark from '../../assets/icons/bookmark';
import { useState } from 'react';
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

type CardCommunityOutsourceCompanyProps = {
	onClick?: Function;
	onBookmark?: Function;
	item?: IBlog;
};
export default function CardCommunityOutsourceCompany({
	onClick,
	onBookmark,
	item,
}: CardCommunityOutsourceCompanyProps) {
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
				width: md ? '100%' : convertToRem(335),
				backgroundColor: theme.palette.main.gray80,
				borderRadius: convertToRem(16),
				position: 'relative',
				height: 'auto',
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				flexDirection: 'column',
			}}>
			<Box position={'absolute'} zIndex={3} bottom={24} right={16}>
				<IconButton
					sx={{
						backgroundColor: 'transparent',
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
				onClick={() => {
					onClick?.();
				}}
				sx={{
					maxWidth: 335,
					zIndex: 1,
					height: 'auto',
					width: md ? '100%' : convertToRem(335),
					backgroundColor: theme.palette.main.gray80,
					padding: convertToRem(16),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					flexDirection: 'column',
				}}>
				<Box
					display={'flex'}
					alignItems='center'
					justifyContent={'space-between'}
					zIndex={2}
					component='div'
					sx={{
						width: '100%',
						position: 'relative',
					}}
					onClick={() => {
						onClick?.();
					}}>
					<Box
						display={'flex'}
						alignItems='center'
						justifyContent={'space-between'}
						zIndex={2}
						component='div'
						sx={{
							width: '100%',
							height: convertToRem(192),
							position: 'relative',
						}}>
						<Image
							src={'/assets/images/blank-thumbnail.png'}
							layout='fill'
							alt={'blank-thumbnail.'}
							style={{
								maxHeight: convertToRem(192) + ' !important',
								objectFit: 'contain',
								width: '100%',
								position: 'relative',
								height: 'unset !important',
							}}
						/>
					</Box>
				</Box>
				<Box
					display={'flex'}
					alignItems='center'
					width={'100%'}
					zIndex={2}
					mt={2}
					onClick={() => {
						onClick?.();
					}}>
					<Typography cate='caption_1_semibold' color={theme.palette.main.gray10}>
						메인콘텐츠
					</Typography>

					<Typography cate='caption_2' color={theme.palette.main.gray30} ml={1}>
						개발/SI
					</Typography>
				</Box>

				<Typography
					mt={0.5}
					cate='caption_1'
					color={theme.palette.main.gray30}
					zIndex={2}
					onClick={() => {
						onClick?.();
					}}
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: '2',
						WebkitBoxOrient: 'vertical',
					}}>
					메인콘텐츠와 함께 슘페터 서비스를 만들어 나갈 인재를 찾습니다.
				</Typography>
				<Box
					display={'flex'}
					alignItems='center'
					justifyContent={'space-between'}
					width={'100%'}
					zIndex={2}
					mt={0.5}>
					<Box
						display={'flex'}
						alignItems='center'
						justifyContent={'space-between'}
						width={'100%'}
						my={2}
						zIndex={2}>
						<Box display={'flex'} alignItems={'center'}>
							<BookmarkSmFilledIcon />
							<Typography cate='caption_2' color={theme.palette.main.gray30} mr={1}>
								12
							</Typography>
							<HeartFilledIcon />
							<Typography cate='caption_2' color={theme.palette.main.gray30}>
								4,100
							</Typography>
						</Box>
					</Box>
				</Box>
			</CardActionArea>
		</Card>
	);
}
