import axios from '@/services/axios';
import { IBlog, IBlogListRequest } from '@/types/blog.type';
import { IResponse } from '@/types/response.types';

const ENDPOINT = '/contents';

export interface IBlogDetailResponse {
	data: any;
	error: any;
}

export async function getBlogList(params: IBlogListRequest) {
	const { data } = await axios.get(`${ENDPOINT}/active`, {
		params: {
			...params,
		},
	});
	return data;
}

export async function getBlogDetail(id: string | number): Promise<IBlogDetailResponse> {
	const res = await axios.get<any>(`${ENDPOINT}/active/${id}`);
	const { data, error }: IResponse = res;
	return {
		data: data?.data as IBlog,
		error: error,
	};
}

export async function downloadCardNews(id: string | number) {
	const res = await axios.get<any>(`${ENDPOINT}/download-images/${id}`, {
		responseType: 'arraybuffer',
	});
	const { data, error }: IResponse = res;
	const url = URL.createObjectURL(
		new Blob([data], {
			type: 'arraybuffer',
		})
	);
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', 'file.zip');
	document.body.appendChild(link);
	link.click();
	link.remove();

	return {
		data: data?.data as IBlog,
		error: error,
	};
}
