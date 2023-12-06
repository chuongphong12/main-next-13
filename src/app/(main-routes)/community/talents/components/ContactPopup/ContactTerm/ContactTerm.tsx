import { Button, IconButton, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import ChevronRightSmIcon from '@/assets/icons/chevron-right-sm';
import Checkbox from '@/elements/Checkbox';
import Typography from '@/elements/Typography';
import { useRef, useState } from 'react';
import { convertToRem } from '@/utils/convert-to-rem';
import styles from './styles.module.scss';

const ContactTerm = ({ onChange, title, checked, content, required }: any) => {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	const handleCheck = () => {
		onChange();
	};

	const htmlString = `<p>네이버 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. <br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.<br />
  네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만,'청소년보호법'등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한</p>`;
	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Box alignItems={'center'} display={'flex'} justifyContent={'space-between'} mt={3}>
				<Box alignItems={'center'} display={'flex'}>
					<Button
						onClick={() => {
							setIsOpen((prev) => !prev);
						}}
						sx={{ padding: 0 }}>
						<Typography
							cate='body_3'
							color={theme.palette.main.gray10}
							sx={{ textDecoration: 'underline' }}>
							개인정보 제공
						</Typography>
					</Button>
					<Typography cate='body_3' color={theme.palette.main.gray10}>
						에 대한 동의
					</Typography>
				</Box>
				<Box alignItems={'center'} display={'flex'} py={1}>
					<Typography cate='body_3' color={theme.palette.main.gray10} mr={1.5}>
						동의
					</Typography>
					<Checkbox checked={checked} onChange={handleCheck} />
				</Box>
			</Box>
			<Box
				mb={5}
				component='div'
				sx={{
					maxHeight: convertToRem(272),
					backgroundColor: theme.palette.main.gray80,
					color: theme.palette.main.gray20,
					padding: '0',
					overflow: 'auto',
					fontFamily: 'Pretendard !important',
					fontSize: '12px',
					fontWeight: 400,
				}}
				className={styles.content_parent}
				ref={contentRef}
				style={
					isOpen && contentRef
						? { height: contentRef?.current?.scrollHeight || 0 + 'px' }
						: { height: '0px' }
				}>
				<Box
					sx={{
						backgroundColor: theme.palette.main.gray80,
						color: theme.palette.main.gray20,
						padding: '1rem',
						overflow: 'auto',
						fontFamily: 'Pretendard !important',
						fontSize: '12px',
						fontWeight: 400,
						img: {
							maxWidth: '100%',
						},
					}}
					dangerouslySetInnerHTML={{ __html: htmlString }}></Box>
			</Box>
			<Box />
		</>
	);
};

export default ContactTerm;
