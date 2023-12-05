import MenuItem from '@/elements/MenuItem';
import SearchInput from '@/elements/SearchInput';
import Select from '@/elements/Select';
import Typography from '@/elements/Typography';
import { getBlogList } from '@/services/blogs.service';
import { updateBookmark } from '@/services/bookmark.service';
import { getBlogCategories } from '@/services/categories.service';
import { IBlog } from '@/types/blog.type';
import { ICategory } from '@/types/category.type';
import { BLOG_LIST_TYPE, BLOG_TYPE } from '@/utils/constants';
import { Box, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import SideCardNews from './SideCardNews';
import SideListTabItem from './SideListTabItem';
import SideListTabs from './SideListTabs';
import SideVideoItem from './SideVideoItem';

const SideList = ({ blogType, id }: { blogType: string; id: string | number }) => {
	const [categoryValue, setCategoryValue] = useState(0);
	const mdUp = useMediaQuery('(min-width: 768px)');
	const theme = useTheme();
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setCategoryValue(newValue);
	};
	const [keyword, setKeyword] = useState<string>('');
	const [searchKeyword, setSearchKeyword] = useState<string>('');
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [blogsData, setblogsData] = useState<IBlog[]>([]);
	const fetchingRef = useRef<boolean>(false);
	const handleSelectChange = (event: any) => {
		setCategoryValue(event.target?.value);
	};

	const searchBlogs = () => {
		setSearchKeyword(keyword.trim());
		setKeyword(keyword.trim());
	};

	const {
		data,
		hasNextPage,
		fetchNextPage,
		isLoading,
		refetch,
		isFetchingNextPage,
		isFetching,
	} = useInfiniteQuery({
		queryKey: ['blog-list-in-detail-page', searchKeyword, categoryValue, blogType],
		queryFn: ({
			pageParam = 1,
			categoryId = categoryValue !== 0 ? categoryValue : undefined,
			listType = BLOG_LIST_TYPE[1].value,
			keyword = !!searchKeyword ? searchKeyword : undefined,
			type = blogType,
			currentId = id,
		}: any) =>
			getBlogList({
				page: pageParam,
				limit: 16,
				categoryId: categoryId,
				listType: listType,
				keyword: keyword,
				type: type,
				currentId: currentId,
			}),
		getNextPageParam: (lastPage: any) => {
			const maxPages = lastPage?.data?.data?.metaData?.lastPage;
			const nextPage = lastPage?.data?.data?.metaData?.nextPage;
			const currentPage = lastPage?.data?.data?.metaData?.currentPage;
			return nextPage <= maxPages && currentPage < nextPage ? nextPage : undefined;
		},
		initialPageParam: 1,
		enabled: true,
	});

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
		let blogsDataRes: IBlog[] = [];

		data?.pages?.forEach((page) =>
			page?.data?.data?.result?.forEach((x: IBlog) => {
				blogsDataRes.push(x);
			})
		);

		setblogsData(blogsDataRes as IBlog[]);
	}, [data]);

	const handleScroll = async (e: any) => {
		if (
			!fetchingRef.current &&
			e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight * 1.5
		) {
			fetchingRef.current = true;
			if (hasNextPage) await fetchNextPage();
			fetchingRef.current = false;
		}
	};

	const handleBookmark = async (id: number) => {
		const { data, error } = await updateBookmark({ id, type: 'CONTENT' });
		if (!error) {
			refetch();
		}
	};

	return (
		<Box display={'flex'} flexDirection={'column'}>
			<SearchInput
				fullWidth
				placeholder='Search'
				sx={{ marginBottom: '1.5rem' }}
				onChange={(e) => {
					setKeyword(e.target.value);
				}}
				value={keyword}
				onSearch={searchBlogs}
			/>
			{mdUp ? (
				<SideListTabs
					value={categoryValue}
					onChange={handleChange}
					variant='scrollable'
					scrollButtons
					allowScrollButtonsMobile
					aria-label='scrollable force tabs example'>
					{categories?.map((i: ICategory) => (
						<SideListTabItem value={i.id} label={i.name} key={i.id} />
					))}
				</SideListTabs>
			) : (
				<Select
					placeholder='대한민국'
					displayEmpty
					value={categoryValue}
					fullWidth
					renderValue={(value) => {
						if (value === -1) {
							return (
								<Typography cate='body_3' color={theme.palette.main.gray30}>
									대한민국
								</Typography>
							);
						}
						return (
							<Box display={'flex'} alignItems={'center'}>
								<Typography cate='body_3' color={theme.palette.main.gray10} ml={2}>
									{categories?.find((i: ICategory) => i.id === value)?.name}
								</Typography>
							</Box>
						);
					}}
					onChange={handleSelectChange}>
					{categories?.map((i: ICategory) => {
						return (
							<MenuItem value={i.id} key={i.id}>
								<Typography cate='body_3' color={theme.palette.main.gray10} ml={2}>
									{i.name}
								</Typography>
							</MenuItem>
						);
					})}
				</Select>
			)}
			{blogsData.length === 0 && !isLoading && !isFetchingNextPage ? (
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
				<Box height={'50rem'} overflow={'auto'} onScroll={handleScroll}>
					<Grid container spacing={3} mt={2}>
						{blogType === BLOG_TYPE.VIDEO
							? blogsData.map((i: IBlog) => {
									return (
										<Grid item xs={12} key={i.id}>
											<SideVideoItem item={i} onBookmark={() => {}} />
										</Grid>
									);
							  })
							: blogsData.map((i: IBlog) => {
									return (
										<Grid item xs={6} key={i.id}>
											<SideCardNews
												item={i}
												onBookmark={() => {
													handleBookmark(i.id || 0);
												}}
											/>
										</Grid>
									);
							  })}
					</Grid>
					{isFetchingNextPage && (
						<Box width={'100%'} display={'flex'} justifyContent={'center'}>
							<CircularProgress color='primary' />
						</Box>
					)}
				</Box>
			)}
		</Box>
	);
};

export default SideList;
