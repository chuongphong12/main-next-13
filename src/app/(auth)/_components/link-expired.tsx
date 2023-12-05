import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { Grid, IconButton, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import styles from '../styles.module.scss';
import ControlInput from '@/elements/ControlInput';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ButtonCustom from '@/elements/Button';
import Typography from '@/elements/Typography';
import MailLargeIcon from '@/assets/icons/mail-large';
import { convertToRem } from '@/utils/convert-to-rem';
import LinkExpiredIcon from '@/assets/icons/link-expired';

const LinkExpired = ({ onClick, buttonTitle }: any) => {
	const theme = useTheme();
	const router = useRouter();
	const matches = useMediaQuery('(max-width: 576px)');

	return (
		<>
			<Box
				className={styles.sign_in}
				style={{ backgroundColor: theme.palette.main.gray90 }}>
				<Box
					alignItems={'center'}
					justifyContent={'center'}
					display={'flex'}
					borderRadius={'50%'}
					sx={{
						backgroundColor: theme.palette.main.gray70,
						width: convertToRem(120),
						height: convertToRem(120),
					}}>
					<LinkExpiredIcon />
				</Box>
				<Typography
					cate={matches ? 'title_3_semibold' : 'title_2_bold'}
					color={theme.palette.main.gray10}
					my={3}>
					유효기간이 만료된 링크입니다.{' '}
				</Typography>
				<Typography cate='body_2' color={theme.palette.main.gray30} textAlign='center'>
					유효기간이 종료된 링크입니다. 이메일 인증을 다시 시도해주세요
				</Typography>
				<Box mt={6} width={'100%'}>
					<ButtonCustom
						title={buttonTitle || '회원가입 페이지로 이동하기'}
						cate='primary'
						isLoading={false}
						sx={{ width: '100%' }}
						disabled={false}
						onClick={onClick}
					/>
				</Box>
			</Box>
		</>
	);
};

export default LinkExpired;
