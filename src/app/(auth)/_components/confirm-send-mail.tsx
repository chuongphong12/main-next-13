import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import {
  Button,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import ButtonCustom from 'elements/Button';
import Typography from 'elements/Typography';
import MailLargeIcon from 'assets/icons/mail-large';
import { convertToRem } from 'utils/convert-to-rem';
import styles from '../styles.module.scss';

interface IConfirmSendMail {
  title?: string;
  type?: 'register' | 'resetPassword';
  message?: React.ReactNode;
  resendTitle?: string;
  backTitle?: string;
  onResend?: () => void;
  onBack?: () => void;
}

const ConfirmSendMail = ({
  title,
  message,
  onResend,
  onBack,
  backTitle,
  resendTitle,
}: IConfirmSendMail) => {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width: 576px)');

  return (
    <>
      <Box
        className={styles.sign_in}
        style={{ backgroundColor: theme.palette.main.gray90 }}
      >
        <Box
          alignItems={'center'}
          justifyContent={'center'}
          display={'flex'}
          borderRadius={'50%'}
          sx={{
            backgroundColor: theme.palette.main.gray70,
            width: convertToRem(120),
            height: convertToRem(120),
          }}
        >
          <MailLargeIcon />
        </Box>
        <Typography
          cate={matches ? 'title_3_semibold' : 'title_2_bold'}
          color={theme.palette.main.gray10}
          my={3}
        >
          {title || '이메일을 확인해주세요.'}
        </Typography>
        <Typography
          cate="body_2"
          color={theme.palette.main.gray30}
          textAlign="center"
          sx={{ whiteSpace: 'pre-line' }}
        >
          {message ||
            '비밀번호 재설정 메일을 main@maincontents.com 로 보냈어요. 혹시 이메일이 오지 않았나요? 스팸함을 확인하거나 다시 받아보세요.'}
        </Typography>
        <Box my={6} width={'100%'}>
          <ButtonCustom
            title={resendTitle || '비밀번호 찾기 링크발송'}
            cate="primary"
            isLoading={false}
            sx={{ width: '100%' }}
            disabled={false}
            onClick={onResend}
          />
        </Box>

        <Button onClick={onBack}>
          <Typography
            cate="caption_1"
            color={theme.palette.main.gray40}
            sx={{ cursor: 'pointer' }}
          >
            {backTitle || '이전으로 돌아가기'}
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default ConfirmSendMail;
