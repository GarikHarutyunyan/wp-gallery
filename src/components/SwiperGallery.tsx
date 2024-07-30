import IconButton from '@mui/material/IconButton';
import {IImageDTO} from 'data-structures';
import useConfigureSwiper from 'hooks/useConfigureSwiper';
import React, {useEffect, useRef, useState} from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from 'swiper/react';

interface ISwiperGalleryProps {
  images: IImageDTO[];
  backgroundColor: string;
  loop: boolean;
  pagination?: boolean;
  effects: any;
  autoplay: boolean;
  delay: number;
  playAndPouseAllowed?: boolean;
}

const SwiperGallery: React.FC<ISwiperGalleryProps> = ({
  images,
  backgroundColor,
  loop,
  pagination,
  effects,
  autoplay,
  delay,
  playAndPouseAllowed,
}) => {
  // const progressCircle = useRef<SVGSVGElement>(null);
  // const progressContent = useRef<HTMLSpanElement>(null);
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);

  const key = effects.effect + 'Effect';
  useConfigureSwiper(swiperRef, key);

  // const onAutoplayTimeLeft = (swiper: any, time: number, progress: number) => {
  //   if (progressCircle.current && progressContent.current) {
  //     progressCircle.current.style.setProperty(
  //       '--progress',
  //       (1 - progress).toString()
  //     );
  //     progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  //   }
  // };

  // const imgs = [
  //   {
  //     id: '1',
  //     title: 'Hats',

  //     caption: 'Hats',
  //     description: 'description',
  //     original: {
  //       url: 'https://thumbs.dreamstime.com/z/measuring-body-3219817.jpg',
  //       width: 1064,
  //       height: 1000,
  //     },
  //     medium_large: {
  //       url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWUS5p_fhUO_gMfcVSgIzo7C_v3Ugh56l4-zqxk9VGsavr0J3kih55g1xsuLJ_vzhJKmw&usqp=CAU',
  //       width: 626,
  //       height: 500,
  //     },
  //     thumbnail: {
  //       url: 'https://img.freepik.com/free-photo/top-view-blue-pink-arrows_23-2148488441.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1720310400&semt=ais_user',
  //       width: 338,
  //       height: 200,
  //     },

  //     width: 500,
  //     height: 600,
  //   },
  //   {
  //     id: '2',
  //     caption: 'caption',
  //     description: 'description',
  //     original: {
  //       url: 'https://thumbs.dreamstime.com/z/slim-woman-body-white-background-isolated-78974426.jpg',
  //       width: 1067,
  //       height: 1000,
  //     },
  //     medium_large: {
  //       url: 'https://thumbs.dreamstime.com/b/female-became-skinny-wearing-old-jeans-9569097.jpg',
  //       width: 800,
  //       height: 500,
  //     },
  //     thumbnail: {
  //       url: 'https://www.shutterstock.com/image-photo/beautiful-slim-woman-lingerie-female-260nw-496633807.jpg',
  //       width: 173,
  //       height: 200,
  //     },
  //     title: 'Sea star',
  //     width: 500,
  //     height: 600,
  //   },
  //   {
  //     id: '3',
  //     caption: 'caption',
  //     description: 'description',

  //     original: {
  //       url: 'https://st3.depositphotos.com/1814366/12927/i/950/depositphotos_129277518-stock-photo-woman-body-in-white-swimwear.jpg',
  //       width: 1024,
  //       height: 1000,
  //     },
  //     medium_large: {
  //       url: 'https://previews.123rf.com/images/deagreez/deagreez1703/deagreez170300347/74137122-close-up-photo-of-slim-woman-s-body-in-white-lingerie.jpg',
  //       width: 867,
  //       height: 500,
  //     },
  //     thumbnail: {
  //       url: 'https://en.pimg.jp/070/028/979/1/70028979.jpg',
  //       width: 450,
  //       height: 200,
  //     },
  //     title: 'Basketball',
  //     width: 500,
  //     height: 600,
  //   },
  //   {
  //     id: '4',
  //     caption: 'caption',
  //     description: 'description',

  //     original: {
  //       url: 'https://www.ama-assn.org/sites/ama-assn.org/files/styles/related_article_stub_image_1200x800_3_2/public/2023-03/a23-imgs-section-meeting.png?itok=Mpc66Zlm',
  //       width: 1200,
  //       height: 1000,
  //     },
  //     medium_large: {
  //       url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvkaIXWNg0_d_Zvaae_aVyvB-C0sS96M2Ktj97lfraDPRvZpAykv7ggg_gaoeYGZdb8jM&usqp=CAU',
  //       width: 630,
  //       height: 500,
  //     },
  //     thumbnail: {
  //       url: 'https://img.freepik.com/free-vector/nice-forest-animals_23-2147568045.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716595200&semt=ais_user',
  //       width: 338,
  //       height: 200,
  //     },
  //     title: 'Austro',
  //     width: 500,
  //     height: 600,
  //   },
  // ];

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (swiper?.autoplay) {
      swiper.autoplay.stop();
    }
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (autoplay && swiper?.autoplay) {
      swiper.autoplay.start();
    }
    if (!autoplay && swiper?.autoplay) {
      swiper.autoplay.stop();
    }

    if (!autoplay) {
      swiper.autoplay.stop();
    }
  }, [autoplay]);

  const handlePlay = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper?.autoplay) {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper?.autoplay) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      autoplay={{delay, stopOnLastSlide: true}}
      // onAutoplayTimeLeft={onAutoplayTimeLeft}
      grabCursor={true}
      loop={loop}
      pagination={pagination || false}
      slidesPerView={1}
      {...effects}
    >
      {images?.map((image: IImageDTO) => (
        <SwiperSlide key={Math.random()}>
          <img
            src={image.original.url}
            srcSet={`${image.thumbnail.url} ${image.thumbnail.width}w, ${image.medium_large.url} ${image.medium_large.width}w, ${image.original.url} ${image.original.width}w`}
            className={'swiper-lazy'}
            alt={image.title}
            style={{
              background: key === 'cubeEffect' ? backgroundColor : '',
            }}
          />
        </SwiperSlide>
      ))}
      {/* {(autoplay || isPlaying) && (
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        )} */}
      {playAndPouseAllowed && (
        <IconButton
          onClick={isPlaying ? handlePause : handlePlay}
          aria-label={isPlaying ? 'pause' : 'play'}
          size="large"
        >
          {/* {isPlaying ? (
              <PauseIcon fontSize="inherit" />
            ) : (
              <PlayArrowIcon fontSize="inherit" />
            )} */}
        </IconButton>
      )}
    </Swiper>
  );
};

export {SwiperGallery};
