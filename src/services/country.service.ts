import { IResponse } from '@/types/response.types';
import axios from './axios';
const ENDPOINT = '/countries';

export async function getCountries() {
	const res = await axios.get<any>(`${ENDPOINT}`);
	const { data, error }: IResponse = res;
	// History.push('/')
	return {
		data,
		error,
	};
}
