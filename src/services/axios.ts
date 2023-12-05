import axios from 'axios';
import TokenService from './token.service';
import Router from 'next/router';
import { jwtVerification } from '@/utils/jwt-verification';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept-Language': 'kr',
		'Cache-Control': 'no-cache',
	},
});

instance.interceptors.request.use(
	(config) => {
		const token = TokenService.getLocalAccessToken();
		if (!!config?.headers?.Authorization) {
			return config;
		} else if (token && jwtVerification(token)) {
			config.headers!['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const originalConfig = err.config;

		if (originalConfig.url !== '/authentication/admin-login' && err.response) {
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;

				try {
					const refreshToken = TokenService.getLocalRefreshToken();
					if (refreshToken && jwtVerification(refreshToken)) {
						const rs = await axios.get(
							process.env.NEXT_PUBLIC_API_URL + '/auth/access-token',
							{
								headers: {
									Authorization: 'Bearer ' + refreshToken,
								},
							}
						);
						const { data } = rs.data;

						if (data) {
							TokenService.updateLocalAccessToken(data.accessToken);
						}
						return instance(originalConfig);
					} else {
						TokenService.removeAuth();
						Router.push('/sign-in');
						return Promise.resolve({ error: err.response?.data?.error });
					}
				} catch (_error) {
					console.log('_error', _error);

					TokenService.removeAuth();
					Router.push('/sign-in');
					return Promise.resolve(_error);
				}
			}
		}
		return Promise.resolve({ error: err.response?.data?.error });
	}
);

export default instance;
