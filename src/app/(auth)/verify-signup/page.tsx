'use client';
import { authVerifyAtom } from '@/atoms/auth-verify';
import { loadingAtom } from '@/atoms/loading';
import { verifyAccount } from '@/services/auth.service';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import LinkExpired from '../_components/link-expired';

const VerifySignUp = () => {
	const query = useSearchParams();
	const router = useRouter();
	const setLoading = useSetRecoilState(loadingAtom);
	const setAuthVerify = useSetRecoilState(authVerifyAtom);
	const [showExpiredNoti, setShowExpiredNoti] = useState<boolean>(false);

	async function checkVerifyToken() {
		// setLoading(true);
		const param = new URLSearchParams(Array.from(query.entries()));

		if (!Boolean(param.get('token'))) {
			setLoading(false);
			router.push('/sign-in');
		}

		const { data, error } = await verifyAccount({
			token: param.get('token') || '',
		});

		if (data && error === undefined) {
			setLoading(false);
			setAuthVerify(true);
			router.push('/sign-in');
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
					onClick={() => {
						router.push('/sign-up');
					}}
				/>
			)}
		</>
	);
};

export default VerifySignUp;
