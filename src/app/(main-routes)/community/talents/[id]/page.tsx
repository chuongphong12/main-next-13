'use client';
import Bookmark from '@/assets/icons/bookmark';
import BookmarkFilled from '@/assets/icons/bookmark-filled';
import { loadingAtom } from '@/atoms/loading';
import { userAtom } from '@/atoms/user';
import AlertPopup from '@/elements/AlertPopup';
import Button from '@/elements/Button';
import Typography from '@/elements/Typography';
import { updateBookmark } from '@/services/bookmark.service';
import { getPoolById } from '@/services/pool.service';
import {} from '@/services/user.service';
import { IEducation, IExperience, IPool, IProject } from '@/types/pool.type';
import { convertToRem } from '@/utils/convert-to-rem';
import {
	Avatar,
	Box,
	Grid,
	GridProps,
	styled,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import CareerItem from '../components/CareerItem';
import ContactPopup from '../components/ContactPopup';
import EducationItem from '../components/EducationItem';
import FileCategory from '../components/FileCategory';
import ProjectItem from '../components/ProjectItem';
import Tag from '../components/Tag';
import UrlCategory from '../components/UrlCategory';

export const Section = styled(Grid)<GridProps>(({ theme }) => ({
	backgroundColor: theme.palette.main.gray80,
	padding: '1.5rem',
	borderRadius: '1rem',
	fieldset: {
		border: 0,
	},
}));

const TalentDetail = ({ id }: { id: string | number }) => {
	const theme = useTheme();
	const setLoading = useSetRecoilState(loadingAtom);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined);
	const [showError, setShowError] = useState<boolean>(false);
	const [openContact, setOpenContact] = useState<boolean>(false);
	const router = useRouter();
	const user = useRecoilValue(userAtom);
	const onToggleContact = (status: boolean) => {
		setOpenContact(status);
	};
	const handleContact = () => {
		setOpenContact(false);
	};
	const xlUp = useMediaQuery('(min-width: 1200px)');
	const xxlUp = useMediaQuery('(min-width: 1440px)');
	const {
		data: responseDetail,
		isLoading,
		refetch,
	} = useQuery<{ data: IPool }, Error>({
		queryKey: ['talent-detail', id as string],
		queryFn: () => getPoolById(id || ''),
		retry: false,
		enabled: true,
	});

	const handleBookmark = async (id: number | string) => {
		const { data, error } = await updateBookmark({
			id: Number(id),
			type: 'PORTFOLIO',
		});
		if (!error) {
			refetch();
		}
	};

	useEffect(() => {
		if ((!responseDetail || !responseDetail.data) && !isLoading) {
			router.push('/community/talents');
		}
	}, [responseDetail]);

	return (
		<>
			<Grid
				container
				columnGap={2}
				my={4}
				sx={{ flexWrap: xlUp ? 'nowrap' : 'wrap' }}
				direction={xlUp ? 'row' : 'column-reverse'}>
				<Grid item md={12} xl={9} width={'100%'}>
					<Grid container rowGap={2}>
						<Section item xs={12}>
							<Typography cate='title_3_semibold' mb={1.5}>
								소개
							</Typography>
							<Typography cate='body_3' sx={{ whiteSpace: 'pre-line' }}>
								{responseDetail?.data?.introduction ||
									'개인 프로필 자기 소개 내용입니다.\n개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다.\n개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다.\t개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. 개인 프로필 자기 소개 내용입니다. '}
							</Typography>
						</Section>
						<Section item xs={12}>
							<Box display={'flex'} mb={1.5} alignItems={'center'}>
								<Typography cate='title_3_semibold'>경력 / </Typography>
								<Typography
									cate='title_3_semibold'
									color={theme.palette.main.primary_light}
									ml={1}>
									총 {responseDetail?.data?.yearsOfExperience || 4}년
								</Typography>
							</Box>
							<Grid container spacing={2}>
								{responseDetail?.data?.experiences?.map((i: IExperience) => {
									return (
										<Grid item xs={12} md={6} key={i.id}>
											<CareerItem item={i} />
										</Grid>
									);
								})}
							</Grid>
						</Section>
						<Grid container xs={12} gap={2} sx={{ flexWrap: xlUp ? 'nowrap' : 'wrap' }}>
							<Section item xs={12} xl={6} gap={2}>
								<Typography cate='title_3_semibold' mb={1.5}>
									학력
								</Typography>
								<Grid container gap={2}>
									{responseDetail?.data?.schools?.map((i: IEducation) => {
										return (
											<Grid item xs={12} key={i.id}>
												<EducationItem item={i} />
											</Grid>
										);
									})}
								</Grid>
							</Section>
							<Section item xs={12} xl={6}>
								<Typography cate='title_3_semibold' mb={1.5}>
									보유기술
								</Typography>
								<Grid container columnGap={1} rowGap={1.5}>
									{responseDetail?.data?.skills?.map((i: string, index: number) => (
										<Tag label={i} key={index} />
									))}
								</Grid>
							</Section>
						</Grid>
						<Section item xs={12}>
							<Typography cate='title_3_semibold' mb={1.5}>
								프로젝트
							</Typography>
							<Grid container spacing={2}>
								{responseDetail?.data?.projects?.map((i: IProject) => {
									return (
										<Grid item xs={12} key={i.id}>
											<ProjectItem item={i} />
										</Grid>
									);
								})}
							</Grid>
						</Section>
						<Section item xs={12}>
							<Typography cate='title_3_semibold' mb={1.5}>
								관련기사/포트폴리오
							</Typography>
							<Box display={'flex'} flexDirection={'column'} rowGap={1}>
								{responseDetail?.data?.files?.map((i: any) => {
									return <FileCategory key={i.id} item={i} />;
								})}
								{responseDetail?.data?.urls?.map((i: any) => {
									return <UrlCategory key={i.id} item={i} />;
								})}
							</Box>
						</Section>
					</Grid>
				</Grid>
				<Grid item md={12} xl={3} mb={xlUp ? 0 : 2}>
					<Section
						sx={{
							width: xxlUp ? convertToRem(336) : '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Avatar
							sx={{ width: '10rem', height: '10rem' }}
							src={
								!!responseDetail?.data?.user?.avatar?.url
									? responseDetail?.data?.user?.avatar?.url
									: '/images/blank-user.png'
							}
						/>
						<Typography cate='title_3_semibold' mt={2.5} mb={0.5}>
							{responseDetail?.data?.user?.nickname}
						</Typography>

						<Grid container gap={0.5} direction={'column'} alignItems={'center'} py={2}>
							{!!responseDetail?.data?.experiences[0] && (
								<Typography cate='body_3_semibold'>
									{responseDetail?.data?.experiences[0]?.undertaking} /{' '}
									{responseDetail?.data?.experiences[0]?.yearsOfExperience}년차{' '}
								</Typography>
							)}
							<Typography cate='body_3'>{responseDetail?.data?.location} </Typography>
							{!!responseDetail?.data?.experiences[0] && (
								<Typography cate='body_3_semibold'>
									소속 / @{responseDetail?.data?.experiences[0]?.companyName}{' '}
								</Typography>
							)}
						</Grid>
						{user?.id !== responseDetail?.data?.user?.id ? (
							<Box display={'flex'} alignItems={'center'} width={'100%'}>
								<Button
									cate={'outline'}
									onClick={() => {
										handleBookmark(id);
									}}
									customTitle={
										responseDetail?.data?.isBookmark ? (
											<BookmarkFilled />
										) : (
											<Bookmark stroke={theme.palette.main.white} />
										)
									}
								/>
								<Button
									sx={{
										marginLeft: '0.5rem',
									}}
									customType={'active'}
									cate={'primary'}
									customTitle={'연락하기'}
									fullWidth
									onClick={() => {
										onToggleContact(true);
									}}
								/>
							</Box>
						) : (
							<></>
						)}
					</Section>
				</Grid>
			</Grid>
			<ContactPopup
				open={openContact}
				poolData={responseDetail?.data as IPool}
				onCancel={() => {
					onToggleContact(false);
				}}
				id={id as string}
			/>
			<AlertPopup
				onSubmit={async () => {
					setShowError(false);
					setErrorMessage('');
					setErrorTitle(undefined);
				}}
				submitTitle={errorTitle ? '모든기기 로그아웃' : '확인'}
				cancelTitle={errorTitle ? '취소' : undefined}
				onCancel={
					errorTitle
						? () => {
								setShowError(false);
								setErrorMessage('');
								setErrorTitle(undefined);
						  }
						: undefined
				}
				title={errorTitle}
				description={errorMessage}
				open={showError}
			/>
		</>
	);
};

export default TalentDetail;
