'use client';

import EditIcon from '@/assets/icons/edit';
import { userAtom } from '@/atoms/user';
import { userPoolAtom } from '@/atoms/user-pool';
import Button from '@/elements/Button';
import Typography from '@/elements/Typography';
import { getUserPool } from '@/services/pool.service';
import { IEducation, IExperience, IProject } from '@/types/pool.type';
import { convertToRem } from '@/utils/convert-to-rem';
import {
	Avatar,
	Box,
	ChipProps,
	Grid,
	IconButton,
	Chip as MChip,
	styled,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ProjectItem from '../_components/ProjectItem';
import { Section as CustomSection } from '../_components/Section';
import CareerItemProfile from './_components/CareerItemProfile';
import EducationItemProfile from './_components/EducationItemProfile';
import FileTag from './_components/FileTag';
import Section from './_components/Section';

const Tag = styled(MChip)<ChipProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray60,
	padding: '0.62rem 1rem',
	color: theme.palette.main.white,
	borderRadius: convertToRem(250),
	fontSize: convertToRem(12),
	'.MuiChip-label': {
		padding: 0,
	},
	fieldset: {
		border: 0,
		backgroundColor: theme.palette.main.gray70,
	},
}));

const Pool = () => {
	const mdDown = useMediaQuery('(max-width: 768px)');
	const theme = useTheme();
	const user = useRecoilValue(userAtom);
	const router = useRouter();
	const [userPool, setUserPool] = useRecoilState(userPoolAtom);
	useEffect(() => {
		async function getUserPoolData() {
			const userPoolRes = await getUserPool();
			if (!!userPoolRes) {
				setUserPool(userPoolRes);
			} else {
				setUserPool(null);
			}
		}
		getUserPoolData();
	}, []);

	return (
		<Box>
			<Box
				display='flex'
				alignItems={mdDown ? 'flex-start' : 'center'}
				justifyContent={mdDown ? 'flex-start' : 'space-between'}
				flexDirection={mdDown ? 'column' : 'row'}
				pb={2}
				borderBottom={'1px solid ' + theme.palette.main.gray70}>
				<Typography cate={mdDown ? 'body_2_semibold' : 'title_2_bold'}>
					인재풀 기본정보
				</Typography>
				{!mdDown && (
					<Button
						cate='outline'
						customType='active'
						customSize={'md'}
						sx={{ padding: '1.12rem 2.5rem', marginTop: mdDown ? '1rem' : 0 }}
						onClick={() => {
							router.push('/me');
						}}
						customTitle={
							<Box display='flex' alignItems='center'>
								<Typography cate='body_3' color={theme.palette.main.gray10} mr={1.5}>
									기본 정보 수정하기
								</Typography>
								<EditIcon />
							</Box>
						}
					/>
				)}
			</Box>
			<Box
				display='flex'
				py={6}
				alignItems={'center'}
				justifyContent={'flex-start'}
				flexDirection={mdDown ? 'column' : 'row'}>
				<Avatar
					sx={{ width: '12.5rem', height: '12.5rem' }}
					src={user?.avatar?.url ? user?.avatar?.url : '/images/blank-user.png'}
				/>
				<Box
					alignItems={mdDown ? 'center' : 'flex-start'}
					display='flex'
					flexDirection='column'
					ml={mdDown ? 0 : 4}>
					<Typography
						cate={mdDown ? 'subtitle_1_semibold' : 'title_2_bold'}
						color={theme.palette.main.gray10}
						mb={2}>
						{user?.nickname}
					</Typography>
					<Box display={'flex'} alignItems={'center'} mb={1}>
						{!mdDown && (
							<Typography cate='body_3' color={theme.palette.main.gray30} mr={1}>
								이메일
							</Typography>
						)}
						<Typography cate='body_3' color={theme.palette.main.gray10}>
							{user?.email}
						</Typography>
					</Box>
					<Box display={'flex'} alignItems={'center'}>
						{!mdDown && (
							<Typography cate='body_3' color={theme.palette.main.gray30} mr={1}>
								연락처
							</Typography>
						)}
						<Typography cate='body_3' color={theme.palette.main.gray10}>
							{!!user?.phoneNumber ? user?.phoneNumber : '-'}
						</Typography>
					</Box>
					{mdDown && (
						<IconButton
							sx={{
								backgroundColor: theme.palette.main.gray60,
								width: convertToRem(50),
								height: convertToRem(50),
								marginTop: 1,
							}}
							onClick={() => {
								router.push('/me');
							}}>
							<EditIcon stroke={theme.palette.main.gray10} />
						</IconButton>
					)}
				</Box>
			</Box>
			<Box
				display='flex'
				alignItems={'center'}
				justifyContent={'space-between'}
				flexDirection={'row'}
				pb={2}
				borderBottom={'1px solid ' + theme.palette.main.gray70}>
				<Typography cate={mdDown ? 'body_2_semibold' : 'title_2_bold'}>
					프로필 정보
				</Typography>
				<Button
					cate='outline'
					customType='active'
					customSize={'md'}
					rounded={mdDown}
					sx={{
						padding: mdDown ? '0.8rem 1.5rem' : '1.12rem 2.5rem',
						marginTop: 0,
					}}
					onClick={() => {
						router.push('/community-management/edit-pool');
					}}
					customTitle={
						<Box display='flex' alignItems='center'>
							<Typography cate='body_3' color={theme.palette.main.gray10} mr={1.5}>
								{!!userPool ? '프로필 정보 수정하기' : '프로필 등록하기'}
							</Typography>
							<EditIcon />
						</Box>
					}
				/>
			</Box>
			{!!userPool ? (
				<Box display={'flex'} rowGap={mdDown ? 5 : 7} flexDirection={'column'} pt={6}>
					<Section title='직군'>
						<Grid container gap={2}>
							{userPool?.jobTitles?.map((i: string, index: number) => (
								<Tag label={i} key={index} />
							))}
						</Grid>
					</Section>
					<CustomSection item xs={12}>
						<Box display={'flex'} mb={1.5} alignItems={'center'}>
							<Typography cate='body_2_semibold'>학력 </Typography>
						</Box>
						<Grid container spacing={2}>
							{userPool?.schools?.map((i: IEducation, index: number) => (
								<>
									<Grid
										item
										xs={12}
										lg={6}
										key={i.id}
										sx={{
											borderBottom: `${mdDown ? 1 : 0}px solid ${
												index + 1 === userPool?.schools?.length
													? theme.palette.main.gray80
													: theme.palette.main.gray50
											}`,
											paddingBottom: mdDown ? 2 : 0,
											marginBottom: mdDown ? 2 : 0,
										}}>
										<EducationItemProfile item={i} />
									</Grid>
								</>
							))}
						</Grid>
					</CustomSection>
					<CustomSection item xs={12}>
						<Box display={'flex'} mb={1.5} alignItems={'center'}>
							<Typography cate='body_2_semibold'>
								경력 / 총 {userPool?.yearsOfExperience}년{' '}
							</Typography>
						</Box>
						<Grid container spacing={2}>
							{userPool?.experiences?.map((i: IExperience, index: number) => (
								<Grid
									item
									xs={12}
									lg={6}
									key={i.id}
									sx={{
										borderBottom: `${mdDown ? 1 : 0}px solid ${
											index + 1 === userPool?.schools?.length
												? theme.palette.main.gray80
												: theme.palette.main.gray50
										}`,
										paddingBottom: mdDown ? 2 : 0,
										marginBottom: mdDown ? 2 : 0,
									}}>
									<CareerItemProfile item={i} />
								</Grid>
							))}
						</Grid>
					</CustomSection>
					<Section title='보유기술 / 활동분야'>
						<Grid container gap={2}>
							{userPool?.skills?.map((i: string, index: number) => (
								<Tag label={i} key={index} />
							))}
						</Grid>
					</Section>
					<Section title='프로젝트'>
						<Grid container gap={2}>
							{userPool?.projects?.map((item: IProject) => (
								<Grid item xs={12} key={item.id}>
									<ProjectItem item={item} />
								</Grid>
							))}
						</Grid>
					</Section>
					<Section title='포트폴리오'>
						<Grid container gap={2}>
							{userPool?.files?.map((i: any) => (
								<FileTag
									title={i.name}
									key={i.id}
									onClick={() => {
										window.open(i.url);
									}}
								/>
							))}
						</Grid>
					</Section>
					<Section title=' 참고 URL'>
						<Grid container gap={1}>
							{userPool?.urls?.map((url: string, index: number) => (
								<Grid
									key={index}
									item
									py={2}
									xs={12}
									alignItems={'center'}
									direction={'row'}
									display={'flex'}>
									<Box component={'a'} href={'https://' + url} target='__blank'>
										<Typography
											cate='caption_2'
											color={theme.palette.main.primary_light}
											sx={{
												textDecoration: 'underline',
												wordBreak: 'break-all',
											}}>
											{url}
										</Typography>
									</Box>
								</Grid>
							))}
						</Grid>
					</Section>
					<Section title='활동지역'>
						<Grid container gap={2}>
							<Tag label={userPool?.location} />
						</Grid>
					</Section>
					<Section title='자기소개'>
						<Typography
							cate='body_3'
							sx={{
								whiteSpace: 'pre-line',
								padding: mdDown ? 2 : 0,
								backgroundColor: mdDown ? theme.palette.main.gray80 : 'transparent',
							}}
							color={mdDown ? theme.palette.main.gray10 : theme.palette.main.gray30}>
							{userPool?.introduction}
						</Typography>
					</Section>
				</Box>
			) : (
				<Typography
					cate='body_3'
					color={theme.palette.main.gray30}
					my={mdDown ? 10 : 20}
					sx={{ width: '100%' }}
					textAlign={'center'}>
					등록된 프로필 정보가 없습니다.
				</Typography>
			)}
		</Box>
	);
};

export default Pool;
