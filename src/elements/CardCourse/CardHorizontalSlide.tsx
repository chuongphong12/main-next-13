import BookmarkCheckbox from '@/elements/BookmarkCheckbox';
import Typography from '@/elements/Typography';
import { IBlog } from '@/types/blog.type';
import { convertToRem } from '@/utils/convert-to-rem';
import { displayTimeDiff } from '@/utils/display-time-diff';
import { formatCurrency } from '@/utils/format-currency';
import {
	Box,
	CardActionArea,
	Chip as MChip,
	ChipProps as MChipProps,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import HeartSmIcon from '../../assets/icons/heart-sm';
export type ChipProps = MChipProps & {
	type?: string;
};

export default function CardHorizontalSlide({
	item,
	onBookmark,
}: {
	item: IBlog;
	onBookmark: Function;
}) {
	const theme = useTheme();
	const md = useMediaQuery('(max-width: 768px)');
	const xs = useMediaQuery('(max-width: 375px)');
	const router = useRouter();

	return (
		<Card
			sx={{
				height: convertToRem(264),
				width: convertToRem(232),
				backgroundColor: 'transparent',
				boxShadow: 'none',
				backgroundImage: 'none',
				position: 'relative',
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				flexDirection: 'column',
			}}>
			<CardActionArea
				onClick={() => {
					router.push('/blogs/' + item.id);
				}}
				sx={{
					maxWidth: convertToRem(232),
					zIndex: 1,
					height: convertToRem(264),
					width: convertToRem(232),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}>
				<Box position={'absolute'} zIndex={1} bottom={44} right={8}>
					<MChip
						size='small'
						label={item.images?.length + ' slides'}
						sx={{
							backgroundColor: theme.palette.main.gray80,
						}}
					/>
				</Box>
				<Box
					display={'flex'}
					alignItems='center'
					justifyContent={'space-between'}
					component='div'
					sx={{
						width: convertToRem(232),
						height: convertToRem(232),
						position: 'relative',
						borderRadius: convertToRem(16),
					}}>
					<Image
						src={item.thumbnail.url}
						layout='fill'
						objectFit='cover'
						style={{
							maxHeight: convertToRem(232) + ' !important',
							objectFit: 'cover',
							width: '100%',
							position: 'relative',
							height: 'unset !important',
						}}
						alt={''}
					/>
				</Box>
				<Box
					display={'flex'}
					alignItems='center'
					justifyContent={'space-between'}
					width={'100%'}
					zIndex={2}
					mt={2}>
					<Box display={'flex'} alignItems={'center'}>
						<HeartSmIcon stroke={theme.palette.main.white} />
						<Typography cate='caption_2' color={theme.palette.main.white} ml={1} mr={3}>
							{formatCurrency(item.totalView)} ·{' '}
							{/* {moment().diff(moment(item.createdAt), 'hours') < 48
                ? moment(item.createdAt).fromNow()
                : moment(item.createdAt).format('YYYY.MM.DD')} */}
							{displayTimeDiff(item.createdAt)}
						</Typography>
					</Box>
				</Box>
			</CardActionArea>
			<BookmarkCheckbox
				onChange={() => {
					onBookmark?.();
				}}
				checked={item?.isBookmark}
				sx={{ zIndex: 3, position: 'absolute', bottom: 0, right: 0 }}
			/>
		</Card>
	);
}
