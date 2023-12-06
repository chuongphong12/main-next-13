'use client';
import VariantIcon from '@/assets/icons/variant';
import { loadingAtom } from '@/atoms/loading';
import AlertPopup from '@/elements/AlertPopup';
import AppLogo from '@/elements/AppLogo';
import ButtonCustom from '@/elements/Button';
import ControlInput from '@/elements/ControlInput';
import Typography from '@/elements/Typography';
import { resetPassword, verifyTokenResetPassword } from '@/services/auth.service';
import { convertToRem } from '@/utils/convert-to-rem';
import { passwordValidator } from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import LinkExpired from '../_components/link-expired';
import styles from '../styles.module.scss';
import { useSearchParams } from 'next/navigation';

const ResetPassword = () => {
	const theme = useTheme();
	const router = useRouter();
	const query = new URLSearchParams(useSearchParams());
	const token = query.get('token');
	const setLoading = useSetRecoilState(loadingAtom);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [tokenValue, setTokenValue] = useState<string>('');
	const [showExpiredNoti, setShowExpiredNoti] = useState<boolean | null>(null);

	async function checkVerifyToken() {
		setLoading(true);
		if (!Boolean(token)) {
			router.push('/signin');
		}
		const { data, error } = await verifyTokenResetPassword({
			token: token as string,
		});

		if (data && error === undefined) {
			setLoading(false);
			setShowExpiredNoti(false);
			setTokenValue(token as string);
		} else {
			setLoading(false);
			setShowError(true);
			setShowExpiredNoti(true);
		}
	}
	useEffect(() => {
		checkVerifyToken();
	}, [token]);

	const schema = yup
		.object({
			password: yup
				.string()
				.trim()
				.required('비밀번호를 입력해주세요.')
				.test(
					'password',
					'영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요',
					(value?: string) => passwordValidator(value)
				),
			confirmPassword: yup
				.string()
				.trim()
				.required('비밀번호를 입력해주세요.')
				.test(
					'password',
					'영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요',
					(value?: string) => passwordValidator(value)
				)
				.oneOf(
					[yup.ref('password')],
					'비밀번호가 일치하지 않습니다. 확인 후 다시 시도해주세요.'
				),
		})
		.required();

	const defaultValues = {
		password: '',
		confirmPassword: '',
	};

	const formOptions = {
		defaultValues,
		resolver: yupResolver(schema),
	};
	const { handleSubmit, formState, getValues, control, register } = useForm(formOptions);
	const { isDirty, errors } = formState;
	const [resetPasswordSuccess, setResetPasswordSuccess] = useState<boolean>(false);

	const onSubmit = async (dataSubmit: any) => {
		setLoading(true);

		let dataSignup = {
			password: dataSubmit.password,
			token: tokenValue,
		};

		const { data, error } = await resetPassword(dataSignup);
		if (data && !error) {
			setLoading(false);
			setResetPasswordSuccess(true);
			setShowError(true);
			setErrorMessage('비밀번호 변경이 완료되었습니다. 로그인 후 이용해주세요.');
		} else {
			setLoading(false);
			setResetPasswordSuccess(false);
			setShowError(true);
			setErrorMessage(error.message);
		}
	};

	if (showExpiredNoti === null) {
		return <></>;
	} else if (showExpiredNoti === true) {
		return (
			<>
				<LinkExpired
					onClick={() => {
						router.push('/signup');
					}}
				/>
			</>
		);
	}
	return (
		<>
			<Box
				className={styles.sign_in}
				style={{ backgroundColor: theme.palette.main.gray90 }}>
				<AppLogo />
				<Typography cate='body_2' color={theme.palette.main.gray40}>
					비밀번호 변경하기
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={12}>
							<ControlInput
								fullWidth={true}
								register={register}
								type={'password'}
								name='password'
								label='password'
								placeholder='새 비밀번호'
								helper='영문, 숫자, 특수문자를 포함하여 8글자 이상 입력해주세요.'
								control={control}
								startAdornment={<VariantIcon />}
								startAdornmentFocused={<VariantIcon stroke={theme.palette.main.gray10} />}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlInput
								fullWidth={true}
								register={register}
								type={'password'}
								name='confirmPassword'
								label='password'
								placeholder='새 비밀번호 확인'
								helper='비밀번호를 힌번 더 입력해주세요.'
								control={control}
								startAdornment={<VariantIcon />}
								startAdornmentFocused={<VariantIcon stroke={theme.palette.main.gray10} />}
							/>
						</Grid>
					</Grid>
					<ButtonCustom
						title='비밀번호 변경하기'
						cate='primary'
						isLoading={false}
						sx={{ width: '100%', marginTop: convertToRem(24) }}
						disabled={!isDirty}
					/>
				</form>
				<Box className={styles.register_wrapper} sx={{ marginBottom: '1.5rem' }}>
					{/* <Typography cate="caption_1" color={theme.palette.main.gray40}>
            아직 회원이 아니신가요?
          </Typography>
          <Link href="/signup">
            <Typography
              cate="caption_1"
              color={theme.palette.main.gray10}
              sx={{ cursor: 'pointer' }}
            >
              회원가입
            </Typography>
          </Link> */}
				</Box>
			</Box>
			<AlertPopup
				onSubmit={() => {
					setShowError(false);
					setErrorMessage('');
					if (resetPasswordSuccess) {
						router.push('/signin');
					}
				}}
				submitTitle='확인'
				description={errorMessage}
				open={showError}
			/>
		</>
	);
};

export default ResetPassword;
