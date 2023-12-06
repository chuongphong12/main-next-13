import {
	Dialog,
	DialogContent,
	useTheme,
	Divider,
	Box,
	Avatar,
	Grid,
} from '@mui/material';
import styles from './styles.module.scss';
import { ReportPopupProps } from './ReportPopup.type';
import Typography from '@/elements/Typography';
import Checkbox from '@/elements/Checkbox';
import Button from '@/elements/Button';
import { useState } from 'react';
import Input from '@/elements/CustomInput';
import { convertToRem } from '@/utils/convert-to-rem';
const reasonList = [
	'영리목적/홍보성',
	'개인정보 노출',
	'불법정보',
	'음란성/선정성',
	'욕설/인신공격',
	'아이디/DB거래',
	'같은 내용 반복(도배)',
	'기타',
];
export default function ReportPopup({
	title,
	description,
	onSubmit,
	onCancel,
	submitTitle,
	cancelTitle,
	type = 'dark',
	onClose,
	...props
}: ReportPopupProps) {
	const theme = useTheme();
	const [checkedList, setCheckedList] = useState<number[]>([]);
	const handleClose = (
		event: React.MouseEvent<HTMLElement>,
		reason: 'backdropClick' | 'escapeKeyDown'
	) => {
		if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
			event.preventDefault();
			return;
		} else {
			if (onCancel) {
				onCancel();
			} else if (onSubmit) {
				onSubmit();
			}
		}
	};

	const setCheckItem = (value: number) => {
		if (checkedList.includes(value)) {
			let newCheckedList = [...checkedList].filter((i) => i !== value);
			setCheckedList(newCheckedList);
		} else {
			let newCheckedList = [...checkedList];
			newCheckedList.push(value);
			setCheckedList(newCheckedList);
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
						신고 사유를 선택해주세요.
					</Typography>

					<Box
						display={'flex'}
						flexDirection='column'
						alignItems='flex-start'
						width={'100%'}
						my={5}>
						<Grid container spacing={2} mb={3}>
							{reasonList?.map((item: string, index: number) => (
								<Grid item xs={12} md={6} key={index}>
									<Checkbox
										label={item}
										onChange={() => {
											setCheckItem(index);
										}}
									/>
								</Grid>
							))}
						</Grid>
						<Typography
							cate='body_2_semibold'
							color={theme.palette.main.gray10}
							mb={1}
							mt={3}>
							신고 사유 작성(선택)
						</Typography>
						<Input
							name='content'
							fullWidth
							multiline
							placeholder='사유를 작성해주세요.'
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
					<Box display={'flex'} alignItems={'center'} width={'100%'}>
						<Button
							fullWidth
							cate={'outline'}
							onClick={onCancel}
							customTitle={
								<Typography color={theme.palette.main.gray20} cate='body_3_semibold'>
									취소
								</Typography>
							}
						/>
						<Button
							sx={{
								marginLeft: '0.5rem',
							}}
							customType={'active'}
							isOnFormPopup
							onClick={onSubmit}
							disabled={checkedList.length === 0}
							cate={'primary'}
							customTitle={<Typography cate='body_3_semibold'>신고하기</Typography>}
							fullWidth
						/>
					</Box>
				</div>
			</DialogContent>
		</Dialog>
	);
}
