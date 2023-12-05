import { Dialog, Button, DialogContent, useTheme, Divider } from '@mui/material';
import styles from './alert-popup.module.scss';
import { AlertPopupProps, PopupThemeType } from './alert-popup.type';
import Typography from '@/elements/Typography';
export default function AlertPopup({
	title,
	description,
	onSubmit,
	onCancel,
	submitTitle,
	cancelTitle,
	type = 'default',
	onClose,
	...props
}: AlertPopupProps) {
	const theme = useTheme();
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
						cate='subtitle_1_semibold'
						color={
							type === 'dark' ? theme.palette.main.gray10 : theme.palette.main.gray90
						}
						className={`${styles.title}`}>
						{title}
					</Typography>
					<Typography
						cate='body_3'
						color={
							type === 'dark' ? theme.palette.main.gray10 : theme.palette.main.gray40
						}
						className={`${styles.description}`}>
						{description}
					</Typography>
				</div>
				<div className={`${styles.action_wrapper}`}>
					{(cancelTitle !== undefined || onCancel !== undefined) && (
						<Button onClick={onCancel}>
							<Typography
								cate='button_2_semibold'
								color={
									type === 'dark' ? theme.palette.main.gray40 : theme.palette.main.gray40
								}>
								{cancelTitle || '확인'}
							</Typography>
						</Button>
					)}
					<Divider
						orientation={'vertical'}
						sx={{
							height: '100%',
							width: '1px',
							borderColor:
								type === 'dark' ? theme.palette.main.gray80 : 'rgba(0, 0, 0, 0.20)',
						}}
					/>
					{(submitTitle !== undefined || onSubmit !== undefined) && (
						<Button onClick={onSubmit}>
							<Typography
								cate='button_2_semibold'
								color={
									type === 'dark'
										? theme.palette.main.primary_light
										: theme.palette.main.primary
								}>
								{submitTitle || '확인'}
							</Typography>
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
