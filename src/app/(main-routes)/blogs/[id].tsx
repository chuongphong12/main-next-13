import BookmarkCheckIcon from '@/assets/icons/bookmark-check';
import BookmarkUncheckIcon from '@/assets/icons/bookmark-uncheck';
import DownloadCircleIcon from '@/assets/icons/download-circle';
import HeartSmIcon from '@/assets/icons/heart-sm';
import { loadingAtom } from '@/atoms/loading';
import { sidebarOpenAtom } from '@/atoms/sidebar-open';
import AlertPopup from '@/elements/AlertPopup';
import Typography from '@/elements/Typography';
import { downloadCardNews, getBlogDetail } from '@/services/blogs.service';
import { updateBookmark } from '@/services/bookmark.service';
import {} from '@/services/user.service';
import { IBlog } from '@/types/blog.type';
import { BLOG_TYPE } from '@/utils/constants';
import { convertToRem } from '@/utils/convert-to-rem';
import { displayTimeDiff } from '@/utils/display-time-diff';
import { formatCurrency } from '@/utils/format-currency';
import { getYoutubeId } from '@/utils/get-youtube-id';
import {
	Avatar,
	Box,
	Grid,
	Button as MButton,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BlogInfo } from './_components/BlogInfo';
import CommentSection from './_components/CommentSection';
import CourseCarousel from './_components/CourseCarousel';
import SideList from './_components/SideList';

interface NotificationType {
	email: boolean;
	sms: boolean;
}

const ASPECT_RATIO = 75 / 121;

const BlogDetail = ({ id }: { id: string | number }) => {
	const theme = useTheme();
	const [pageKey, setPageKey] = useState<number>(0);
	const breadcrumbData = [{ name: '콘텐츠 블로그' }];
	const setLoading = useSetRecoilState(loadingAtom);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined);
	const [showError, setShowError] = useState<boolean>(false);
	const contentWrapperRef = useRef<any>();

	const xxxlUp = useMediaQuery('(min-width: 1920px)');
	const xxlUp = useMediaQuery('(min-width: 1440px)');
	const xlUp = useMediaQuery('(min-width: 1200px)');
	const lgUp = useMediaQuery('(min-width: 992px)');
	const mdDown = useMediaQuery('(max-width: 768px)');

	const sidebarOpen = useRecoilValue(sidebarOpenAtom);

	const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark');
	const [contentHeight, setContentHeight] = useState(0);
	const [contentWidth, setContentWidth] = useState(
		xxxlUp ? 968 : xxlUp ? 768 : xlUp ? 576 : 448
	);
	const router = useRouter();
	const query = useSearchParams();
	const [value, setValue] = useState(0);
	const [isDescriptionMode, setIsDescriptionMode] = useState<boolean>(true);
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	useEffect(() => {
		if (sidebarOpen) {
			setContentWidth(xxxlUp ? 968 : xxlUp ? 768 : xlUp ? 576 : 448);
		} else {
			setContentWidth(contentWidth + 120);
		}
	}, [sidebarOpen]);

	useEffect(() => {
		setContentHeight(contentWidth * ASPECT_RATIO);
	}, [contentWidth]);

	const {
		data: responseDetail,
		isLoading,
		refetch,
	} = useQuery<{ data: IBlog }, Error>({
		queryKey: ['blog-detail', id as string],
		queryFn: () => getBlogDetail(id || ''),
		retry: false,
		enabled: true,
	});

	useEffect(() => {
		const id = query.get('id');
		if (id) {
			setIsDescriptionMode(true);
		}
	}, [query]);

	const handleBookmark = async () => {
		const { data, error } = await updateBookmark({
			id: responseDetail?.data?.id || 0,
			type: 'CONTENT',
		});
		if (!error) {
			refetch();
		}
	};

	const handleDownload = async () => {
		await downloadCardNews(responseDetail?.data?.id || 0);
	};

	useEffect(() => {
		if ((!responseDetail || !responseDetail.data) && !isLoading) {
			router.push('/blogs');
		}
	}, [responseDetail]);

	return (
		<>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate='large_title' mt={4.5} mb={1.5}>
				콘텐츠 블로그
			</Typography>
			<Typography cate='body_2' mb={6}>
				커뮤니케이션과 프로젝트 진행을 통해 다양한 아이디어와 사업화를 진행해보세요!
			</Typography>

			<Grid
				container
				width={'100%'}
				display={'flex'}
				columnSpacing={xlUp ? 6 : 0}
				rowSpacing={xlUp ? 0 : 6}
				marginX={0}>
				<Grid item xs={12} xl={xxlUp ? 8.2 : 7.8} padding={'0 !important'}>
					<Box
						sx={{
							width: '100%',
							height:
								responseDetail?.data?.type === BLOG_TYPE.CARD_NEWS
									? 'auto'
									: contentHeight,
						}}
						ref={contentWrapperRef}>
						{responseDetail?.data?.type === BLOG_TYPE.VIDEO ? (
							<YouTube
								videoId={getYoutubeId(responseDetail?.data?.url || '') as string}
								style={{
									width: '100%',
									height: contentHeight,
								}}
								opts={{
									width: '100%',
									height: '100%',
									playerVars: {
										autoplay: 1,
									},
								}}
							/>
						) : (
							<CourseCarousel item={responseDetail?.data} />
						)}
					</Box>
					<Box display={'flex'} flexDirection={'column'} mt={6}>
						<Typography cate='body_3' color={theme.palette.main.point}>
							{responseDetail?.data?.category?.name}
						</Typography>
						<Box display={'flex'} alignItems={'center'}>
							{!!responseDetail?.data?.instructorThumbnail?.url ? (
								<Avatar
									sx={{
										width: '2rem',
										height: '2rem',
									}}
									src={
										!!responseDetail?.data?.instructorThumbnail?.url
											? responseDetail?.data?.instructorThumbnail?.url
											: '/images/blank-user.png'
									}
								/>
							) : (
								<></>
							)}
							{!!responseDetail?.data?.instructorName ? (
								<Typography
									cate='caption_1'
									ml={!!responseDetail?.data?.instructorThumbnail?.url ? 1 : 0}>
									{responseDetail?.data?.instructorName}
								</Typography>
							) : (
								<></>
							)}
						</Box>
						<Typography cate='title_3_semibold' mt={1}>
							{responseDetail?.data?.title}
						</Typography>
						<Box
							display={'flex'}
							alignItems={mdDown ? 'flex-start' : 'center'}
							justifyContent={mdDown ? 'flex-start' : 'space-between'}
							pb={3}
							flexDirection={mdDown ? 'column' : 'row'}
							borderBottom={'1px solid ' + theme.palette.main.gray60}>
							<Box
								display={'flex'}
								alignItems={'center'}
								mt={mdDown ? 3 : 0}
								mb={mdDown ? 2 : 0}>
								<HeartSmIcon stroke={theme.palette.main.white} />
								<Typography
									cate='caption_2'
									color={theme.palette.main.white}
									ml={1}
									mr={3}>
									{formatCurrency(responseDetail?.data?.totalView)} ·{' '}
									{/* {moment().diff(
                    moment(responseDetail?.data?.createdAt),
                    'hours'
                  ) < 48
                    ? moment(responseDetail?.data?.createdAt).fromNow()
                    : moment(responseDetail?.data?.createdAt).format(
                        'YYYY.MM.DD'
                      )} */}
									{displayTimeDiff(responseDetail?.data?.createdAt || '')}
								</Typography>
							</Box>
							<Box display={'flex'} alignItems={'center'} mt={mdDown ? 1 : 0}>
								{responseDetail?.data?.type === BLOG_TYPE.CARD_NEWS && (
									<MButton
										sx={{
											backgroundColor: theme.palette.main.gray70,
											borderRadius: convertToRem(250),
											padding: '0.8rem 1rem',
										}}
										onClick={handleDownload}>
										<DownloadCircleIcon />

										<Typography cate='caption_1' ml={1} color={theme.palette.main.white}>
											다운로드
										</Typography>
									</MButton>
								)}
								<MButton
									sx={{
										marginLeft:
											mdDown && responseDetail?.data?.type !== BLOG_TYPE.CARD_NEWS
												? 0
												: '1rem',
										backgroundColor: theme.palette.main.gray70,
										borderRadius: convertToRem(250),
										padding: '0.8rem 1rem',
									}}
									onClick={handleBookmark}>
									{!responseDetail?.data?.isBookmark ? (
										<BookmarkUncheckIcon />
									) : (
										<BookmarkCheckIcon />
									)}

									<Typography cate='caption_1' ml={1} color={theme.palette.main.white}>
										북마크
									</Typography>
								</MButton>
							</Box>
						</Box>
						<Box pt={5}>
							<Box display={'flex'} alignItems={'center'} mb={5}>
								<MButton
									onClick={() => {
										setIsDescriptionMode(true);
									}}
									sx={{
										padding: '0.75rem 0',
										borderRadius: 0,
										borderBottom:
											'2px solid ' +
											(isDescriptionMode ? theme.palette.main.primary : 'transparent'),
									}}>
									<Typography
										cate={`subtitle_1${isDescriptionMode ? '_semibold' : ''}`}
										color={
											!isDescriptionMode
												? theme.palette.main.gray50
												: theme.palette.main.gray10
										}>
										콘텐츠 소개
									</Typography>
								</MButton>
								<MButton
									onClick={() => {
										setIsDescriptionMode(false);
									}}
									sx={{
										marginLeft: '2rem',
										borderRadius: 0,
										padding: '0.75rem 0',
										borderBottom:
											'2px solid ' +
											(!isDescriptionMode ? theme.palette.main.primary : 'transparent'),
									}}>
									<Typography
										cate={`subtitle_1${!isDescriptionMode ? '_semibold' : ''}`}
										color={
											isDescriptionMode
												? theme.palette.main.gray50
												: theme.palette.main.gray10
										}>
										댓글 {responseDetail?.data?.totalComment}
									</Typography>
								</MButton>
							</Box>
							<Box width='100%'>
								{isDescriptionMode ? (
									<BlogInfo
										content={responseDetail?.data?.content || ''}
										tags={responseDetail?.data?.hashtags || []}
									/>
								) : (
									<CommentSection
										id={id}
										refetchParent={() => {
											refetch();
										}}
									/>
								)}
							</Box>
						</Box>
					</Box>
				</Grid>
				<Grid item xl={xxlUp ? 3.8 : 4.2} xs={12}>
					<SideList
						blogType={responseDetail?.data?.type || BLOG_TYPE.CARD_NEWS}
						id={responseDetail?.data?.id || 0}
					/>
				</Grid>
			</Grid>
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

export default BlogDetail;
