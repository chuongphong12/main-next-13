import {
  Box,
  Chip,
  ChipProps,
  GridProps,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import CloseCircleSmIcon from '@/assets/icons/close-circle-sm';
import DownloadIcon from '@/assets/icons/download';
import Typography from '@/elements/Typography';
import { convertToRem } from '@/utils/convert-to-rem';

type SkillTagCustom = GridProps & {
  title?: string;
  onDelete?: any;
};

const Tag = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: '0.8rem 1.5rem',
  border: '1px solid ' + theme.palette.main.gray50,
  color: theme.palette.main.gray30,
  borderRadius: convertToRem(250),
  height: 'auto',
  fontSize: convertToRem(12),
  '.MuiChip-label': {
    padding: 0,
  },
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main.gray70,
  },
}));

const SkillTag = ({ title, onDelete }: SkillTagCustom) => {
  const theme = useTheme();
  return (
    <Box position={'relative'}>
      <Tag
        label={
          <Box display="flex" alignItems={'center'} position="relative">
            <Typography
              cate="caption_1_semibold"
              color={theme.palette.main.gray30}
              textAlign={'center'}
            >
              {title}
            </Typography>
          </Box>
        }
      />
      <IconButton
        onClick={() => {
          onDelete?.();
        }}
        sx={{
          padding: 0,
          position: 'absolute',
          top: -3,
          right: -2,
          backgroundColor: theme.palette.main.gray80,
        }}
      >
        <CloseCircleSmIcon />
      </IconButton>
    </Box>
  );
};
export default SkillTag;
