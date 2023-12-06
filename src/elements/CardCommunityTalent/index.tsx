import Typography from '@/elements/Typography';
import { IPool } from '@/types/pool.type';
import { convertToRem } from '@/utils/convert-to-rem';
import {
	Avatar,
	Box,
	CardActionArea,
	ChipProps as MChipProps,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import { useState } from 'react';
export type ChipProps = MChipProps & {
	type?: string;
};

export default function CardCommunityTalent({
	item,
	onClick,
}: {
	item: IPool;
	onClick: any;
}) {
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
				width: '100%',
				height: '100%',
				maxHeight: convertToRem(204),
				minHeight: convertToRem(204),
				backgroundColor: theme.palette.main.gray80,
				borderRadius: convertToRem(16),
			}}>
			<CardActionArea
				onClick={onClick}
				sx={{
					zIndex: 1,
					height: '100%',
					maxHeight: convertToRem(204),
					minHeight: convertToRem(204),
					width: '100%',
					backgroundColor: theme.palette.main.gray80,
					padding: convertToRem(16),
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					flexDirection: 'row',
				}}>
				<Avatar
					sx={{
						width: convertToRem(40),
						height: convertToRem(40),
					}}
					alt='Remy Sharp'
					src={
						!!item.user?.avatar?.url ? item.user?.avatar?.url : '/images/blank-user.png'
					}
				/>
				<Box display={'flex'} flexDirection={'column'} width={'100%'} ml={2}>
					<Typography
						cate='body_3_semibold'
						color={theme.palette.main.gray10}
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							WebkitLineClamp: '1',
							WebkitBoxOrient: 'vertical',
						}}>
						{item.user?.username} / {item.yearsOfExperience}년차
					</Typography>
					{!!item?.experiences[0] && (
						<Typography
							cate='caption_1'
							color={theme.palette.main.gray30}
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '1',
								WebkitBoxOrient: 'vertical',
							}}
							my={2}>
							{`${item?.experiences[0]?.undertaking || ''} | @${
								item?.experiences[0]?.companyName || ''
							}  `}
						</Typography>
					)}

					<Box
						display={'flex'}
						alignItems={'flex-start'}
						justifyContent={'flex-start'}
						flexDirection={'column'}
						p={2}
						borderRadius={1}
						sx={{ backgroundColor: theme.palette.main.gray70 }}>
						<Typography
							cate='caption_1_semibold'
							color={theme.palette.main.gray10}
							mb={1}>
							주요 경력 정보
						</Typography>

						{!!item?.schools[0] && (
							<Typography
								cate='caption_1'
								color={theme.palette.main.gray30}
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									display: '-webkit-box',
									WebkitLineClamp: '1',
									WebkitBoxOrient: 'vertical',
								}}>
								· {item?.schools[0]?.schoolName || ''} {item?.schools[0]?.majors || ''}
							</Typography>
						)}

						{!!item?.experiences[0] && (
							<Typography
								cate='caption_1'
								color={theme.palette.main.gray30}
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									display: '-webkit-box',
									WebkitLineClamp: '1',
									WebkitBoxOrient: 'vertical',
								}}>
								· {item?.experiences[0]?.companyName || ''}{' '}
								{item?.experiences[0]?.undertaking || ''}
							</Typography>
						)}
					</Box>
				</Box>
			</CardActionArea>
		</Card>
	);
}
