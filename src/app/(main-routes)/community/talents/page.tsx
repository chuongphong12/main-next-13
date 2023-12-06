'use client';
import { loadingAtom } from '@/atoms/loading';
import { userPoolAtom } from '@/atoms/user-pool';
import AlertPopup from '@/elements/AlertPopup';
import Button from '@/elements/Button';
import CardCommunityTalent from '@/elements/CardCommunityTalent';
import SearchInput from '@/elements/SearchInput';
import Tab from '@/elements/Tab';
import Tabs from '@/elements/Tabs';
import Typography from '@/elements/Typography';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import { getPoolList } from '@/services/pool.service';
import {} from '@/services/user.service';
import { IPool } from '@/types/pool.type';
import { USER_JOB_TITLE_KR } from '@/utils/constants';
import { convertToRem } from '@/utils/convert-to-rem';
import { handlePageFilter } from '@/utils/handlePageFilter';
import { Box, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface NotificationType {
	email: boolean;
	sms: boolean;
}

const USER_JOB_TITLE = [
	{ value: '', label: '전체' },
	{ value: 'DEVELOPMENT', label: '개발' },
	{ value: 'DESIGN', label: '디자인' },
	{ value: 'SALES', label: '영업' },
	{ value: 'OPERATION_MANAGEMENT', label: '운영관리' },
	{ value: 'MARKETING', label: '마케팅' },
	{ value: 'PLANNING', label: '기획' },
	{ value: 'GREETING', label: '인사' },
	{ value: 'SERVER', label: '서버' },
	{ value: 'PLANNING_PM', label: '기획PM' },
	{ value: 'DEVELOPMENT_PM', label: '개발PM' },
];

const CommunityTalents = () => {
	const theme = useTheme();
	const breadcrumbData = [{ name: '커뮤니티' }, { name: '인재 POOL' }];
	const setLoading = useSetRecoilState(loadingAtom);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined);
	const [showError, setShowError] = useState<boolean>(false);
	const router = useRouter();
	const pathName = usePathname();
	const query = new URLSearchParams(useSearchParams());
	const userPool = useRecoilValue(userPoolAtom);
	const handleChange = (event: SyntheticEvent, newValue: string) => {
		let newQuery: URLSearchParams = query;
		if (newValue !== '') {
			newQuery.set('categoryValue', newValue);
		} else {
			if (!!newQuery.get('categoryValue')) {
				newQuery.delete('categoryValue');
			}
		}

		router.push(`${pathName}?${newQuery}`);
		// setCategoryValue(newValue);
	};
	const [keyword, setKeyword] = useState<string>(
		(query.get('searchKeyword') as string) || ''
	);
	const [searchKeyword, setSearchKeyword] = useState<string>(
		(query.get('searchKeyword') as string) || ''
	);
	const [categoryValue, setCategoryValue] = useState(
		(query.get('categoryValue') as string) || ''
	);
	const [poolsData, setPoolsData] = useState<IPool[]>([]);
	const mdUp = useMediaQuery('(min-width: 768px)');

	const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark');
	const {
		data: poolsList,
		refetch: refetchPool,
		isFetchingNextPage,
		isLoading: isLoadingPools,
	} = useInfiniteScroll({
		api: ({
			pageParam = 1,
			category = !!categoryValue
				? USER_JOB_TITLE_KR[categoryValue as keyof typeof USER_JOB_TITLE_KR]
				: undefined,
			keyword = !!searchKeyword ? searchKeyword : undefined,
		}: any) =>
			getPoolList({
				page: pageParam,
				limit: 16,
				category: category,
				keyword: keyword,
			}),

		key: 'pools-list',
		depend: [searchKeyword, categoryValue],
	});
	const searchPools = () => {
		let newQuery: URLSearchParams = query;
		if (!!keyword) {
			newQuery.set('searchKeyword', keyword.trim());
			setKeyword(keyword.trim());
		} else {
			if (!!newQuery.get('searchKeyword')) {
				newQuery.delete('searchKeyword');
			}
			setKeyword(keyword.trim());
		}
		router.push(`${pathName}?${newQuery}`);
		// setSearchKeyword(keyword);
	};
	useEffect(() => {
		let poolsData: IPool[] = [];

		poolsList?.pages?.forEach((page) =>
			(page as any).data?.result?.forEach((x: IPool) => {
				poolsData.push(x);
			})
		);

		setPoolsData(poolsData as IPool[]);
	}, [poolsList]);

	useEffect(() => {
		handlePageFilter({
			router,
			query: {
				categoryValue,
				searchKeyword,
			},
			pathName,
		});
	}, [categoryValue, searchKeyword]);

	useEffect(() => {
		const categoryValue = query.get('categoryValue');
		const searchKeyword = query.get('searchKeyword');
		const listTypeValue = query.get('listTypeValue');

		setCategoryValue(!!categoryValue ? (categoryValue as string) : '');
		setSearchKeyword(!!searchKeyword ? (searchKeyword as string) : '');
		setKeyword(!!searchKeyword ? (searchKeyword as string) : '');
	}, [query]);
	return (
		<>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate='large_title' mt={4.5} mb={5}>
				인재 POOL
			</Typography>
			<Box
				component='div'
				width={'100%'}
				height={convertToRem(106)}
				borderRadius={convertToRem(8)}
				sx={{
					backgroundColor: theme.palette.main.gray80,
				}}
				mb={7}
			/>
			<Box
				component='div'
				display={'flex'}
				justifyContent='space-between'
				alignItems={mdUp ? 'center' : 'flex-start'}
				flexDirection={mdUp ? 'row' : 'column'}
				mb={4}>
				<SearchInput
					placeholder='팀원을 검색해보세요'
					fullWidth={mdUp ? false : true}
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
					value={keyword}
					onSearch={searchPools}
				/>
				<Box
					display={'flex'}
					gap={1}
					alignItems={mdUp ? 'center' : 'flex-end'}
					justifyContent={!mdUp ? 'flex-end' : 'unset'}
					mb={mdUp ? 0 : 2}
					mt={mdUp ? 0 : 2}
					width={mdUp ? 'auto' : '100%'}>
					<Button
						cate={'outline'}
						customType={'active'}
						title={!!userPool ? '인재풀 수정하기' : '인재풀 등록하기'}
						sx={{
							width: '10rem',
						}}
						onClick={() => {
							router.push('/community-management/edit-pool');
						}}
					/>
				</Box>
			</Box>
			<Tabs
				value={categoryValue}
				onChange={handleChange}
				variant='scrollable'
				scrollButtons
				allowScrollButtonsMobile
				aria-label='scrollable force tabs example'>
				{USER_JOB_TITLE.map((i) => (
					<Tab label={i.label} value={i.value} key={i.value} />
				))}
			</Tabs>

			{poolsData.length === 0 && !isLoadingPools && !isFetchingNextPage ? (
				<Box width={'100%'}>
					<Typography
						cate='body_3'
						textAlign={'center'}
						color={theme.palette.main.gray30}
						mt={15}>
						{!!searchKeyword
							? '검색 결과가 없습니다. 확인 후 다시 시도해주세요.'
							: `검색된 콘텐츠가 없습니다. 확인 후 다시 시도해주세요.`}
					</Typography>
				</Box>
			) : (
				<Grid container columnSpacing={3} rowGap={2} mt={4}>
					{poolsData.map((i: IPool) => {
						return (
							<Grid item xs={12} md={6} key={i.id}>
								<CardCommunityTalent
									onClick={() => {
										router.push(`/community/talents/${i.user?.id}`);
									}}
									item={i}
								/>
							</Grid>
						);
					})}
				</Grid>
			)}
			{isFetchingNextPage && (
				<Box width='100%' display='flex' justifyContent={'center'}>
					<CircularProgress color='primary' />
				</Box>
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

export default CommunityTalents;
