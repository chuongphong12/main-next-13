import { QueryFunction, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseInfiniteScroll {
	api: QueryFunction<unknown, QueryKey, unknown>;
	key: any;
	enabled?: boolean;
	canFetchMore?: boolean;
	depend?: any;
	onSuccess?: any;
}

const useInfiniteScroll = (body: UseInfiniteScroll) => {
	const {
		data,
		hasNextPage,
		fetchNextPage,
		isLoading,
		refetch,
		isFetchingNextPage,
		isFetching,
		isSuccess,
	} = useInfiniteQuery({
		queryKey: [body.key, body.depend],
		queryFn: body.api,
		getNextPageParam: (lastPage: any) => {
			if (body.canFetchMore === false) return;
			const maxPages = lastPage?.data?.data?.metaData?.lastPage;
			const nextPage = lastPage?.data?.data?.metaData?.nextPage;
			const currentPage = lastPage?.data?.data?.metaData?.currentPage;
			return nextPage <= maxPages && currentPage < nextPage ? nextPage : undefined;
		},
		enabled: body.enabled,
		initialPageParam: 1,
	});

	useEffect(() => {
		if (isSuccess && body.onSuccess) body.onSuccess();
	}, [isSuccess, body.onSuccess, body]);

	useEffect(() => {
		let fetching = false;
		const onScroll = async (event: any) => {
			const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
			if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
				fetching = true;
				if (hasNextPage) await fetchNextPage();
				fetching = false;
			}
		};

		document.addEventListener('scroll', onScroll);
		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	});

	return { data, isLoading, refetch, isFetchingNextPage, isFetching };
};

export default useInfiniteScroll;
