import { ILogin, ILoginResponse, ISignup } from '@/types/auth.type';
import { IResponse } from '@/types/response.types';
import { withRouter } from 'next/router';
import axios from './axios';
import TokenService from './token.service';
import { redirect } from 'next/navigation';
const ENDPOINT = '/auth';

export async function login(dataLogin: ILogin): Promise<ILoginResponse> {
	const res = await axios.post<any>(`${ENDPOINT}/login`, { ...dataLogin, role: 'USER' });

	const { data, error }: IResponse = res;
	return {
		user: data?.data.user,
		access_token: data?.data?.tokens?.accessToken,
		refresh_token: data?.data?.tokens?.refreshToken,
		error: error,
	};
}

export async function verifyAccount(dataRequest: { token: string }) {
	const res = await axios.post<any>(
		`${ENDPOINT}/verify-account`,
		{},
		{ headers: { Authorization: 'Bearer ' + dataRequest.token } }
	);
	const { data, error }: IResponse = res;

	return {
		data,
		error,
	};
}

export async function signup(signupData: ISignup) {
	const res = await axios.post<any>(`${ENDPOINT}/register`, signupData);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function logout() {
	const res = await axios.put<any>(`${ENDPOINT}/logout`);
	const { data, error }: IResponse = res;
	TokenService.removeAuth();
	window.location.href = '/sign-in';

	// return {
	// 	data,
	// 	error,
	// };
}

export async function logoutOtherDevices() {
	const res = await axios.put<any>(`${ENDPOINT}/logout-others-devices`);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function sendEmailResetPassword(dataRequest: { email: string }) {
	const res = await axios.post<any>(`${ENDPOINT}/reset-password/send-email`, dataRequest);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function verifyTokenResetPassword(dataRequest: { token: string }) {
	const res = await axios.post<any>(
		`${ENDPOINT}/reset-password/verify-token`,
		{},
		{ headers: { Authorization: 'Bearer ' + dataRequest.token } }
	);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function verifySubEmail(dataRequest: { token: string }) {
	const res = await axios.post<any>(
		`${process.env.NEXT_PUBLIC_API_URL}${ENDPOINT}/email/verification-sub-email`,
		{},
		{ headers: { Authorization: 'Bearer ' + dataRequest.token } }
	);
	const { data, error }: IResponse = res;

	return {
		data,
		error,
	};
}

export async function sendSubEmail(email: string) {
	const res = await axios.post<any>(`${ENDPOINT}/email/send-verification-sub-email`, {
		email: email,
	});
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}
export async function resetPassword(dataRequest: { password: string; token: string }) {
	const res = await axios.put<any>(
		`${ENDPOINT}/reset-password/update-password`,
		{ password: dataRequest.password },
		{ headers: { Authorization: 'Bearer ' + dataRequest.token } }
	);
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function sendOtp(phone: string) {
	const res = await axios.post<any>(`${ENDPOINT}/phone-number/send-otp`, {
		phoneNumber: phone,
	});
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}

export async function verifyOtp(otp: string) {
	const res = await axios.post<any>(`${ENDPOINT}/phone-number/verify-otp`, {
		OTP: otp,
	});
	const { data, error }: IResponse = res;
	return {
		data,
		error,
	};
}
