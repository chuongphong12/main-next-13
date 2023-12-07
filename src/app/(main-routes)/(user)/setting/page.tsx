'use client';

import CheckIcon from '@/assets/icons/check';
import CheckRoundFilledIcon from '@/assets/icons/check-round-filled';
import MoonIcon from '@/assets/icons/moon';
import SunIcon from '@/assets/icons/sun';
import { loadingAtom } from '@/atoms/loading';
import { userAtom } from '@/atoms/user';
import AlertPopup from '@/elements/AlertPopup';
import ButtonCustom from '@/elements/Button';
import Checkbox from '@/elements/Checkbox';
import MenuItem from '@/elements/MenuItem';
import Select from '@/elements/Select';
import Typography from '@/elements/Typography';
import { ColorModeContext } from '@/libs/ThemeRegistry';
import { logoutOtherDevices } from '@/services/auth.service';
import { updateUserProfile } from '@/services/user.service';
import WebInfoService from '@/services/web-info.service';
import { convertToRem } from '@/utils/convert-to-rem';
import { Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface NotificationType {
	email: boolean;
	sms: boolean;
}

const Setting = () => {
	const theme = useTheme();
	const breadcrumbData = [{ name: '마이페이지' }, { name: '환경설정' }];
	const setLoading = useSetRecoilState(loadingAtom);
	const [languageValue, setLanguageValue] = useState('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined);
	const [showError, setShowError] = useState<boolean>(false);
	const [checkboxValues, setCheckboxValues] = useState<NotificationType>({
		email: false,
		sms: false,
	});
	const { i18n } = useTranslation();
	const [user, setUser] = useRecoilState(userAtom);
	const [checkAllValue, setCheckAllValue] = useState<boolean>(false);
	const mdUp = useMediaQuery('(min-width: 768px)');
	useEffect(() => {
		setCheckboxValues({
			email: user?.isReceiveEventEmail || false,
			sms: user?.isReceiveEventPhone || false,
		});
		setLayoutMode(user?.isDarkMode ? 'dark' : 'light');
		setLanguageValue(user?.language || 'kr');
		if (user?.isReceiveEventEmail && user.isReceiveEventPhone) {
			setCheckAllValue(true);
		}
	}, [user]);

	const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark');

	const handleCheckboxGroup = (label: string) => {
		if (label === 'all') {
			if (checkboxValues.email === true && checkboxValues.sms === true) {
				let newCheckBoxGroup = { ...checkboxValues };
				newCheckBoxGroup.email = false;
				newCheckBoxGroup.sms = false;
				setCheckAllValue(false);
				setCheckboxValues(newCheckBoxGroup);
			} else {
				let newCheckBoxGroup = { ...checkboxValues };
				newCheckBoxGroup.email = true;
				newCheckBoxGroup.sms = true;
				setCheckAllValue(true);
				setCheckboxValues(newCheckBoxGroup);
			}
		} else {
			let newCheckBoxGroup = { ...checkboxValues };
			newCheckBoxGroup[label as keyof typeof checkboxValues] =
				!checkboxValues[label as keyof typeof checkboxValues];
			if (newCheckBoxGroup.email === true && newCheckBoxGroup.sms === true) {
				setCheckAllValue(true);
			} else {
				setCheckAllValue(false);
			}
			setCheckboxValues(newCheckBoxGroup);
		}
	};
	const colorMode = useContext(ColorModeContext);

	const handleLayoutMode = (mode: 'dark' | 'light') => {
		setLayoutMode(mode);
	};
	const submitSetting = async () => {
		setLoading(true);

		const updateData = {
			isDarkMode:
				(layoutMode === 'dark') !== user?.isDarkMode ? layoutMode === 'dark' : undefined,
			language: languageValue,
			isReceiveEventEmail: checkboxValues.email,
			isReceiveEventPhone: checkboxValues.sms,
		};

		const { data, error } = await updateUserProfile(updateData);
		if (data && !error) {
			if ((layoutMode === 'dark') !== user?.isDarkMode) {
				colorMode.toggleColorMode(layoutMode);
			}

			if (languageValue !== user?.language) {
				i18n.changeLanguage(languageValue);
				WebInfoService.setLanguage(languageValue);
			}
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

	const handleLogoutAll = async () => {
		const { data, error } = await logoutOtherDevices();
		if (data && !error) {
			enqueueSnackbar('Logout success', {
				variant: 'success',
			});
		} else {
			setShowError(true);
			setErrorMessage(error?.message);
		}
	};
	return (
		<>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			<Typography cate='large_title' mt={4.5} mb={5}>
				환경설정
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} lg={8} xl={6}>
					<Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
						언어
					</Typography>
					<Select
						placeholder='한국어'
						displayEmpty
						value={languageValue}
						fullWidth
						renderValue={(value) => {
							return (
								<Typography cate='body_3' color={theme.palette.main.gray10}>
									{value === 'en' ? '영어' : '한국어'}
								</Typography>
							);
						}}
						onChange={(event: any) => {
							setLanguageValue(event.target.value);
						}}>
						<MenuItem value={'en'}>영어</MenuItem>
						<MenuItem value={'kr'}>한국어</MenuItem>
					</Select>
				</Grid>
			</Grid>

			<Box
				alignItems={'center'}
				justifyContent={'center'}
				flexDirection={'column'}
				display={'flex'}>
				<Grid container spacing={3} mt={2}>
					<Grid item xs={12} lg={8} xl={6}>
						<Typography cate='body_3' color={theme.palette.main.gray10} mb={1}>
							화면테마
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={12} md={6}>
								<Button
									sx={{
										height: convertToRem(56),
										width: '100%',
										backgroundColor: theme.palette.main.gray10,
										borderRadius: '0.5rem',
										padding: '1rem',
										':hover': {
											backgroundColor: theme.palette.main.gray10,
										},
									}}
									onClick={() => {
										handleLayoutMode('light');
									}}>
									<Box
										display={'flex'}
										alignItems={'center'}
										justifyContent={'space-between'}
										width={'100%'}>
										<Box display={'flex'} alignItems='center'>
											{layoutMode === 'light' ? (
												<CheckRoundFilledIcon />
											) : (
												<CheckRoundFilledIcon background={theme.palette.main.gray40} />
											)}
											<Typography
												sx={{ paddingLeft: '1rem' }}
												cate='body_2'
												color={theme.palette.main.gray40}>
												라이트 모드
											</Typography>
										</Box>
										<SunIcon stroke={theme.palette.main.gray50} />
									</Box>
								</Button>
							</Grid>
							<Grid item xs={12} md={6}>
								<Button
									sx={{
										height: convertToRem(56),
										width: '100%',
										backgroundColor: theme.palette.main.gray70,
										borderRadius: '0.5rem',
										padding: '1rem',
									}}
									onClick={() => {
										handleLayoutMode('dark');
									}}>
									<Box
										display={'flex'}
										alignItems={'center'}
										justifyContent={'space-between'}
										width={'100%'}>
										<Box display={'flex'} alignItems='center'>
											{layoutMode === 'dark' ? (
												<CheckRoundFilledIcon />
											) : (
												<CheckRoundFilledIcon background={theme.palette.main.gray40} />
											)}
											<Typography
												sx={{ paddingLeft: '1rem' }}
												cate='body_2'
												color={theme.palette.main.gray40}>
												다크 모드
											</Typography>
										</Box>
										<MoonIcon stroke={theme.palette.main.gray30} />
									</Box>
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid container spacing={3} mt={2}>
					<Grid item xs={12} md={12}>
						<Box
							alignItems={'center'}
							display={'flex'}
							sx={{
								[theme.breakpoints.down('md')]: {
									justifyContent: 'space-between',
								},
							}}>
							<Typography cate='body_3' color={theme.palette.main.gray10} mr={3}>
								혜택/이벤트 수신 동의
							</Typography>
							<Link href='#' legacyBehavior>
								<Typography
									cate='body_3'
									color={theme.palette.main.primary_light}
									sx={{ cursor: 'pointer' }}>
									약관보기
								</Typography>
							</Link>
						</Box>
					</Grid>
				</Grid>
				<Grid container mt={3.5}>
					<Grid
						item
						xs={12}
						md={3}
						lg={3}
						xl={2}
						sx={{
							[theme.breakpoints.down('md')]: {
								marginBottom: convertToRem(14),
							},
						}}>
						<Box alignItems={'center'} display={'flex'}>
							<Checkbox
								checked={checkAllValue}
								onClick={() => {
									handleCheckboxGroup('all');
								}}
							/>
							<Typography cate='body_3' color={theme.palette.main.gray10} ml={1.5}>
								전체동의
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={3}
						lg={3}
						xl={2}
						sx={{
							[theme.breakpoints.down('md')]: {
								marginBottom: convertToRem(14),
							},
						}}>
						<Box alignItems={'center'} display={'flex'}>
							<Checkbox
								checked={checkboxValues['email']}
								onClick={() => {
									handleCheckboxGroup('email');
								}}
							/>
							<Typography cate='body_3' color={theme.palette.main.gray10} ml={1.5}>
								이메일
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={3} lg={3} xl={2}>
						<Box alignItems={'center'} display={'flex'}>
							<Checkbox
								checked={checkboxValues['sms']}
								onClick={() => {
									handleCheckboxGroup('sms');
								}}
							/>
							<Typography cate='body_3' color={theme.palette.main.gray10} ml={1.5}>
								문자 메세지
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={3} mt={2}>
					<Grid item xs={12} lg={8} xl={6}>
						<Typography cate='body_3' color={theme.palette.main.gray10} mb={2}>
							보안
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={12} md={6}>
								<ButtonCustom
									fullWidth={!mdUp}
									title='모든 기기 로그아웃'
									cate='outline'
									sx={{ padding: '1.12rem 2.5rem' }}
									isLoading={false}
									customSize='md'
									onClick={() => {
										setShowError(true);
										setErrorTitle('모든 기기에서\n로그아웃 하시겠습니까?');
										setErrorMessage(
											'다른 기기에서 편집한 내용이 저장되지 않은 \n경우 사용할 수 없게 됩니다.'
										);
									}}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Box
					mt={mdUp ? 16 : 4}
					display={'flex'}
					justifyContent='center'
					alignItems='center'
					position={'relative'}
					sx={{ width: ' 100%' }}>
					<ButtonCustom
						fullWidth={!mdUp}
						onClick={submitSetting}
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
					/>
				</Box>
			</Box>
			<AlertPopup
				onSubmit={async () => {
					setShowError(false);
					setErrorMessage('');
					setErrorTitle(undefined);
					if (errorTitle) {
						await handleLogoutAll();
					}
				}}
				submitTitle={errorTitle ? '모든기기 로그아웃' : '확인'}
				cancelTitle={errorTitle ? '취소' : undefined}
				onCancel={
					errorTitle
						? () => {
								setShowError(false);
								setErrorMessage('');
								setErrorTitle(undefined);
						  }
						: undefined
				}
				title={errorTitle}
				description={errorMessage}
				open={showError}
			/>
		</>
	);
};

export default Setting;
