'use client';

import ChevronRightSmIcon from '@/assets/icons/chevron-right-sm';
import MailIcon from '@/assets/icons/mail';
import VariantIcon from '@/assets/icons/variant';
import { authVerifyAtom } from '@/atoms/auth-verify';
import { loadingAtom } from '@/atoms/loading';
import { subEmailVerifyAtom } from '@/atoms/sub-email-verify';
import { userAtom } from '@/atoms/user';
import { userPoolAtom } from '@/atoms/user-pool';
import AlertPopup from '@/elements/AlertPopup';
import AppLogo from '@/elements/AppLogo';
import ButtonCustom from '@/elements/Button';
import ControlInput from '@/elements/ControlInput';
import Typography from '@/elements/Typography';
import { ColorModeContext } from '@/libs/ThemeRegistry';
import { login } from '@/services/auth.service';
import { getUserPool } from '@/services/pool.service';
import TokenService from '@/services/token.service';
import WebInfoService from '@/services/web-info.service';
import { emailValidator, passwordValidator } from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import styles from '../styles.module.scss';
import UserIcon from '@/assets/icons/user';

const SignIn = () => {
	const theme = useTheme();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const colorMode = useContext(ColorModeContext);
	const smDown = useMediaQuery('(max-width: 576px)');
	const { i18n } = useTranslation();
	const [subEmailVerify, setSubEmailVerify] = useRecoilState(subEmailVerifyAtom);

	const schema = yup
		.object({
			username: yup.string().required('이메일을 입력해주세요'),
			password: yup
				.string()
				.required('비밀번호를 입력해주세요.')
				.test(
					'password',
					'영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요.',
					(value?: string) => passwordValidator(value)
				),
		})
		.required();

	const defaultValues = {
		username: '',
		password: '',
	};
	const setUser = useSetRecoilState(userAtom);
	const setUserPool = useSetRecoilState(userPoolAtom);
	const setLoading = useSetRecoilState(loadingAtom);
	const [authVerified, setAuthVerified] = useRecoilState(authVerifyAtom);
	const formOptions = {
		defaultValues,
		resolver: yupResolver(schema),
		// mode: 'onSubmit' as keyof ValidationMode,
	};
	const { handleSubmit, formState, getValues, control, register } = useForm(formOptions);
	const { isValid, isDirty } = formState;

	const router = useRouter();

	useEffect(() => {
		if (authVerified) {
			setShowError(true);
			setErrorMessage('이메일 인증에 성공했습니다.');
			setAuthVerified(false);
		}
	}, [authVerified, setAuthVerified]);

	const onSubmit = async (data: any) => {
		setLoading(true);
		const { user, error, access_token, refresh_token } = await login(data);

		if (user) {
			setUser(user);
			TokenService.setAuth({
				accessToken: access_token,
				refreshToken: refresh_token,
			});
			colorMode.toggleColorMode(user.isDarkMode ? 'dark' : 'light');
			// i18n.changeLanguage(user.language);
			WebInfoService.setLanguage(user?.language || 'kr');
			setLoading(false);
			const userPool = await getUserPool();
			if (!!userPool) {
				setUserPool(userPool);
			} else {
				setUserPool(null);
			}
			if (subEmailVerify) {
				router.push('/me');
				setSubEmailVerify(false);
			} else {
				router.push('/');
			}
		} else {
			setLoading(false);
			setShowError(true);
			setErrorMessage(error.message);
		}
		// setIsClick(true);
	};

	const email = useWatch({
		control,
		name: 'username',
	});

	const password = useWatch({
		control,
		name: 'password',
	});

	return (
        <Box
			className={styles.sign_in}
			style={{ backgroundColor: theme.palette.main.gray90 }}>
			<AppLogo />
			<Typography
				cate='body_2'
				color={theme.palette.main.gray40}
				whiteSpace={'pre-line'}
				textAlign={'center'}>
				{`당신의 아이디어를 혁신으로 만드는${smDown ? '\n' : ''} 완벽한 솔루션`}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12}>
						<ControlInput
							fullWidth={true}
							register={register}
							type='text'
							name='username'
							label='username'
							placeholder='아이디'
							control={control}
							startAdornment={<UserIcon stroke='#9F9EA4' />}
							startAdornmentFocused={<UserIcon stroke={theme.palette.main.gray10} />}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<ControlInput
							fullWidth={true}
							register={register}
							type={'password'}
							name='password'
							label='password'
							placeholder='비밀번호'
							control={control}
							startAdornment={<VariantIcon />}
							startAdornmentFocused={<VariantIcon stroke={theme.palette.main.gray10} />}
						/>
					</Grid>
				</Grid>
				<Box mt={3}>
					<ButtonCustom
						title='로그인'
						cate='primary'
						isLoading={false}
						sx={{ width: '100%' }}
						disabled={!Boolean(password) || !Boolean(email)}
					/>
				</Box>
			</form>

			<Box className={styles.register_wrapper} sx={{ marginBottom: '1.5rem' }}>
				<Typography cate='caption_1' color={theme.palette.main.gray40}>
					아직 회원이 아니신가요?
				</Typography>
				<Link href='/sign-up' style={{ zIndex: 3 }} legacyBehavior>
					<Box display={'flex'} alignItems='center' sx={{ cursor: 'pointer' }}>
						<Typography cate='caption_1' color={theme.palette.main.gray10}>
							회원가입
						</Typography>
						<ChevronRightSmIcon stroke={theme.palette.main.white} />
					</Box>
				</Link>
			</Box>
			<Link href='/forgot-password' style={{ zIndex: 3 }} legacyBehavior>
				<Typography
					cate='caption_1'
					color={theme.palette.main.gray40}
					sx={{ cursor: 'pointer' }}>
					비밀번호를 잊으셨나요?
				</Typography>
			</Link>
			<AlertPopup
				onSubmit={() => {
					setShowError(false);
					setErrorMessage('');
				}}
				submitTitle='확인'
				description={errorMessage}
				open={showError}
			/>
		</Box>
    );
};

export default SignIn;
