import CommentMenuIcon from '@/assets/icons/comment-menu';
import ReportIcon from '@/assets/icons/report';
import TrashIcon from '@/assets/icons/trash';
import AlertPopup from '@/elements/AlertPopup';
import Typography from '@/elements/Typography';
import { convertToRem } from '@/utils/convert-to-rem';
import {
	Box,
	Dialog,
	DialogContent,
	IconButton,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react';
import { useState } from 'react';
import ReportPopup from './ReportPopup';

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		backgroundColor: theme.palette.main.gray80,
		marginTop: theme.spacing(1),
		width: 'auto',
		padding: '0.75rem 0',
		color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'.MuiDialog-container': {
		[theme.breakpoints.down('md')]: {
			alignItems: 'flex-end',
		},
		'.MuiPaper-root': {
			[theme.breakpoints.down('md')]: {
				height: 'auto',
				margin: 0,
				maxWidth: '100%',
				width: '100%',
				borderTopLeftRadius: '1rem',
				borderTopRightRadius: '1rem',
				backgroundColor: theme.palette.main.gray70,
			},
		},
	},
}));
type CommentActionMenuProps = {
	isOwn: boolean;
	handleDelete: any;
	handleReport: any;
};
export default function CommentActionMenu({
	isOwn,
	handleDelete,
	handleReport,
}: CommentActionMenuProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const mdDown = useMediaQuery('(max-width: 768px)');
	const open = Boolean(anchorEl);
	const [bottomMenuOpen, setBottomMenuOpen] = React.useState<boolean>(false);
	const [reportOpen, setReportOpen] = React.useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const theme = useTheme();
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		if (mdDown) {
			setBottomMenuOpen(true);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCloseBottomMenu = () => {
		setBottomMenuOpen(false);
	};

	const report = () => {
		setReportOpen(true);
	};
	const handleRemove = () => {};

	return (
		<div>
			{/* <IconBut
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <CommentMenuIcon />
      </IconBut> */}
			<IconButton
				id='demo-customized-button'
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				<CommentMenuIcon />
			</IconButton>
			<StyledMenu
				id='demo-customized-menu'
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}>
				<MenuItem
					onClick={() => {
						handleClose();
						report();
					}}
					disableRipple
					sx={{ marginBottom: '0.75rem' }}>
					<ReportIcon />
					<Typography cate='caption_1' ml={2}>
						신고하기
					</Typography>
				</MenuItem>
				{isOwn && (
					<MenuItem
						onClick={() => {
							handleClose();
							setShowError(true);
						}}
						disableRipple>
						<TrashIcon />
						<Typography cate='caption_1' ml={2}>
							삭제하기
						</Typography>
					</MenuItem>
				)}
			</StyledMenu>
			<StyledDialog
				open={bottomMenuOpen}
				onClose={handleCloseBottomMenu}
				// onEnter={console.log("Hey.")}
				// classes={{ container: classes.root, paper: classes.paper }}
			>
				<DialogContent>
					<MenuItem
						onClick={() => {
							handleCloseBottomMenu();
							report();
						}}
						disableRipple
						sx={{ marginBottom: '0.75rem' }}>
						<Box
							p={1}
							borderRadius={convertToRem(250)}
							sx={{
								backgroundColor: theme.palette.main.gray50,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<ReportIcon />
						</Box>
						<Typography cate='body_2' ml={2}>
							신고하기
						</Typography>
					</MenuItem>
					{isOwn && (
						<MenuItem
							onClick={() => {
								handleCloseBottomMenu();
								setShowError(true);
							}}
							disableRipple>
							<Box
								p={1}
								borderRadius={convertToRem(250)}
								sx={{
									backgroundColor: theme.palette.main.gray50,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<TrashIcon />
							</Box>
							<Typography cate='body_2' ml={2}>
								삭제하기
							</Typography>
						</MenuItem>
					)}
				</DialogContent>
			</StyledDialog>
			<ReportPopup
				open={reportOpen}
				onSubmit={() => {
					setReportOpen(false);
					enqueueSnackbar('신고가 접수되었습니다.', { variant: 'success' });
				}}
				onClose={() => {
					setReportOpen(false);
				}}
				onCancel={() => {
					setReportOpen(false);
				}}
			/>
			<AlertPopup
				onSubmit={async () => {
					setShowError(false);
					handleDelete();
				}}
				submitTitle={'확인'}
				cancelTitle={'취소'}
				onCancel={() => {
					setShowError(false);
				}}
				description={'댓글을 삭제하시겠습니까?'}
				open={showError}
			/>
		</div>
	);
}
