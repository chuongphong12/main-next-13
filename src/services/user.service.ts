import { IUser } from '@/types/user.type';
import axios from './axios';
import { IResponse } from '@/types/response.types';

const ENDPOINT = '/users';
export async function getUserProfile(): Promise<IUser> {
	const { data } = await axios.get<any>(`${ENDPOINT}/my-profile`);
	return data.data;
}

export async function updateUserProfile(submitData: any) {
	const res = await axios.put<any>(`${ENDPOINT}`, submitData);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function deleteUserProfile() {
	const res = await axios.delete<any>(`${ENDPOINT}`);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function checkEmailExists(email: string) {
	const res = await axios.get<any>(`${ENDPOINT}/check-exists-email?email=${email}`);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function checkPhoneNumberExists(phone: string) {
	const res = await axios.get<any>(`${ENDPOINT}/check-exists-phone?phoneNumber=${phone}`);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}
