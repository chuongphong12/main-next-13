import {
  Avatar,
  Box,
  Grid,
  GridProps,
  Button as MButton,
  styled,
  useTheme,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import ChevronDownComment from 'assets/icons/chevron-down-comment';
import ChevronUpComment from 'assets/icons/chevron-up-comment';
import Typography from 'elements/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import {
  createComment,
  deleteComment,
  getCommentsList,
} from 'services/comments.service';
import { IComment } from 'types/comments.type';
import CommentChildItem from './CommentChildItem';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

type CommentBlockProps = {
  item: IComment;
  refetchParent?: any;
};
type CustomReplyGroupProps = GridProps & {
  open: boolean;
};
const CustomReplyGroup = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'open',
})<CustomReplyGroupProps>(({ theme, open }) => ({
  overflow: 'hidden',
  ...(open && {
    height: '100%',
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    height: 0,
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const CommentBlock = ({ item, refetchParent }: CommentBlockProps) => {
  const theme = useTheme();
  const [openReplyInput, setOpenReplyInput] = useState<boolean>(false);
  const [openReplies, setOpenReplies] = useState<boolean>(false);

  const [commentData, setCommentData] = useState<IComment[]>([]);
  const {
    data: commentsList,
    hasNextPage,
    fetchNextPage,
    isLoading,
    refetch,
    isFetchingNextPage: isNewsFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['comments-child-list' + item.contentId + item.id],
    ({ pageParam = 1 }: any) =>
      getCommentsList({
        page: pageParam,
        limit: 10,
        contentId: item.contentId,
        parentId: item.id,
      }),
    {
      getNextPageParam: (lastPage: any) => {
        const maxPages = lastPage?.data?.meta?.lastPage;
        const nextPage = lastPage?.data?.meta?.nextPage;
        const currentPage = lastPage?.data?.meta?.page;
        return nextPage <= maxPages && currentPage < nextPage
          ? nextPage
          : undefined;
      },
      // enabled: true,
      // onSuccess: body.onSuccess
    }
  );

  useEffect(() => {
    let commentsDataRes: IComment[] = [];

    commentsList?.pages?.forEach((page) =>
      page?.data?.result?.forEach((x: IComment) => {
        commentsDataRes.push(x);
      })
    );
    setCommentData(commentsDataRes as IComment[]);
  }, [commentsList]);

  const handleComment = async (comment: string) => {
    const { data, error } = await createComment({
      comment,
      contentId: Number(item.contentId),
      parentId: Number(item.id),
    });

    if (!error) {
      refetch();
      refetchParent?.();
      if (openReplies === false) {
        setOpenReplies(true);
      }
    } else {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  const handleDelete = async (id: number) => {
    const { data, error } = await deleteComment(id);

    if (!error) {
      refetch();
      refetchParent?.();
      enqueueSnackbar('삭제가 완료되었습니다.', {
        variant: 'info',
      });
    } else {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <Box display={'flex'} flexDirection="column" mt={3}>
      <Box display={'flex'} alignItems={'flex-start'} flexWrap="nowrap">
        <Avatar
          sx={{ width: '2.5rem', height: '2.5rem' }}
          src={
            !!item?.user?.avatar?.url
              ? item?.user?.avatar?.url
              : '/images/blank-user.png'
          }
        />
        <Box
          display={'flex'}
          flexDirection="column"
          alignItems={'flex-start'}
          width="100%"
          ml={2}
        >
          <CommentItem
            comment={item || {}}
            handleDelete={() => {
              handleDelete(item.id);
            }}
            handleReport={() => {}}
          />

          <MButton
            sx={{
              margin: '0.7rem  0',
              padding: 0,
              display: 'flex',
              justifyContent: 'flex-start',
              width: 'auto',
              minWidth: 0,
            }}
            onClick={() => {
              setOpenReplyInput(true);
            }}
          >
            <Typography
              cate="button_3_semibold"
              color={
                openReplyInput
                  ? theme.palette.main.primary_light
                  : theme.palette.main.gray20
              }
            >
              답글
            </Typography>
          </MButton>
          <CustomReplyGroup
            width={'100%'}
            open={openReplyInput}
            gap={2}
            display="flex"
          >
            <CommentInput
              isChildren
              fullWidth
              placeholder="답글추가..."
              submitTitle="답글추가"
              onCloseReply={() => {
                setOpenReplyInput(false);
              }}
              handleComment={handleComment}
            />
          </CustomReplyGroup>
          <MButton
            sx={{
              margin: '0.7rem  0',
              padding: 0,
              display: 'flex',
              justifyContent: 'flex-start',
              width: 'auto',
              minWidth: 0,
            }}
            onClick={() => {
              if (item.totalComment === 0) {
                return;
              }
              fetchNextPage();
              setOpenReplies((prev) => !prev);
            }}
          >
            {openReplies ? <ChevronUpComment /> : <ChevronDownComment />}
            <Typography
              cate="button_3_semibold"
              color={theme.palette.main.primary_light}
              ml={0.6}
            >
              댓글 {item.totalComment}개
            </Typography>
          </MButton>
          <CustomReplyGroup width={'100%'} open={openReplies} container gap={2}>
            {commentData.map((x: IComment) => (
              <Grid item xs={12} key={x.id}>
                <CommentChildItem
                  comment={x}
                  handleDelete={() => {
                    handleDelete(x.id);
                  }}
                  handleReport={() => {}}
                />
              </Grid>
            ))}
          </CustomReplyGroup>
        </Box>
      </Box>
    </Box>
  );
};
export default CommentBlock;
