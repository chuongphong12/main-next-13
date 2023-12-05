import { Box } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { createComment, getCommentsList } from 'services/comments.service';
import { IComment } from 'types/comments.type';
import CommentBlock from './CommentBlock';
import CommentInput from './CommentInput';

const CommentSection = ({
  id,
  refetchParent,
}: {
  id: string | number;
  refetchParent: any;
}) => {
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
    ['comments-list'],
    ({ pageParam = 1 }: any) =>
      getCommentsList({
        page: pageParam,
        limit: 10,
        contentId: id,
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
      enabled: true,
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
      contentId: Number(id),
    });

    if (!error) {
      refetch();
      refetchParent?.();
    } else {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <CommentInput placeholder="댓글추가..." handleComment={handleComment} />
      {commentData.map((x: IComment) => {
        return (
          <CommentBlock
            key={x.id}
            item={x}
            refetchParent={() => {
              refetch();
              refetchParent();
            }}
          />
        );
      })}
    </Box>
  );
};

export default CommentSection;
