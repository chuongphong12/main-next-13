import axios from '@/services/axios';
import { ICommentListRequest, ICreateComment } from '@/types/comments.type';
import { IResponse } from '@/types/response.types';

const ENDPOINT = '/comments';

export interface IBlogDetailResponse {
	data: any;
	error: any;
}

export async function getCommentsList(params: ICommentListRequest) {
	const { data } = await axios.get(`${ENDPOINT}`, {
		params: {
			...params,
		},
	});
	return data;
}

export async function createComment(body: ICreateComment) {
	const res = await axios.post(`${ENDPOINT}`, { ...body });
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function deleteComment(id: number | string) {
	const res = await axios.delete(`${ENDPOINT}/${id}`);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}
