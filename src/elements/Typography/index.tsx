import { Typography as MTypography } from '@mui/material';
import styles from './typography.module.scss';
import { TypographyProps } from './typography.type';

const Typography = ({
  children,
  component = 'p',
  cate,
  sx: customSx = {},
  className = '',
  color,
  ...rest
}: TypographyProps) => {
  return (
    <MTypography
      className={`${styles.txt} ${className}`}
      variant={cate as any}
      sx={{
        ...customSx,
        color: color,
      }}
      component={component}
      {...rest}
    >
      {children}
    </MTypography>
  );
};

export default Typography;
