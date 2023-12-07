'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import MailIcon from '@/assets/icons/mail';
import { loadingAtom } from '@/atoms/loading';
import AlertPopup from '@/elements/AlertPopup';
import AppLogo from '@/elements/AppLogo';
import ButtonCustom from '@/elements/Button';
import ControlInput from '@/elements/ControlInput';
import Typography from '@/elements/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ValidationMode, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { sendEmailResetPassword } from '@/services/auth.service';
import { convertToRem } from '@/utils/convert-to-rem';
import { emailValidator } from '@/utils/validation';
import * as yup from 'yup';
import styles from '../styles.module.scss';
import ConfirmSendMail from '../_components/confirm-send-email';

const ForgotPassword = () => {
	const theme = useTheme();
	const setLoading = useSetRecoilState(loadingAtom);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const schema = yup
		.object({
			email: yup
				.string()
				.required('이메일을 입력해주세요')
				.test('email', '이메일 형식을 확인해주세요.', (value?: string) =>
					emailValidator(value)
				),
		})
		.required();

	const defaultValues = {
		email: '',
	};

	const formOptions = {
		defaultValues,
		resolver: yupResolver(schema),
	};
	const { handleSubmit, formState, getValues, control, register } = useForm(formOptions);
	const { isDirty, errors } = formState;
	const [sendMailSuccess, setSendMailSuccess] = useState<boolean>(false);
	const [sendMailData, setSendMailData] = useState<{ email: string } | null>();

	const router = useRouter();

	const onSubmit = async (dataSubmit: any) => {
		setLoading(true);

		const { data, error } = await sendEmailResetPassword(dataSubmit);

		if (data && !error) {
			setSendMailSuccess(true);
			setSendMailData(dataSubmit.email);
			setLoading(false);
		} else {
			setLoading(false);
			setShowError(true);
			setErrorMessage(error.message);
		}
	};

	return (
		<>
			{sendMailSuccess ? (
				<ConfirmSendMail
					message={`비밀번호 재설정 메일을 ${sendMailData} 로 보냈어요. \n혹시 이메일이 오지 않았나요? \n스팸함을 확인하거나 다시 받아보세요.`}
					onBack={() => {
						setSendMailSuccess(false);
					}}
					resendTitle='이메일 다시 보내기'
					onResend={() => {
						onSubmit({
							email: sendMailData,
						});
					}}
				/>
			) : (
				<Box
					className={styles.sign_in}
					style={{ backgroundColor: theme.palette.main.gray90 }}>
					<AppLogo />
					<Typography cate='body_2' color={theme.palette.main.gray40}>
						비밀번호 찾기를 위해 이메일을 입력해주세요.
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<ControlInput
							fullWidth={true}
							register={register}
							type='text'
							name='email'
							label='Email'
							placeholder='이메일'
							control={control}
							startAdornment={<MailIcon />}
							startAdornmentFocused={<MailIcon stroke={theme.palette.main.gray10} />}
						/>
						<ButtonCustom
							title='비밀번호 찾기 링크발송'
							cate='primary'
							isLoading={false}
							sx={{ width: '100%', marginTop: convertToRem(24) }}
							disabled={!isDirty}
						/>
					</form>
					<Box className={styles.register_wrapper} sx={{ marginBottom: '1.5rem' }}>
						<Typography cate='caption_1' color={theme.palette.main.gray40}>
							아직 회원이 아니신가요?
						</Typography>
						<Link href='/signup'>
							<Typography
								cate='caption_1'
								color={theme.palette.main.gray10}
								sx={{ cursor: 'pointer' }}>
								회원가입
							</Typography>
						</Link>
					</Box>
				</Box>
			)}
			<AlertPopup
				onSubmit={() => {
					setShowError(false);
					setErrorMessage('');
				}}
				submitTitle='확인'
				description={errorMessage}
				open={showError}
			/>
		</>
	);
};

export default ForgotPassword;
