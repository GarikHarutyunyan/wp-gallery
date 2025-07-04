import Box from '@mui/material/Box';
import {useData} from 'components/data-context/useData';
import {useSettings} from 'components/settings';
import {SwiperGallery} from 'components/swiper-gallery/SwiperGallery';
import {ICubeSettings} from 'data-structures';
import {useEffect, useState} from 'react';
import {Autoplay, EffectCube} from 'swiper/modules';
import './cube-gallery.css';

const effects = {
  id: 2,
  effect: 'cube',
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  modules: [EffectCube, Autoplay],
};

interface ICubeGalleryProps {
  onClick?: (index: number) => void;
}

const CubeGallery = ({onClick}: ICubeGalleryProps) => {
  const {images} = useData();
  const {cubeSettings: settings, wrapperRef} = useSettings();
  const {
    width,
    height,
    isInfinite,
    backgroundColor,
    padding,
    autoplay,
    slideDuration,
    shadow,
  } = settings as ICubeSettings;
  const wrapper = wrapperRef.current;
  const [innerWidth, setInnerWidth] = useState<number>(
    wrapper?.clientWidth * 0.8 || width
  );
  const ratio: number = width / height;
  const containerWidth: number = Math.min(innerWidth, width);
  const containerHeight: number = containerWidth / ratio;

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(wrapper?.clientWidth * 0.8 || width);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [wrapper?.clientWidth]);

  useEffect(() => {
    const cubeShadow = document.querySelector(
      '.swiper-cube .swiper-cube-shadow'
    ) as HTMLElement;

    cubeShadow.style.width = shadow ? '100%' : '0%';
  }, [shadow]);

  return (
    <Box
      sx={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        mx: 'auto',
      }}
    >
      <SwiperGallery
        key={+isInfinite}
        effects={effects}
        loop={isInfinite}
        backgroundColor={backgroundColor || 'White'}
        padding={padding}
        images={images || []}
        autoplay={autoplay}
        delay={slideDuration}
        size={Math.max(containerWidth, containerHeight)}
        imagesCount={1}
        preLoadCount={4}
        allowTouchMove={true}
        onClick={onClick}
      />
    </Box>
  );
};

export {CubeGallery};
export default CubeGallery;
