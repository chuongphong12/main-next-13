import BookmarkCheckbox from '@/elements/BookmarkCheckbox';
import Typography from '@/elements/Typography';
import { IBlog } from '@/types/blog.type';
import { convertToRem } from '@/utils/convert-to-rem';
import { displayTimeDiff } from '@/utils/display-time-diff';
import { formatCurrency } from '@/utils/format-currency';
import {
	Avatar,
	Box,
	CardActionArea,
	Chip as MChip,
	ChipProps as MChipProps,
	debounce,
	styled,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import moment from 'moment';
import Image from "next/legacy/image";
import * as React from 'react';
import { useRef, useState } from 'react';
import HeartSmIcon from '../../assets/icons/heart-sm';
import YoutubeIcon from '../../assets/icons/youtube-logo';
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

type CardSlideProps = {
	onClick?: Function;
	onBookmark?: Function;
	item: IBlog;
};
export default function CardSlide({ onClick, onBookmark, item }: CardSlideProps) {
	const imageRef = useRef<any>();
	const theme = useTheme();
	const md = useMediaQuery('(max-width: 768px)');
	const xs = useMediaQuery('(max-width: 375px)');
	const isNew = moment().diff(moment(item.createdAt), 'days') < 10;
	const [height, setHeight] = useState(171);

	React.useEffect(() => {
		const handleResize = debounce(() => {
			setHeight((imageRef.current.clientWidth * 171) / 304);
		});
		imageRef?.current?.addEventListener('resize', handleResize);
		let resizeObserver: any;
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(handleResize);
			Array.from(imageRef.current.children).forEach((child) => {
				resizeObserver.observe(child);
			});
		}
		return () => {
			handleResize.clear();
			if (imageRef.current) {
				imageRef.current.removeEventListener('resize', handleResize);
			}

			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, []);
	return (
		<Card
			sx={{
				// maxWidth: convertToRem(335),
				height: 'auto',
				// maxHeight: convertToRem(370),
				// minHeight: convertToRem(200),
				width: '100%',
				backgroundColor: theme.palette.main.gray80,
				borderRadius: convertToRem(16),
				position: 'relative',
				display: 'flex',
				alignItems: 'flex-start',
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
					height: convertToRem(height),
					marginTop: convertToRem(16),
					paddingLeft: '1rem',
					paddingRight: '1rem',
					position: 'relative',
				}}
				onClick={() => {
					onClick?.();
				}}>
				<Box position={'absolute'} zIndex={3} left={'43%'}>
					<YoutubeIcon />
				</Box>
				<Box position={'absolute'} zIndex={3} bottom={8} right={24}>
					<MChip
						size='small'
						label={!!item.duration ? item.duration : '10:20'}
						sx={{ backgroundColor: theme.palette.main.gray80 }}
					/>
				</Box>
				<Box
					display={'flex'}
					alignItems='center'
					justifyContent={'space-between'}
					zIndex={2}
					component='div'
					ref={imageRef}
					sx={{
						width: '100%',
						height: convertToRem(height),
						position: 'relative',
					}}>
					<Image
						src={item?.thumbnail?.url}
						layout='fill'
						alt={item?.thumbnail?.name}
						style={{
							maxHeight: convertToRem(height) + ' !important',
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
				flexDirection='column'
				width={'100%'}
				height={convertToRem(175)}>
				<Box
					display={'flex'}
					alignItems='center'
					justifyContent={'space-between'}
					width={'100%'}
					zIndex={2}
					mt={2}
					px={2}
					onClick={() => {
						onClick?.();
					}}>
					<Typography cate='caption_1_semibold' color={theme.palette.main.point}>
						{item?.category?.name}
					</Typography>

					{item.isAdvertisement ? (
						<Chip type='primary' size='small' label='광고' />
					) : isNew ? (
						<Chip type='error' size='small' label='new' />
					) : item.isHot ? (
						<Chip type='warning' size='small' label='hot' />
					) : (
						<Box />
					)}
				</Box>
				<Box
					display={'flex'}
					alignItems={'center'}
					width={'100%'}
					zIndex={2}
					px={2}
					onClick={() => {
						onClick?.();
					}}>
					{!!item?.instructorThumbnail?.url ? (
						<Avatar
							sx={{
								width: convertToRem(24),
								height: convertToRem(24),
							}}
							alt='Remy Sharp'
							src={item?.instructorThumbnail?.url}
						/>
					) : (
						<></>
					)}

					{!!item?.instructorName ? (
						<Typography
							cate='caption_1'
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '1',
								WebkitBoxOrient: 'vertical',
							}}
							color={theme.palette.main.gray20}
							ml={!!item?.instructorThumbnail?.url ? 1 : 0}>
							{item?.instructorName}
						</Typography>
					) : (
						<></>
					)}
				</Box>
				<Typography
					mt={0.5}
					cate='body_2'
					color={theme.palette.main.white}
					zIndex={2}
					paddingX={2}
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
					{item?.title}
				</Typography>
				<Box
					display={'flex'}
					alignItems='center'
					justifyContent={'space-between'}
					width={'100%'}
					zIndex={2}
					mt={0.5}
					mb={1}
					px={2}>
					<Box
						display={'flex'}
						alignItems={'center'}
						onClick={() => {
							onClick?.();
						}}>
						<HeartSmIcon stroke={theme.palette.main.white} />
						<Typography
							cate='caption_1_semibold'
							color={theme.palette.main.white}
							ml={1}
							mr={3}>
							{formatCurrency(item?.totalView)}
						</Typography>
						<Typography cate='caption_1' color={theme.palette.main.white}>
							{/* {moment().diff(moment(item.createdAt), 'hours') < 48
                ? moment(item.createdAt).fromNow()
                : moment(item.createdAt).format('YYYY.MM.DD')} */}
							{displayTimeDiff(item.createdAt)}
						</Typography>
					</Box>
					<BookmarkCheckbox
						onChange={() => {
							onBookmark?.();
						}}
						checked={item?.isBookmark}
					/>
				</Box>
			</Box>
			<CardActionArea
				onClick={() => {
					onClick?.();
				}}
				sx={{
					// maxWidth: 335,
					zIndex: 1,
					height: '100%',
					// maxHeight: convertToRem(370),
					// minHeight: convertToRem(370),
					width: '100%',
					backgroundColor: theme.palette.main.gray80,
					padding: convertToRem(16),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					position: 'absolute',
				}}></CardActionArea>
		</Card>
	);
}
