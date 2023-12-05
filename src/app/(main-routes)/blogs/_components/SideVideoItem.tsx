import HeartSmIcon from '@/assets/icons/heart-sm';
import ProgressiveImage from '@/elements/ProgressiveImage';
import Typography from '@/elements/Typography';
import { IBlog } from '@/types/blog.type';
import { convertToRem } from '@/utils/convert-to-rem';
import { displayTimeDiff } from '@/utils/display-time-diff';
import { formatCurrency } from '@/utils/format-currency';
import {
	Box,
	Chip as MChip,
	ChipProps as MChipProps,
	styled,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
export type ChipProps = MChipProps & {
	type?: string;
};

type SideVideoProps = {
	item: IBlog;
	onBookmark: any;
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
const SideVideoItem = ({ item, onBookmark }: SideVideoProps) => {
	const theme = useTheme();
	const xlUp = useMediaQuery('(min-width: 1200px)');
	const xxlUp = useMediaQuery('(min-width: 1600px)');
	const smDown = useMediaQuery('(max-width: 576px)');
	const isNew = moment().diff(moment(item.createdAt), 'days') < 10;
	const router = useRouter();
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: xlUp ? 'row' : 'column',
				[theme.breakpoints.down('md')]: {
					width: '100%',
				},
				cursor: 'pointer',
			}}
			onClick={() => {
				router.push('/blogs/' + item.id);
			}}>
			<Box
				sx={{
					width: xlUp ? '10.5rem' : '100%',
					paddingTop: xlUp ? 0 : 'calc((6 / 10.5) * 100%)',
					height: xlUp ? '6rem' : 'auto',
					flexShrink: xxlUp ? '0' : 1,
					position: 'relative',
				}}>
				<ProgressiveImage
					src={!!item?.thumbnail?.url ? item?.thumbnail?.url : '/images/test-img.png'}
					placeholderSrc={
						!!item?.thumbnail?.url ? item?.thumbnail?.url : '/images/test-img.png'
					}
					alt={item.thumbnail.name}
					style={{
						cursor: 'pointer',
						objectFit: 'cover',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
					}}
				/>
				<Box position={'absolute'} zIndex={3} bottom={8} right={8}>
					<MChip
						size='small'
						label={!!item.duration ? item.duration : '10:20'}
						sx={{ backgroundColor: theme.palette.main.gray80 }}
					/>
				</Box>
			</Box>
			<Box
				display={'flex'}
				width='100%'
				alignItems={'flex-start'}
				justifyContent={'space-between'}
				ml={xlUp ? 1 : 0}
				mt={xlUp ? 0 : 1}>
				<Box
					display={'flex'}
					width='100%'
					alignItems={'flex-start'}
					flexDirection={'column'}
					mr={xlUp ? 1 : 0}>
					<Typography
						cate={xlUp || smDown ? 'caption_2' : 'body_3'}
						color={theme.palette.main.point}
						mb={0.5}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '1',
							WebkitBoxOrient: 'vertical',
						}}>
						{item.category.name}
					</Typography>
					<Typography
						cate={xlUp || smDown ? 'caption_2' : 'body_3'}
						color={theme.palette.main.gray20}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '1',
							WebkitBoxOrient: 'vertical',
						}}>
						{item.instructorName}
					</Typography>
					<Typography
						cate={xlUp || smDown ? 'caption_1' : 'body_2'}
						color={theme.palette.main.gray10}
						my={0.5}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '2',
							WebkitBoxOrient: 'vertical',
						}}>
						{item.title}
					</Typography>
					<Box display={'flex'} alignItems={'center'}>
						<Box display={'flex'} flexShrink={0}>
							<HeartSmIcon stroke={theme.palette.main.white} />
						</Box>
						<Typography
							cate={xlUp || smDown ? 'caption_2' : 'body_3'}
							color={theme.palette.main.white}
							ml={1}
							mr={3}
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '1',
								WebkitBoxOrient: 'vertical',
							}}>
							{formatCurrency(item.totalView)} ·{' '}
							{/* {moment().diff(moment(item.createdAt), 'hours') < 48
                ? moment(item.createdAt).fromNow()
                : moment(item.createdAt).format('YYYY.MM.DD')} */}
							{displayTimeDiff(item.createdAt)}
						</Typography>
					</Box>
				</Box>
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
		</Box>
	);
};

export default SideVideoItem;
