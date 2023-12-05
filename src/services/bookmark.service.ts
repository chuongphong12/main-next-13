import axios from '@/services/axios';
import { IResponse } from '@/types/response.types';

const ENDPOINT = '/favorites';

export interface IBookmarkRequest {
	type: string;
	id: number;
}

export async function updateBookmark(body: IBookmarkRequest) {
	const res = await axios.post(`${ENDPOINT}`, body);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}
