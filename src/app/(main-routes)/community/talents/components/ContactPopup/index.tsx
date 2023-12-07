import { loadingAtom } from '@/atoms/loading';
import { userAtom } from '@/atoms/user';
import Button from '@/elements/Button';
import ControlInput from '@/elements/ControlInput';
import InputPhoneNumber from '@/elements/InputPhoneNumber';
import Typography from '@/elements/Typography';
import { ISendContactPool, sendContactPool } from '@/services/pool.service';
import { convertToRem } from '@/utils/convert-to-rem';
import { emailValidator, phoneOptionalValidator } from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Dialog, DialogContent, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { ValidationMode, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import { ContactPopupProps } from './ContactPopup.type';
import ContactTerm from './ContactTerm/ContactTerm';
import styles from './styles.module.scss';
export default function ContactPopup({
	title,
	description,
	onCancel,
	submitTitle,
	id,
	cancelTitle,
	type = 'dark',
	poolData,
	onClose,
	...props
}: ContactPopupProps) {
	const theme = useTheme();
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const user = useRecoilValue(userAtom);
	useEffect(() => {
		setValue('nickname', user?.nickname);
		setValue('email', user?.email);
		setValue('phoneNumber', user?.phoneNumber || '');
	}, [props.open]);

	const schema = yup
		.object({
			nickname: yup.string().required('이름을 입력해주세요.'),
			email: yup
				.string()
				.test('email', '이메일 형식을 확인해주세요', (value?: string) =>
					emailValidator(value)
				),

			phoneNumber: yup
				.string()
				.trim()
				.test('phoneNumber', '전화번호 형식에 맞지 않습니다.', (value?: string) =>
					phoneOptionalValidator(value)
				),
		})
		.required();

	const defaultValues = {
		nickname: '',
		email: '',
		phoneNumber: '',
		message: '',
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
	const setLoading = useSetRecoilState(loadingAtom);
	const [checkedTerm, setCheckedTerm] = useState<boolean>(false);
	const onSubmit = async (dataSubmit: any) => {
		setLoading(true);
		const reqData: ISendContactPool = {
			fromNickname: dataSubmit.nickname,
			fromUserEmail: dataSubmit.email,
			fromUserPhoneNumber: dataSubmit.phoneNumber.split('-').join(''),
			message: dataSubmit.message,
		};
		const { data, error } = await sendContactPool(reqData, id);
		if (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
			setLoading(false);
		} else {
			enqueueSnackbar('메일전송이 완료 되었습니다', { variant: 'success' });
			onCancel?.();
			reset();
			setLoading(false);
		}
	};

	const handleClose = (
		event: React.MouseEvent<HTMLElement>,
		reason: 'backdropClick' | 'escapeKeyDown'
	) => {
		if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
			event.preventDefault();
			return;
		} else {
			reset();
			onCancel?.();
		}
	};
	return (
		<Dialog
			onClose={handleClose}
			{...props}
			classes={{
				paper: styles.popup_paper,
				container: styles.popup_container,
				root: styles.popup_root,
			}}>
			<DialogContent
				className={`${styles.popup_wrapper} ${
					type === 'dark' ? styles.dark : styles.light
				}`}>
				<div className={`${styles.content_wrapper}`}>
					<Typography
						cate='title_3_semibold'
						color={
							type === 'dark' ? theme.palette.main.gray10 : theme.palette.main.gray90
						}
						className={`${styles.title}`}>
						연락하기
					</Typography>
					<Typography
						cate='caption_1'
						color={
							type === 'dark' ? theme.palette.main.gray20 : theme.palette.main.gray80
						}
						mt={1}>
						수신자에게 메일을 보냅니다.
					</Typography>
					<Box
						component={'form'}
						sx={{ width: '100%' }}
						onSubmit={handleSubmit(onSubmit)}>
						<Box
							display={'flex'}
							flexDirection='column'
							alignItems='flex-start'
							width={'100%'}
							my={5}>
							<Typography cate='body_2_semibold' color={theme.palette.main.gray10} mb={1}>
								수신자
							</Typography>
							<Box
								sx={{
									height: convertToRem(56),
									width: '100%',
									backgroundColor: theme.palette.main.gray70,
									borderRadius: '0.5rem',
									display: 'flex',
									alignItems: 'center',
									padding: '0.75rem 1rem',
								}}>
								<Avatar
									sx={{ width: '2rem', height: '2rem' }}
									src={
										!!poolData?.user?.avatar?.url
											? poolData?.user?.avatar?.url
											: '/images/blank-user.png'
									}
								/>
								<Typography
									cate='body_3'
									color={theme.palette.main.gray10}
									ml={1.5}
									flexShrink={(poolData?.user?.nickname?.length || 0) > 6 ? 1 : 0}
									sx={
										(poolData?.user?.nickname?.length || 0) > 6
											? {
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													display: '-webkit-box',
													WebkitLineClamp: '1',
													WebkitBoxOrient: 'vertical',
											  }
											: {}
									}>
									{poolData?.user?.nickname}
								</Typography>
								<Typography
									cate='caption_2'
									color={theme.palette.main.gray10}
									ml={1.5}
									sx={{
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										display: '-webkit-box',
										WebkitLineClamp: '1',
										WebkitBoxOrient: 'vertical',
									}}>
									{`(${poolData?.experiences[0]?.undertaking} ${poolData?.experiences[0]?.yearsOfExperience}년차, @${poolData?.projects[0]?.projectOwner} ${poolData?.projects[0]?.projectName})`}
								</Typography>
							</Box>

							<Typography
								cate='body_2_semibold'
								color={theme.palette.main.gray10}
								mb={1}
								mt={3}>
								발신자 정보
							</Typography>
							<Box display={'flex'} mb={1} mt={1}>
								<Typography color={theme.palette.main.danger} cate='title_2_bold'>
									*
								</Typography>
								<Typography cate='subtitle_1_semibold'>성함</Typography>
							</Box>
							<ControlInput
								register={register}
								type='text'
								name='nickname'
								label='nickname'
								onKeyDown={(event) => {
									if (event.keyCode === 13 || event.keyCode === 176) {
										event.preventDefault();
									}
								}}
								autoComplete='off'
								inputProps={{
									autoComplete: 'off',
								}}
								fullWidth
								control={control}
							/>
							<Box display={'flex'} mb={1} mt={3}>
								<Typography color={theme.palette.main.danger} cate='title_2_bold'>
									*
								</Typography>
								<Typography cate='subtitle_1_semibold'>이메일</Typography>
							</Box>
							<ControlInput
								register={register}
								type='text'
								name='email'
								label='email'
								onKeyDown={(event) => {
									if (event.keyCode === 13 || event.keyCode === 176) {
										event.preventDefault();
									}
								}}
								autoComplete='off'
								inputProps={{
									autoComplete: 'off',
								}}
								fullWidth
								control={control}
							/>
							<Box display={'flex'} mb={1} mt={3}>
								<Typography cate='subtitle_1_semibold'>연락처</Typography>
							</Box>
							<InputPhoneNumber
								register={register}
								type='tel'
								name='phoneNumber'
								control={control}
								placeholder="'-'를 제외한 11자리 숫자"
							/>
							<Typography
								cate='body_2_semibold'
								color={theme.palette.main.gray10}
								mb={1}
								mt={3}>
								전달 메세지
							</Typography>
							<ControlInput
								name='message'
								fullWidth
								multiline
								register={register}
								control={control}
								sx={{
									height: convertToRem(128) + ' !important',
									padding: '1rem !important',
									fieldset: {
										padding: '0 !important',
									},
									'.MuiInputAdornment-root': {
										display: 'none',
									},
									'.MuiInputBase-input': {
										overflow: 'auto',
										width: '100%',
										height: '100% !important',
									},
								}}
							/>
						</Box>
						<ContactTerm
							checked={checkedTerm}
							onChange={() => {
								setCheckedTerm((prev) => !prev);
							}}
						/>
						<Box display={'flex'} alignItems={'center'} width={'100%'}>
							<Button
								sx={{ width: convertToRem(120) }}
								cate={'outline'}
								onClick={() => {
									onCancel?.();
									reset();
								}}
								isNonSubmit
								customTitle={
									<Typography color={theme.palette.main.gray20} cate='body_3_semibold'>
										닫기
									</Typography>
								}
							/>
							<Button
								sx={{
									marginLeft: '0.5rem',
								}}
								customType={'active'}
								disabled={!isValid || !checkedTerm}
								cate={'primary'}
								isOnFormPopup
								customTitle={<Typography cate='body_3_semibold'>메일 보내기</Typography>}
								fullWidth
							/>
						</Box>
					</Box>
				</div>
			</DialogContent>
		</Dialog>
	);
}
