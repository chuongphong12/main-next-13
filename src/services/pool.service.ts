import { IUser } from '@/types/user.type';
import axios from './axios';
import { IResponse } from '@/types/response.types';
import { IPool, IPoolListRequest } from '@/types/pool.type';

const ENDPOINT = '/users/portfolio';
export interface IPoolResponse {
	data: any;
	error: any;
}

export interface ISendContactPool {
	fromNickname: string;
	fromUserEmail: string;
	fromUserPhoneNumber: string;
	message: string;
}

export async function getUserPool(): Promise<IPool | any> {
	const { data } = await axios.get<any>(`${ENDPOINT}`);
	return data.data;
}

export async function getPoolById(id: string | number): Promise<IPoolResponse> {
	const res = await axios.get<any>(`${ENDPOINT}/` + id);
	const { data, error }: IResponse = res;
	return {
		data: data?.data?.data as IPool,
		error: error,
	};
}

export async function createUserPool(submitData: IPool) {
	const res = await axios.post<any>(`${ENDPOINT}`, submitData);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function updateUserPool(submitData: IPool) {
	const res = await axios.put<any>(`${ENDPOINT}`, submitData);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function sendContactPool(submitData: ISendContactPool, id: number | string) {
	const res = await axios.post<any>(`${ENDPOINT}/` + id + '/contact', submitData);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function getPoolList(params: IPoolListRequest) {
	const { data } = await axios.get(`${ENDPOINT}/list`, {
		params: {
			...params,
		},
	});
	return data;
}
