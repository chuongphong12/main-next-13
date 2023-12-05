import NavigationLeftIcon from '@/assets/icons/navigation-left';
import NavigationRightIcon from '@/assets/icons/navigation-right';
import { CardHorizontalSlide } from '@/elements/CardCourse';
import { IBlog } from '@/types/blog.type';
import { BLOG_TYPE } from '@/utils/constants';
import { getNormalizedScrollLeft } from '@/utils/handleHorizontalScroll';
import {
	CircularProgress,
	IconButton,
	debounce,
	ownerWindow,
	useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import { useCallback, useEffect, useRef, useState } from 'react';

type CourseHorizontalProps = {
	data: IBlog[];
	handleBookmark: Function;
	fetchNextPage?: Function;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
};

export default function CourseHorizontalList({
	data,
	handleBookmark,
	fetchNextPage,
	isFetchingNextPage,
	hasNextPage,
}: CourseHorizontalProps) {
	const contentWrapper = useRef<any>();
	const contentContainer = useRef<any>();
	const [hideLeftNavigation, setHideLeftNavigation] = useState(true);
	const [hideRightNavigation, setHideRightNavigation] = useState(false);
	const theme = useTheme();
	const fetchingRef = useRef<boolean>(false);
	const sideScroll = (
		element: HTMLDivElement,
		speed: number,
		distance: number,
		step: number
	) => {
		let scrollAmount = 0;
		const slideTimer = setInterval(() => {
			contentWrapper.current.scrollLeft += step;

			if (contentWrapper.current.scrollLeft === 0) {
				setHideLeftNavigation(true);
			} else {
				setHideLeftNavigation(false);
			}

			if (
				contentWrapper.current.scrollWidth - contentWrapper.current.scrollLeft ==
				contentWrapper.current.clientWidth
			) {
				setHideRightNavigation(true);
			} else {
				setHideRightNavigation(false);
			}
			scrollAmount += Math.abs(step);
			if (scrollAmount >= distance) {
				clearInterval(slideTimer);
			}
		}, speed);
	};

	const scrollApp = async (event: any) => {
		if (event.target.scrollLeft === 0) {
			setHideLeftNavigation(true);
		} else {
			setHideLeftNavigation(false);
		}
		if (
			contentWrapper.current.scrollWidth - event.target.scrollLeft ==
			contentWrapper.current.clientWidth
		) {
			setHideRightNavigation(true);
		} else {
			setHideRightNavigation(false);
		}

		if (
			!fetchingRef.current &&
			event.target.scrollWidth - event.target.scrollLeft <= event.target.clientWidth * 1.5
		) {
			fetchingRef.current = true;
			if (hasNextPage) await fetchNextPage?.();
			fetchingRef.current = false;
		}
	};
	useEffect(() => {
		if (contentContainer.current?.clientWidth <= contentWrapper.current?.scrollWidth) {
			setHideRightNavigation(true);
			setHideLeftNavigation(true);
		}
	}, []);

	const updateScrollButtonState = useCallback(() => {
		const isRtl = theme.direction === 'rtl';

		const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } =
			contentWrapper.current;
		let showStartScroll;
		let showEndScroll;

		const scrollLeft = getNormalizedScrollLeft(contentWrapper.current, theme.direction);
		// use 1 for the potential rounding error with browser zooms.
		showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
		showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
		if (
			showStartScroll !== !hideLeftNavigation ||
			showEndScroll !== !hideRightNavigation
		) {
			setHideLeftNavigation(!showStartScroll);
			setHideRightNavigation(!showEndScroll);
		}
	}, [hideLeftNavigation, hideRightNavigation, theme.direction]);

	useEffect(() => {
		const handleResize = debounce(() => {
			if (contentWrapper.current) {
				updateScrollButtonState();
			}
		});
		const win = ownerWindow(contentWrapper.current);
		win.addEventListener('resize', handleResize);
		let resizeObserver: any;
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(handleResize);
			Array.from(contentWrapper.current.children).forEach((child) => {
				resizeObserver.observe(child);
			});
		}
		return () => {
			handleResize.clear();
			win.removeEventListener('resize', handleResize);
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, [updateScrollButtonState]);

	return (
		<Box
			sx={{
				width: '100%',
				overflow: 'hidden',
			}}
			ref={contentContainer}>
			{!hideLeftNavigation && (
				<IconButton
					onClick={() => {
						sideScroll(contentWrapper?.current, 25, 100, -10);
					}}
					sx={{
						position: 'absolute',
						zIndex: 3,
						left: '-8px',
						top: '45%',
					}}>
					<NavigationLeftIcon />
				</IconButton>
			)}
			<List
				component={Stack}
				ref={contentWrapper}
				direction='row'
				gap={2}
				onScroll={scrollApp}
				sx={{
					width: '100%',
					overflow: 'auto',
					'&::-webkit-scrollbar': {
						display: 'none',
						width: '0 !important',
					},
				}}>
				{data.map((i: IBlog) => {
					return (
						<ListItem disablePadding key={i.id} sx={{ width: 'auto' }}>
							<CardHorizontalSlide
								item={i}
								onBookmark={() => {
									handleBookmark(i.id, BLOG_TYPE.CARD_NEWS);
								}}
							/>
						</ListItem>
					);
				})}
				{isFetchingNextPage && (
					<ListItem sx={{ width: '100%' }}>
						<CircularProgress color='primary' />
					</ListItem>
				)}
			</List>
			{!hideRightNavigation && (
				<IconButton
					onClick={() => {
						sideScroll(contentWrapper?.current, 25, 100, 10);
					}}
					sx={{
						position: 'absolute',
						zIndex: 3,
						right: '-8px',
						top: '45%',
					}}>
					<NavigationRightIcon />
				</IconButton>
			)}
		</Box>
	);
}
