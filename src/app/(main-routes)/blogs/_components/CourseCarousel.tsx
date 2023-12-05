import { useRef, useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
import {
  Box,
  IconButton,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from 'assets/icons/chevron-left';
import ChevronRightIcon from 'assets/icons/chevron-right';
import ResizeImage from 'components/ResizeImage';
import Typography from 'elements/Typography';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { convertToRem } from 'utils/convert-to-rem';
import { IBlog } from 'types/blog.type';
import { IFile } from 'types/user.type';

type CourseCarouselType = {
  item?: IBlog;
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 992, min: 576 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 5,
  },
};

function CourseCarousel({ item }: CourseCarouselType) {
  const [currentItem, setCurrentItem] = useState(1);
  const mdDown = useMediaQuery('(max-width: 768px)');
  const theme = useTheme();
  const carouselRef = useRef<Carousel>(null);

  return (
    <>
      <Carousel
        // autoPlay={true}
        ref={carouselRef}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        // infiniteLoop={true}
        showArrows={mdDown ? false : true}
        onChange={(current) => {
          setCurrentItem(Number(current) + 1);
        }}
        renderArrowNext={(clickHandler) => (
          <IconButton
            sx={{
              width: '3.3rem',
              height: '3.3rem',
              borderRadius: convertToRem(250),
              backgroundColor: theme.palette.main.gray60,
              alignItems: 'center',
              justifyContent: 'center',
              display: mdDown ? 'none' : 'flex',
              position: 'absolute',
              zIndex: 5,
              top: '50%',
              right: 0,
            }}
            onClick={clickHandler}
          >
            <ChevronRightIcon stroke={theme.palette.main.gray10} />
          </IconButton>
        )}
        renderArrowPrev={(clickHandler) => (
          <IconButton
            sx={{
              width: '3.3rem',
              height: '3.3rem',
              borderRadius: convertToRem(250),
              backgroundColor: theme.palette.main.gray60,
              alignItems: 'center',
              justifyContent: 'center',
              display: mdDown ? 'none' : 'flex',
              position: 'absolute',
              zIndex: 5,
              top: '50%',
              left: 0,
            }}
            onClick={clickHandler}
          >
            <ChevronLeftIcon stroke={theme.palette.main.gray10} />
          </IconButton>
        )}
      >
        {item?.images.map((i, index) => (
          <Item key={i.id} item={i} isCurrent={index === currentItem - 1} />
        ))}
      </Carousel>
      <LinearProgress
        variant="determinate"
        sx={{
          background: theme.palette.main.gray80,
          height: '0.5rem',
          '.MuiLinearProgress-barColorPrimary': {
            background: theme.palette.main.danger,
          },
        }}
        value={(currentItem / (item?.images?.length || 1)) * 100}
      />
      <Box
        display="flex"
        justifyContent={mdDown ? 'space-between' : 'center'}
        mt={3}
        width={'100%'}
      >
        {mdDown && (
          <IconButton
            onClick={() => {
              carouselRef?.current?.onClickPrev();
            }}
            sx={{
              width: '3.3rem',
              height: '3.3rem',
              borderRadius: convertToRem(250),
              backgroundColor: theme.palette.main.gray60,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <ChevronLeftIcon stroke={theme.palette.main.gray10} />
          </IconButton>
        )}

        <Typography color={theme.palette.main.gray30} cate="body_2_semibold">
          {currentItem}/{item?.images?.length || 1}
        </Typography>
        {mdDown && (
          <IconButton
            onClick={() => {
              carouselRef?.current?.onClickNext();
            }}
            sx={{
              width: '3.3rem',
              height: '3.3rem',
              borderRadius: convertToRem(250),
              backgroundColor: theme.palette.main.gray60,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <ChevronRightIcon stroke={theme.palette.main.gray10} />
          </IconButton>
        )}
      </Box>
    </>
  );
}

function Item({ item, isCurrent }: { isCurrent: boolean; item: IFile }) {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        opacity: isCurrent ? 1 : 0,
      }}
    >
      <ResizeImage src={item.url} placeholderSrc={item.url} />
    </Box>
  );
}

export default CourseCarousel;
