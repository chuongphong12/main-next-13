'use client';

import { loadingAtom } from '@/atoms/loading';
import AlertPopup from '@/elements/AlertPopup';
import { CardSlide } from '@/elements/CardCourse';
import SearchInput from '@/elements/SearchInput';
import Tab from '@/elements/Tab';
import Tabs from '@/elements/Tabs';
import Typography from '@/elements/Typography';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import { getBlogList } from '@/services/blogs.service';
import { updateBookmark } from '@/services/bookmark.service';
import { getBlogCategories } from '@/services/categories.service';
import {} from '@/services/user.service';
import { IBlog } from '@/types/blog.type';
import { ICategory } from '@/types/category.type';
import { BLOG_LIST_TYPE, BLOG_TYPE } from '@/utils/constants';
import { convertToRem } from '@/utils/convert-to-rem';
import {
	Box,
	CircularProgress,
	Divider,
	Grid,
	Button as MButton,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import CourseSlide from './_components/CourseDropdown';

interface NotificationType {
	email: boolean;
	sms: boolean;
}

const Blogs = () => {
	const theme = useTheme();
	const breadcrumbData = [{ name: '콘텐츠 블로그' }];
	const [categories, setCategories] = useState<ICategory[]>([]);
	const router = useRouter();
	const queryData = useSearchParams();
	const path = usePathname();
	const setLoading = useSetRecoilState(loadingAtom);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined);
	const [showError, setShowError] = useState<boolean>(false);

	const mdUp = useMediaQuery('(min-width: 768px)');
	const smDown = useMediaQuery('(max-width: 576px)');

	const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark');
	const [keyword, setKeyword] = useState<string>(
		(queryData.get('searchKeyword') as string) || ''
	);
	const [searchKeyword, setSearchKeyword] = useState<string>(
		(queryData.get('searchKeyword') as string) || ''
	);
	const [categoryValue, setCategoryValue] = useState(
		(Number(queryData.get('categoryValue')) as number) || 0
	);
	const [listTypeValue, setListType] = useState(
		(queryData.get('listTypeValue') as string) || BLOG_LIST_TYPE[0].value
	);
	const [videoDataFirst, setVideoDataFirst] = useState<IBlog[]>([]);
	const [videoDataSecond, setVideoDataSecond] = useState<IBlog[]>([]);
	const [newsData, setNewsData] = useState<IBlog[]>([]);
	const handleCategoryChange = (event: SyntheticEvent, newValue: number) => {
		let newQuery = new URLSearchParams(Array.from(queryData.entries()));
		if (newValue !== 0) {
			newQuery.set('categoryValue', newValue.toString());
		} else {
			if (!!newQuery.get('categoryValue')) {
				newQuery.delete('categoryValue');
			}
		}
		// router.query = newQuery;
		const search = newQuery.toString();
		const query = search ? `?${search}` : '';

		router.push(`${path}${query}`);
		// setCategoryValue(newValue);
	};

	const handleUpdateListType = (type: string) => {
		let newQuery = new URLSearchParams(Array.from(queryData.entries()));
		if (type !== BLOG_LIST_TYPE[0].value) {
			newQuery.set('listTypeValue', type);
		} else {
			newQuery.delete('listTypeValue');
		}
		const search = newQuery.toString();
		const query = search ? `?${search}` : '';

		router.push(`${path}${query}`);

		// setListType(type);
		// setSearchKeyword('');
		// setKeyword('');
		// setCategoryValue(0);
	};

	const {
		data: blogsList,
		refetch: refetchBlog,
		isFetchingNextPage,
		isLoading: isLoadingBlogs,
	} = useInfiniteScroll({
		api: ({
			pageParam = 1,
			categoryId = categoryValue !== 0 ? categoryValue : undefined,
			listType = listTypeValue,
			keyword = !!searchKeyword ? searchKeyword : undefined,
			type = BLOG_TYPE.VIDEO,
		}: any) =>
			getBlogList({
				page: pageParam,
				limit: 16,
				categoryId: categoryId,
				listType: listType,
				keyword: keyword,
				type: type,
			}),

		key: 'blogs-list',
		depend: [searchKeyword, categoryValue, listTypeValue],
	});

	// const {
	// 	data: newsList,
	// 	hasNextPage: hasNewsNextPage,
	// 	fetchNextPage: fetchNewsNextPage,
	// 	isLoading,
	// 	refetch,
	// 	isFetchingNextPage: isNewsFetchingNextPage,
	// 	isFetching,
	// } = useInfiniteQuery(
	// 	['news-list', searchKeyword, categoryValue, listTypeValue],
	// 	({
	// 		pageParam = 1,
	// 		categoryId = categoryValue !== 0 ? categoryValue : undefined,
	// 		listType = listTypeValue,
	// 		keyword = !!searchKeyword ? searchKeyword : undefined,
	// 		type = BLOG_TYPE.CARD_NEWS,
	// 	}: any) =>
	// 		getBlogList({
	// 			page: pageParam,
	// 			limit: 16,
	// 			categoryId: categoryId,
	// 			listType: listType,
	// 			keyword: keyword,
	// 			type: type,
	// 		}),
	// 	{
	// 		getNextPageParam: (lastPage: any) => {
	// 			const maxPages = lastPage?.data?.data?.metaData?.lastPage;
	// 			const nextPage = lastPage?.data?.data?.metaData?.nextPage;
	// 			const currentPage = lastPage?.data?.data?.metaData?.currentPage;
	// 			return nextPage <= maxPages && currentPage < nextPage ? nextPage : undefined;
	// 		},
	// 		enabled: true,
	// 		// onSuccess: body.onSuccess
	// 	}
	// );

	const {
		data: newsList,
		hasNextPage: hasNewsNextPage,
		fetchNextPage: fetchNewsNextPage,
		isLoading,
		refetch,
		isFetchingNextPage: isNewsFetchingNextPage,
		isFetching,
	} = useInfiniteQuery({
		queryKey: ['news-list', searchKeyword, categoryValue, listTypeValue],
		queryFn: ({
			pageParam = 1,
			categoryId = categoryValue !== 0 ? categoryValue : undefined,
			listType = listTypeValue,
			keyword = !!searchKeyword ? searchKeyword : undefined,
			type = BLOG_TYPE.CARD_NEWS,
		}: any) => {
			getBlogList({
				page: pageParam,
				limit: 16,
				categoryId: categoryId,
				listType: listType,
				keyword: keyword,
				type: type,
			});
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage: any) => {
			const maxPages = lastPage?.data?.data?.metaData?.lastPage;
			const nextPage = lastPage?.data?.data?.metaData?.nextPage;
			const currentPage = lastPage?.data?.data?.metaData?.currentPage;
			return nextPage <= maxPages && currentPage < nextPage ? nextPage : undefined;
		},
	});

	const searchBlogs = () => {
		let newQuery = new URLSearchParams(Array.from(queryData.entries()));
		if (!!keyword) {
			newQuery.set('searchKeyword', keyword.trim());
			setKeyword(keyword.trim());
		} else {
			if (!!newQuery.get('searchKeyword')) {
				newQuery.delete('searchKeyword');
			}
			setKeyword(keyword.trim());
		}
		const search = newQuery.toString();
		const query = search ? `?${search}` : '';

		router.push(`${path}${query}`);
		// setSearchKeyword(keyword);
	};

	const handleBookmark = async (id: number, contentType: string) => {
		const { data, error } = await updateBookmark({ id, type: 'CONTENT' });
		if (!error) {
			if (contentType === BLOG_TYPE.VIDEO) {
				refetchBlog();
			} else {
				refetch();
			}
		}
	};

	useEffect(() => {
		const getCategories = async () => {
			const data = await getBlogCategories();
			if (!!data) {
				setCategories([{ id: 0, name: '전체' }, ...data?.data]);
			}
		};
		getCategories();
	}, []);

	useEffect(() => {
		let videoData: IBlog[] = [];

		blogsList?.pages?.forEach((page) =>
			(page as any)?.data?.data?.result?.forEach((x: IBlog) => {
				videoData.push(x);
			})
		);
		const videoFirstData = videoData.length > 8 ? videoData.slice(0, 8) : videoData;
		const videoSecondData = videoData.length > 8 ? videoData.slice(8) : [];

		setVideoDataFirst(videoFirstData as IBlog[]);
		setVideoDataSecond(videoSecondData as IBlog[]);
	}, [blogsList]);

	useEffect(() => {
		let newsData: IBlog[] = [];

		newsList?.pages?.forEach((page) =>
			page?.data?.data?.result?.forEach((x: IBlog) => {
				newsData.push(x);
			})
		);

		setNewsData(newsData as IBlog[]);
	}, [newsList]);

	// useEffect(() => {
	//   handlePageFilter({
	//     router,
	//     query: {
	//       categoryValue,
	//       searchKeyword,
	//       listTypeValue,
	//     },
	//   });
	// }, [categoryValue, searchKeyword, listTypeValue]);

	useEffect(() => {
		const categoryValue = queryData.get('categoryValue');
		const searchKeyword = queryData.get('searchKeyword');
		const listTypeValue = queryData.get('listTypeValue');

		setCategoryValue(!!categoryValue ? Number(categoryValue) : 0);
		setSearchKeyword(!!searchKeyword ? (searchKeyword as string) : '');
		setKeyword(!!searchKeyword ? (searchKeyword as string) : '');
		setListType(!!listTypeValue ? (listTypeValue as string) : BLOG_LIST_TYPE[0].value);
	}, [queryData]);

	return (
		<>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate='large_title' mt={4.5} mb={1.5}>
				콘텐츠 블로그
			</Typography>
			<Typography cate='body_2' mb={5}>
				커뮤니케이션과 프로젝트 진행을 통해 다양한 아이디어와 사업화를 진행해보세요!
			</Typography>

			<Box
				component='div'
				display={'flex'}
				justifyContent='space-between'
				alignItems={mdUp ? 'center' : 'flex-start'}
				flexDirection={mdUp ? 'row' : 'column'}
				mb={4}>
				<Box
					display={'flex'}
					gap={1}
					alignItems={'center'}
					mb={mdUp ? 0 : 3}
					mt={mdUp ? 0 : 6}
					width={mdUp ? 'auto' : '100%'}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}>
						<MButton
							sx={{ paddingRight: '1.5rem', paddingLeft: 0 }}
							onClick={() => {
								handleUpdateListType(BLOG_LIST_TYPE[0].value);
							}}>
							<Typography
								cate='body_2'
								color={
									BLOG_LIST_TYPE[0].value === listTypeValue
										? theme.palette.main.point
										: theme.palette.main.white
								}>
								{BLOG_LIST_TYPE[0].title}
							</Typography>
						</MButton>
						<Divider
							orientation='vertical'
							sx={{
								height: convertToRem(14),
								borderColor: theme.palette.main.gray70,
							}}
						/>
						<MButton
							sx={{ paddingX: '1.5rem' }}
							onClick={() => {
								handleUpdateListType(BLOG_LIST_TYPE[1].value);
							}}>
							<Typography
								cate='body_2'
								color={
									BLOG_LIST_TYPE[1].value === listTypeValue
										? theme.palette.main.point
										: theme.palette.main.white
								}>
								{BLOG_LIST_TYPE[1].title}
							</Typography>
						</MButton>
						<Divider
							orientation='vertical'
							sx={{
								height: convertToRem(14),
								borderColor: theme.palette.main.gray70,
							}}
						/>

						<MButton
							sx={{ paddingX: '1.5rem' }}
							onClick={() => {
								handleUpdateListType(BLOG_LIST_TYPE[2].value);
							}}>
							<Typography
								cate='body_2'
								color={
									BLOG_LIST_TYPE[2].value === listTypeValue
										? theme.palette.main.point
										: theme.palette.main.white
								}>
								{BLOG_LIST_TYPE[2].title}
							</Typography>
						</MButton>
					</Box>
				</Box>
				<SearchInput
					placeholder='Search'
					fullWidth={mdUp ? false : true}
					value={keyword}
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
					onSearch={searchBlogs}
				/>
			</Box>
			<Tabs
				value={categoryValue}
				onChange={handleCategoryChange}
				variant='scrollable'
				scrollButtons
				allowScrollButtonsMobile
				aria-label='scrollable force tabs example'>
				{categories?.map((item: ICategory) => (
					<Tab key={item.id} value={item.id} label={item.name} />
				))}
			</Tabs>
			{videoDataFirst.length === 0 &&
			videoDataSecond.length === 0 &&
			newsData.length === 0 &&
			!isLoadingBlogs &&
			!isFetchingNextPage ? (
				<Box width={'100%'}>
					<Typography
						cate='body_3'
						textAlign={'center'}
						color={theme.palette.main.gray30}
						mt={15}>
						검색된 콘텐츠가 없습니다. 확인 후 다시 시도해주세요.
					</Typography>
				</Box>
			) : (
				<>
					<Grid
						container
						spacing={3}
						mt={6}
						justifyContent={smDown ? 'center' : 'flex-start'}>
						{videoDataFirst?.map((x: any, index: number) => {
							return (
								<Grid item key={index} xs={12} md={6} lg={4} xl={3}>
									<CardSlide
										item={x}
										onClick={() => {
											router.push('/blogs/' + x.id);
										}}
										onBookmark={() => {
											handleBookmark(x.id, BLOG_TYPE.VIDEO);
										}}
									/>
								</Grid>
							);
						})}
					</Grid>
					{newsData.length === 0 ? (
						<></>
					) : (
						<CourseSlide
							data={newsData}
							handleBookmark={handleBookmark}
							hasNextPage={hasNewsNextPage}
							fetchNextPage={fetchNewsNextPage}
							isFetchingNextPage={isNewsFetchingNextPage}
						/>
					)}
					<Grid
						container
						spacing={3}
						mt={6}
						justifyContent={smDown ? 'center' : 'flex-start'}>
						{videoDataSecond?.map((x: any, index: number) => {
							return (
								<Grid item key={index} xs={12} md={6} lg={4} xl={3}>
									<CardSlide
										item={x}
										onClick={() => {
											router.push('/blogs/' + x.id);
										}}
										onBookmark={() => {
											handleBookmark(x.id, BLOG_TYPE.VIDEO);
										}}
									/>
								</Grid>
							);
						})}
					</Grid>
					{isFetchingNextPage && (
						<Box width='100%' display='flex' justifyContent={'center'}>
							<CircularProgress color='primary' />
						</Box>
					)}
				</>
			)}

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

export default Blogs;
