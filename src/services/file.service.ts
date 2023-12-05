import { IResponse } from '@/types/response.types';
import axios from './axios';

const ENDPOINT = '/uploads';

export async function uploadFile(file: File) {
	let formData = new FormData();
	formData.append('fileUpload', file);
	const res = await axios.postForm<any>(`${ENDPOINT}`, formData);
	const { data, error }: IResponse = res;
	return {
		data: data,
		error: error,
	};
}

export async function deleteFile(id: number | string) {
	const { data } = await axios.delete<any>(`${ENDPOINT}/${id}`);
	return data.data;
}
