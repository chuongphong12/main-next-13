'use client';
import MailIcon from '@/assets/icons/mail';
import VariantIcon from '@/assets/icons/variant';
import { loadingAtom } from '@/atoms/loading';
import AlertPopup from '@/elements/AlertPopup';
import AppLogo from '@/elements/AppLogo';
import ButtonCustom from '@/elements/Button';
import Checkbox from '@/elements/Checkbox';
import ControlInput from '@/elements/ControlInput';
import Typography from '@/elements/Typography';
import { signup } from '@/services/auth.service';
import { checkEmailExists } from '@/services/user.service';
import { ISignup } from '@/types/auth.type';
import { emailValidator, passwordValidator } from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import ConfirmSendMail from '../_components/confirm-send-mail';
import styles from '../styles.module.scss';
import TermDropDown from './_components/term-drop-down';

interface SignupProps {
	email: string;
	password: string;
	confirmPassword: string;
}

export const termList = [
	{ id: 1, title: '서비스 이용 동의', required: true },
	{ id: 2, title: '개인정보 수집 동의', required: true },
	{ id: 3, title: '이벤트 / 정보 알림 수신 동의', required: false },
];

const SignUp = () => {
	const theme = useTheme();

	const schema = yup
		.object({
			email: yup
				.string()
				.required('이메일 형식을 확인해주세요')
				.test('email', '이메일 형식을 확인해주세요', (value?: string) =>
					emailValidator(value)
				),
			password: yup
				.string()
				.required('비밀번호를 입력해주세요.')
				.test(
					'password',
					'영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요.',
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
		email: '',
		password: '',
		confirmPassword: '',
	};

	const formOptions = {
		defaultValues,
		resolver: yupResolver(schema),
	};
	const { handleSubmit, formState, control, register, reset, setError } =
		useForm<SignupProps>(formOptions);
	const { isDirty } = formState;
	const [checkedIds, setCheckedIds] = useState<number[]>([]);
	const [termValid, setTermValid] = useState<boolean>(false);
	const [session, setSession] = useState<number | null>();
	const [registeredData, setRegisteredData] = useState<ISignup | null>();
	const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [isReceiveNotification, setIsReceiveNotification] = useState<boolean>(false);

	const setLoading = useSetRecoilState(loadingAtom);
	const router = useRouter();

	const onSubmit = async (dataSubmit: SignupProps | null | undefined): Promise<void> => {
		if (!dataSubmit) return;

		setLoading(true);
		const { data: validateMailData, error: validateMailError } = await checkEmailExists(
			dataSubmit.email
		);

		if (!validateMailError) {
			let dataSignup: ISignup = {
				email: dataSubmit.email,
				password: dataSubmit.password,
				isReceiveEventEmail: isReceiveNotification,
				isReceiveEventPhone: isReceiveNotification,
				sessionId: session,
			};

			const { data, error } = await signup(dataSignup);
			if (!error) {
				setLoading(false);
				setSignupSuccess(true);
				setRegisteredData(dataSubmit);
				setSession(data.data.id);
			} else {
				setLoading(false);
				setShowError(true);
				setErrorMessage(error.message);
			}
		} else {
			setLoading(false);
			setError('email', {
				type: 'custom',
				message: '중복된 이메일 주소입니다. 확인 후 다시 시도 해주세요.',
			});
		}
	};

	const handleCheckAll = () => {
		if (checkedIds.length < termList.length) {
			let newCheckedIds = [...checkedIds];
			termList.forEach((i) => {
				if (!newCheckedIds.includes(i.id)) {
					newCheckedIds.push(i.id);
				}
			});
			setCheckedIds(newCheckedIds);
			setIsReceiveNotification(true);
		} else {
			setCheckedIds([]);
			setIsReceiveNotification(false);
		}
	};
	const handleCheck = (id: number) => {
		if (checkedIds.includes(id)) {
			let newCheckedIds = checkedIds.filter((i) => i !== id);
			setCheckedIds(newCheckedIds);
		} else {
			let newCheckedIds = [...checkedIds];
			newCheckedIds.push(id);
			setCheckedIds(newCheckedIds);
		}
	};

	useEffect(() => {
		if (
			termList.every((i) => {
				if (i.required) {
					return checkedIds.includes(i.id);
				}
				return true;
			})
		) {
			setTermValid(true);
		} else {
			setTermValid(false);
		}
	}, [checkedIds]);

	const email = useWatch({
		control,
		name: 'email',
	});

	const password = useWatch({
		control,
		name: 'password',
	});

	const confirmPassword = useWatch({
		control,
		name: 'confirmPassword',
	});

	return (
		<>
			{signupSuccess ? (
				<ConfirmSendMail
					message={`회원가입을 위한 이메일 인증 링크를 ${registeredData?.email} 로 보냈어요.
        혹시 이메일이 오지 않았나요? 스팸함을 확인하거나 다시 받아보세요.`}
					onBack={() => {
						setSignupSuccess(false);
					}}
					resendTitle='이메일 다시 보내기'
					onResend={() => {
						onSubmit({
							email: registeredData?.email || '',
							password: registeredData?.password || '',
							confirmPassword: registeredData?.password || '',
						});
					}}
				/>
			) : (
				<Box
					className={styles.sign_in}
					style={{ backgroundColor: theme.palette.main.gray90 }}>
					<AppLogo />
					<Typography cate='body_2' color={theme.palette.main.gray40}>
						회원가입
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form_signup}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={12}>
								<ControlInput
									fullWidth={true}
									register={register}
									type='text'
									name='email'
									label='email'
									placeholder='이메일'
									control={control}
									startAdornment={<MailIcon />}
									startAdornmentFocused={<MailIcon stroke={theme.palette.main.gray10} />}
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
									helper={'영문/숫자/특수문자 2가지 이상 포함, 8글자 이상 입력해주세요.'}
									startAdornmentFocused={
										<VariantIcon stroke={theme.palette.main.gray10} />
									}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<ControlInput
									fullWidth={true}
									register={register}
									type={'password'}
									name='confirmPassword'
									label='password'
									placeholder='비밀번호 확인'
									control={control}
									startAdornment={<VariantIcon />}
									startAdornmentFocused={
										<VariantIcon stroke={theme.palette.main.gray10} />
									}
								/>
							</Grid>
						</Grid>
						<Box my={3} px={1.5}>
							<Box alignItems={'center'} display={'flex'} py={1}>
								<Checkbox
									onClick={handleCheckAll}
									checked={checkedIds.length === termList.length}
									rounded
								/>
								<Typography cate='body_2' color={theme.palette.main.gray10} ml={1.5}>
									모두 동의합니다.
								</Typography>
							</Box>
							{termList.map((i) => (
								<TermDropDown
									title={i.title}
									key={i.id}
									onClick={() => {
										handleCheck(i.id);
										if (i.id === 3) {
											setIsReceiveNotification((prev) => !prev);
										}
									}}
									checked={checkedIds.includes(i.id)}
									required={i.required}
								/>
							))}
						</Box>
						<Box mt={3}>
							<ButtonCustom
								title='이메일 인증하기'
								cate='primary'
								isLoading={false}
								sx={{ width: '100%' }}
								disabled={
									!Boolean(email) ||
									!Boolean(password) ||
									!Boolean(confirmPassword) ||
									!termValid
								}
							/>
						</Box>
					</form>
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

export default SignUp;
