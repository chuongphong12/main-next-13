'use client';

import CameraUpdate from '@/assets/icons/camera-update';
import CheckIcon from '@/assets/icons/check';
import MailIcon from '@/assets/icons/mail';
import PhoneIcon from '@/assets/icons/phone';
import UserIcon from '@/assets/icons/user';
import VariantIcon from '@/assets/icons/variant';
import { loadingAtom } from '@/atoms/loading';
import { userAtom } from '@/atoms/user';
import AlertPopup from '@/elements/AlertPopup';
import ButtonCustom from '@/elements/Button';
import ControlInput from '@/elements/ControlInput';
import InputPhoneNumber from '@/elements/InputPhoneNumber';
import MenuItem from '@/elements/MenuItem';
import Select from '@/elements/Select';
import Typography from '@/elements/Typography';
import { logout, sendOtp, sendSubEmail, verifyOtp } from '@/services/auth.service';
import { getCountries } from '@/services/country.service';
import { uploadFile } from '@/services/file.service';
import {
	deleteUserProfile,
	getUserProfile,
	updateUserProfile,
} from '@/services/user.service';
import { IResponse } from '@/types/response.types';
import { ICountry, IFile } from '@/types/user.type';
import {
	emailOptionalValidator,
	otpValidator,
	passwordOptionalValidator,
	phoneOptionalValidator,
} from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Divider, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ValidationMode, useForm, useWatch } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import WithdrawPopup from './_components/withdraw-popup';

const UserProfile = () => {
	const theme = useTheme();
	const [user, setUser] = useRecoilState(userAtom);
	const setLoading = useSetRecoilState(loadingAtom);
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [subEmailTouched, setSubEmailTouched] = useState<boolean>(false);
	const [phoneNumberTouched, setPhoneNumberTouched] = useState<boolean>(false);
	const [phoneValidateSuccess, setPhoneValidateSuccess] = useState<boolean>(false);
	const [emailValidateSuccess, setEmailValidateSuccess] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [errorTitle, setErrorTitle] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [countryValue, setCountryValue] = useState<number>(-1);
	const [showWithdrawPopup, setShowWithdrawPopup] = useState<boolean>(false);
	const [seconds, setSeconds] = useState<number>(0);
	const [minutes, setMinutes] = useState<number>(0);
	const [enableResend, setEnableResend] = useState<boolean>(false);
	const [isOtpSubmitValid, setIsOtpSubmitValid] = useState<boolean | null>(null);
	const [enableOtpVerification, setEnableOtpVerification] = useState<boolean>(false);
	const [isResendOtp, setIsResendOtp] = useState<boolean>(false);
	const [endedCountdown, setEndedCountdown] = useState<boolean>(false);
	const inputFile = useRef<any>(null);
	const [uploadedImage, setUploadedImage] = useState<IFile | null>();
	const mdUp = useMediaQuery('(min-width: 768px)');
	const xsDown = useMediaQuery('(max-width: 375px)');

	useEffect(() => {
		setValue('nickname', user?.nickname);
		setValue('email', user?.email);
		setValue('subEmail', user?.subEmail || '');
		setValue('phoneNumber', user?.phoneNumber || '');
		setCountryValue(user?.country?.id || -1);
	}, [user]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getUserProfile();
			setUser(data);
		};
		fetchData().catch(console.error);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}

			if (seconds === 0) {
				if (minutes === 0) {
					setEnableResend(true);
					if (endedCountdown) {
						setIsResendOtp(true);
					}
					setEndedCountdown(true);
					clearInterval(interval);
				} else {
					setSeconds(59);
					setMinutes(minutes - 1);
				}
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [seconds]);

	const updateCountry = async (event: any) => {
		setCountryValue(event.target.value);
		setLoading(true);
		const updateData = {
			countryId:
				user?.country?.id !== event.target.value && event.target.value !== -1
					? event.target.value
					: undefined,
		};
		const { data, error } = await updateUserProfile(updateData);
		if (data && !error) {
			setUser(data.data);
			enqueueSnackbar('회원정보가 변경되었습니다', {
				variant: 'success',
			});
			setLoading(false);
		} else {
			setLoading(false);
			setShowError(true);
			setErrorMessage(error?.message);
		}
	};

	const breadcrumbData = [{ name: '마이페이지' }, { name: '회원정보' }];
	const schema = yup
		.object({
			nickname: yup.string().required('이름을 입력해주세요.'),
			subEmail: yup
				.string()
				.test('subEmail', '이메일 형식을 확인해주세요', (value?: string) =>
					emailOptionalValidator(value)
				),
			password: yup
				.string()
				.test(
					'password',
					'영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요.',
					(value?: string) => passwordOptionalValidator(value)
				),
			newPassword: yup
				.string()
				.trim()
				.test(
					'newPassword',
					'영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요.',
					(value?: string) => passwordOptionalValidator(value)
				),
			confirmPassword: yup
				.string()
				.trim()
				.test(
					'confirmPassword',
					'영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요.',
					(value?: string) => passwordOptionalValidator(value)
				)
				.oneOf(
					[yup.ref('newPassword')],
					'비밀번호가 일치하지 않습니다. 확인 후 다시 시도해주세요'
				),
			phoneNumber: yup
				.string()
				.trim()
				.test('phoneNumber', '전화번호 형식에 맞지 않습니다.', (value?: string) =>
					phoneOptionalValidator(value)
				),
			email: yup.string().trim(),
			otp: yup.string().trim(),
		})
		.required();

	const defaultValues: {
		nickname: string;
		password: string;
		newPassword: string;
		confirmPassword: string;
		subEmail: string;
		phoneNumber: string;
		email?: string;
		otp?: string;
	} = {
		nickname: '',
		password: '',
		newPassword: '',
		confirmPassword: '',
		subEmail: '',
		phoneNumber: '',
		email: '',
		otp: '',
	};

	const formOptions = {
		defaultValues,
		resolver: yupResolver(schema),
		mode: 'onChange' as keyof ValidationMode,
	};
	const {
		handleSubmit,
		formState,
		getValues,
		control,
		register,
		setValue,
		reset,
		setError,
	} = useForm(formOptions);
	const { isValid, errors } = formState;

	const { data: countryResponse, isLoading } = useQuery<IResponse, Error>({
		queryKey: ['country-list'],
		queryFn: () => getCountries(),
		retry: false,
		enabled: true,
	});

	useEffect(() => {
		setCountries(!!countryResponse?.data?.data ? countryResponse?.data?.data : []);
	}, [countryResponse]);
	// const [user, setUser] = useContext(UserContext) as any;
	const router = useRouter();

	const onSubmit = async (dataSubmit: any) => {
		setLoading(true);
		const updateData = {
			nickname: dataSubmit.nickname,
			avatarId: !!uploadedImage ? uploadedImage.id : undefined,
			oldPassword:
				!!dataSubmit.password && !!dataSubmit.confirmPassword
					? dataSubmit.password
					: undefined,
			password:
				!!dataSubmit.password && !!dataSubmit.confirmPassword
					? dataSubmit.confirmPassword
					: undefined,
		};
		const { data, error } = await updateUserProfile(updateData);
		if (data && !error) {
			reset();
			setUser(data.data);
			enqueueSnackbar('회원정보가 변경되었습니다', {
				variant: 'success',
			});
			setLoading(false);
		} else {
			setLoading(false);
			setShowError(true);
			setErrorMessage(error?.message);
		}
	};

	const onSubEmailChange = (event: any) => {
		if (event.keyCode === 13 || event.keyCode === 176) {
			event.preventDefault();
		}
		setSubEmailTouched(true);
		setEmailValidateSuccess(false);
	};

	const onPhoneNumberChange = (event: any) => {
		if (event.keyCode === 13 || event.keyCode === 176) {
			event.preventDefault();
		}
		setPhoneNumberTouched(true);
		setPhoneValidateSuccess(false);
		setEnableResend(true);
	};

	const validateSubEmail = async () => {
		const subEmailValue = getValues('subEmail');
		const { data, error } = await sendSubEmail(subEmailValue ?? '');
		if (!error) {
			setEmailValidateSuccess(true);
			setSubEmailTouched(false);
			enqueueSnackbar('인증을 위해 이메일이 발송되었습니다.', {
				variant: 'info',
			});
		} else {
			setError('subEmail', { type: 'custom', message: error.message });
		}
	};

	const validatePhoneNumber = async () => {
		setLoading(true);
		const subPhoneNumberValue = getValues('phoneNumber')?.split('-')?.join('') || '';
		const { data, error } = await sendOtp(subPhoneNumberValue);
		if (!error) {
			setPhoneValidateSuccess(true);
			setPhoneNumberTouched(false);
			setSeconds(59);
			setMinutes(2);
			setValue('otp', '');
			setIsOtpSubmitValid(null);
			setLoading(false);
			setEnableResend(false);
		} else {
			setLoading(false);
			setShowError(true);
			setErrorMessage(error?.message);
		}
	};

	const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		if (!event?.target?.files) {
			setLoading(false);
			return;
		}
		const { data, error } = await uploadFile(event?.target?.files[0]);
		if (data && !error) {
			setUploadedImage(data.data);
			setLoading(false);
		} else {
			enqueueSnackbar('Upload avatar failed', {
				variant: 'error',
			});
			setLoading(false);
		}
	};

	const handleWithdraw = async () => {
		setLoading(true);
		const { data, error } = await deleteUserProfile();
		if (data && !error) {
			setShowError(true);
			setErrorMessage('탈퇴가 완료되었습니다.');
		} else {
			setShowError(true);
			setErrorMessage('이용 중인 이용권이 존재하여 탈퇴를 진행할 수 없습니다.');
			setErrorTitle('탈퇴를 진행하고 싶으신 경우, 고객센터에 문의해주세요.');
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setShowWithdrawPopup(false);
	};

	const otp = useWatch({
		control,
		name: 'otp',
	});

	const phoneNumber = useWatch({
		control,
		name: 'phoneNumber',
	});

	const subEmail = useWatch({
		control,
		name: 'subEmail',
	});

	useEffect(() => {
		setIsOtpSubmitValid(null);
		if (otpValidator(otp)) {
			setEnableOtpVerification(true);
		} else {
			setEnableOtpVerification(false);
		}
	}, [otp]);

	const validateOtp = async () => {
		setLoading(true);

		let otp = getValues('otp');
		const { data, error } = await verifyOtp(otp ?? '');
		if (!data && error) {
			if (error.message === '인증번호가 일치하지 않습니다.') {
				setError('otp', { type: 'custom', message: error.message });
			} else {
				setShowError(true);
				setErrorMessage(error?.message);
			}
			setIsOtpSubmitValid(false);
			setIsResendOtp(true);
			setEnableResend(true);
			setLoading(false);
		} else {
			setLoading(false);
			setEnableResend(true);
			setSeconds(0);
			setMinutes(0);
			setEnableOtpVerification(false);
			setIsOtpSubmitValid(true);
		}
	};

	const alertHandleClose = async () => {
		setShowError(false);
		setErrorMessage('');
		if (errorMessage === '탈퇴가 완료되었습니다.') {
			await logout();
		}
	};

	return (
		<>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate='large_title' mt={4.5} mb={5}>
				회원정보
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					alignItems={'center'}
					justifyContent={'center'}
					flexDirection={'column'}
					display={'flex'}>
					<Box
						sx={{
							width: '10rem',
							height: '10rem',
							position: 'relative',
							cursor: 'pointer',
						}}
						onClick={() => {
							inputFile?.current?.click();
						}}>
						<input
							type='file'
							id='file'
							accept='.png,.PNG'
							onChange={uploadAvatar}
							ref={inputFile}
							style={{ display: 'none' }}
						/>

						<Avatar
							sx={{ width: '10rem', height: '10rem' }}
							src={
								!!uploadedImage
									? uploadedImage.url
									: !!user?.avatar?.url
									? user?.avatar?.url
									: '/images/blank-user.png'
							}
						/>
						<Box position={'absolute'} bottom={0} right={0}>
							<CameraUpdate />
						</Box>
					</Box>
					<ControlInput
						type='text'
						name='nickname'
						label='name'
						onKeyDown={(event) => {
							if (event.keyCode === 13 || event.keyCode === 176) {
								event.preventDefault();
							}
						}}
						inputProps={{
							style: {
								textAlign: 'center',
							},
							maxLength: 12,
						}}
						sx={{
							marginTop: '1.5rem',
							width: '20rem',
						}}
						control={control}
						startAdornment={<UserIcon stroke={theme.palette.main.gray30} />}
						startAdornmentFocused={<UserIcon stroke={theme.palette.main.gray10} />}
					/>

					<Grid container spacing={3} mt={7}>
						<Grid item xs={12} lg={6}>
							<Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
								이메일(아이디)
							</Typography>
							<ControlInput
								fullWidth
								type='text'
								name='email'
								label='email'
								onKeyDown={(event) => {
									if (event.keyCode === 13 || event.keyCode === 176) {
										event.preventDefault();
									}
								}}
								control={control}
								disabled
								startAdornment={<MailIcon stroke={theme.palette.main.gray30} />}
								startAdornmentFocused={<MailIcon stroke={theme.palette.main.gray30} />}
							/>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
								보조 이메일
							</Typography>
							<Grid container spacing={1} display={'flex'} alignItems={'center'}>
								<Grid item xs={12} md={9}>
									<ControlInput
										register={register}
										fullWidth
										type='text'
										name='subEmail'
										label='subEmail'
										control={control}
										placeholder='보조 이메일을 입력해주세요'
										onKeyDown={onSubEmailChange}
										isSuccess={emailValidateSuccess}
										startAdornment={<MailIcon stroke={theme.palette.main.gray30} />}
										startAdornmentFocused={
											<MailIcon stroke={theme.palette.main.gray10} />
										}
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<ButtonCustom
										fullWidth
										title='이메일 인증'
										cate='outline'
										customType='active'
										isLoading={false}
										customSize='md'
										onClick={validateSubEmail}
										isNonSubmit={true}
										disabled={
											!!errors.subEmail ||
											!subEmailTouched ||
											(!!subEmailTouched && !subEmail)
										}
									/>
									{!!errors.subEmail && mdUp && (
										<Typography
											cate={'caption_2'}
											mt={1}
											color={theme.palette.main.gray90}>
											error
										</Typography>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Divider
						sx={{
							marginY: '1.5rem',
							width: '100%',
						}}
					/>
					<Grid container spacing={3}>
						<Grid item xs={12} lg={6}>
							<Box
								mb={1}
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}>
								<Typography cate='body_3' color={theme.palette.main.gray10}>
									비밀번호
								</Typography>
								<Typography cate='body_3' color={theme.palette.main.gray30}>
									{!!user?.lastChangedPasswordAt ? '최종 변경일' : '가입일'} :{' '}
									{moment(user?.lastChangedPasswordAt || user?.createdAt).format(
										'YYYY.MM.DD'
									)}
								</Typography>
							</Box>
							<ControlInput
								register={register}
								fullWidth
								type='password'
								name='password'
								onKeyDown={(event) => {
									if (event.keyCode === 13 || event.keyCode === 176) {
										event.preventDefault();
									}
								}}
								label='password'
								control={control}
								placeholder='현재 비밀번호'
								startAdornment={<VariantIcon />}
								startAdornmentFocused={<VariantIcon stroke={theme.palette.main.gray10} />}
							/>
							<ControlInput
								register={register}
								fullWidth
								type='password'
								name='newPassword'
								onKeyDown={(event) => {
									if (event.keyCode === 13 || event.keyCode === 176) {
										event.preventDefault();
									}
								}}
								sx={{
									marginTop: '0.5rem',
								}}
								label='newPassword'
								control={control}
								placeholder='새 비밀번호'
								startAdornment={<VariantIcon />}
								startAdornmentFocused={<VariantIcon stroke={theme.palette.main.gray10} />}
							/>
							<ControlInput
								register={register}
								fullWidth
								sx={{
									marginTop: '0.5rem',
								}}
								type='password'
								name='confirmPassword'
								onKeyDown={(event) => {
									if (event.keyCode === 13 || event.keyCode === 176) {
										event.preventDefault();
									}
								}}
								label='confirmPassword'
								control={control}
								placeholder='새 비밀번호 확인'
								startAdornment={<VariantIcon />}
								startAdornmentFocused={<VariantIcon stroke={theme.palette.main.gray10} />}
							/>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
								휴대폰 번호
							</Typography>
							<Grid container spacing={1} display={'flex'} alignItems={'center'}>
								<Grid item xs={12} md={9}>
									<InputPhoneNumber
										register={register}
										type='tel'
										name='phoneNumber'
										control={control}
										onKeyDown={onPhoneNumberChange}
										placeholder="'-'를 제외한 11자리 숫자"
										isSuccess={phoneValidateSuccess}
										startAdornment={<PhoneIcon stroke={theme.palette.main.gray30} />}
										startAdornmentFocused={
											<PhoneIcon stroke={theme.palette.main.gray10} />
										}
									/>
									{/* <ControlInput
                    register={register}
                    fullWidth
                    type="text"
                    name="phoneNumber"
                    label="phoneNumber"
                    control={control}
                    startAdornment={
                      <PhoneIcon stroke={theme.palette.main.gray10} />
                    }
                    startAdornmentFocused={
                      <PhoneIcon stroke={theme.palette.main.gray30} />
                    }
                  /> */}
								</Grid>
								<Grid item xs={12} md={3}>
									<ButtonCustom
										fullWidth
										title={isResendOtp ? '재발송' : '인증번호 전송'}
										cate='outline'
										customType='active'
										isLoading={false}
										onClick={validatePhoneNumber}
										isNonSubmit={true}
										customSize='md'
										disabled={
											!!errors.phoneNumber ||
											!phoneNumberTouched ||
											(!!phoneNumberTouched && !phoneNumber) ||
											!enableResend
										}
									/>
									{!!errors.phoneNumber && mdUp && (
										<Typography
											cate={'caption_2'}
											mt={1}
											color={theme.palette.main.gray90}>
											error
										</Typography>
									)}
								</Grid>
							</Grid>
							<Grid container spacing={1} display={'flex'} alignItems={'center'} mt={0}>
								<Grid item xs={12} md={9}>
									<ControlInput
										register={register}
										fullWidth
										type='text'
										name='otp'
										label='otp'
										placeholder='인증번호를 입력해주세요.'
										onKeyDown={(event) => {
											if (event.keyCode === 13 || event.keyCode === 176) {
												event.preventDefault();
											}
										}}
										control={control}
										isSuccess={isOtpSubmitValid || false}
										endAdornment={
											<>
												{seconds === 0 && minutes === 0 ? undefined : (
													<Typography cate='body_3' color={theme.palette.main.gray10}>
														{minutes < 10 ? `0${minutes}` : minutes}:
														{seconds < 10 ? `0${seconds}` : seconds}
													</Typography>
												)}
											</>
										}
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<ButtonCustom
										fullWidth
										title='인증번호 확인'
										cate='outline'
										isNonSubmit={true}
										customType='active'
										onClick={validateOtp}
										isLoading={false}
										customSize='md'
										disabled={
											!enableOtpVerification || !!errors.otp || isOtpSubmitValid === true
										}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Divider
						sx={{
							marginY: '1.5rem',
							width: '100%',
						}}
					/>
					<Grid container spacing={3}>
						<Grid item xs={12} lg={6}>
							<Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
								국가
							</Typography>
							<Select
								placeholder='대한민국'
								displayEmpty
								value={countryValue}
								fullWidth
								renderValue={(value) => {
									if (value === -1) {
										return (
											<Typography cate='body_3' color={theme.palette.main.gray30}>
												대한민국
											</Typography>
										);
									}
									return (
										<Box display={'flex'} alignItems={'center'}>
											<Image
												src={countries.find((i) => i.id === value)?.flag || ''}
												width={18}
												height={18}
												alt={''}
											/>
											<Typography cate='body_3' color={theme.palette.main.gray10} ml={2}>
												{countries.find((i) => i.id === value)?.name}
											</Typography>
										</Box>
									);
								}}
								onChange={updateCountry}>
								{countries?.map((i, index) => {
									return (
										<MenuItem value={i.id} key={index}>
											<Image src={i.flag} width={18} height={18} alt={''} />
											<Typography cate='body_3' color={theme.palette.main.gray10} ml={2}>
												{i.name}
											</Typography>
										</MenuItem>
									);
								})}
							</Select>
						</Grid>
					</Grid>
					<Box
						mt={mdUp ? 16 : 4}
						display={'flex'}
						justifyContent='center'
						alignItems='center'
						position={'relative'}
						flexDirection={mdUp ? 'column' : 'column-reverse'}
						sx={{ width: ' 100%' }}>
						<ButtonCustom
							fullWidth={mdUp ? false : true}
							customTitle={
								<Box display={'flex'} alignItems={'center'}>
									<Box mr={1.5} display={'flex'} alignItems={'center'}>
										<CheckIcon stroke={theme.palette.main.primary_light} />
									</Box>
									변경사항 저장
								</Box>
							}
							cate='outline'
							customType='active'
							isLoading={false}
							customSize='md'
							// disabled={!isValid}
						/>
						<Box position={mdUp ? 'absolute' : 'relative'} right={0} mb={mdUp ? 0 : 4}>
							<ButtonCustom
								title='회원탈퇴'
								customSize={'sm'}
								cate='outline'
								isNonSubmit={true}
								rounded
								onClick={() => {
									setShowWithdrawPopup(true);
								}}
								isLoading={false}
								sx={{ width: '100%' }}
							/>
						</Box>
					</Box>
				</Box>
			</form>
			<AlertPopup
				onSubmit={alertHandleClose}
				onClose={alertHandleClose}
				submitTitle='확인'
				description={errorMessage}
				open={showError}
			/>
			<WithdrawPopup
				open={showWithdrawPopup}
				onSubmit={handleWithdraw}
				onCancel={handleCancel}
				disableEscapeKeyDown
			/>
		</>
	);
};

export default UserProfile;
