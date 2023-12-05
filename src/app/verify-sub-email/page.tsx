'use client';
import { loadingAtom } from '@/atoms/loading';
import { subEmailVerifyAtom } from '@/atoms/sub-email-verify';
import { verifySubEmail } from '@/services/auth.service';
import TokenService from '@/services/token.service';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import LinkExpired from '../(auth)/_components/link-expired';

const VerifySubEmail = ({ token }: any) => {
	const router = useRouter();
	const setLoading = useSetRecoilState(loadingAtom);
	const setSubEmailVerify = useSetRecoilState(subEmailVerifyAtom);
	const [showExpiredNoti, setShowExpiredNoti] = useState<boolean>(false);

	async function checkVerifyToken() {
		// setLoading(true);

		if (!Boolean(token)) {
			setLoading(false);
			router.push('/sign-in');
		}

		const { data, error } = await verifySubEmail({
			token: token as string,
		});

		if (data && error === undefined) {
			setLoading(false);
			if (TokenService.getLocalAccessToken()) {
				router.push('/me');
			} else {
				router.push('/sign-in');
				setSubEmailVerify(true);
			}
		} else {
			setLoading(false);
			setShowExpiredNoti(true);
		}
	}

	useEffect(() => {
		checkVerifyToken();
	}, []);

	return (
		<>
			{showExpiredNoti && (
				<LinkExpired
					buttonTitle=' 로그인 페이지로 이동하기'
					onClick={() => {
						if (TokenService.getLocalAccessToken()) {
							router.push('/me');
						} else {
							router.push('/signin');
						}
					}}
				/>
			)}
		</>
	);
};

export default VerifySubEmail;
