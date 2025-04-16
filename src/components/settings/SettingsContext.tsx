import axios from 'axios';
import clsx from 'clsx';
import {useTemplates} from 'contexts';
import {useAppInfo} from 'contexts/AppInfoContext';
import {
  GalleryType,
  IBlogSettings,
  ICardsSettings,
  ICarouselSettings,
  ICubeSettings,
  IGeneralSettings,
  ILightboxSettings,
  IMasonrySettings,
  IMosaicSettings,
  ISettingsDTO,
  ISlideshowSettings,
  IThumbnailSettings,
} from 'data-structures';
import {useSnackbar} from 'notistack';
import React, {
  lazy,
  ReactNode,
  Suspense,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {TypeUtils} from 'utils';
import {
  blogMockSettings,
  cardsMockSettings,
  carouselMockSettings,
  cubeMockSettings,
  generalMockSettings,
  lightboxMockSettings,
  masonryMockSettings,
  mosaicMockSettings,
  slideshowMockSettings,
  thumbnailMockSettings,
} from './MockSettings';

const SettingsSections = lazy(() => import('./SettingsSections'));

const SettingsContext = React.createContext<{
  type?: GalleryType;
  changeType?: (type: GalleryType) => void;
  hasChanges?: boolean;
  generalSettings?: IGeneralSettings;
  thumbnailSettings?: IThumbnailSettings;
  mosaicSettings?: IMosaicSettings;
  masonrySettings?: IMasonrySettings;
  slideshowSettings?: ISlideshowSettings;
  lightboxSettings?: ILightboxSettings;
  cubeSettings?: ICubeSettings;
  carouselSettings?: ICarouselSettings;
  cardsSettings?: ICardsSettings;
  blogSettings?: IBlogSettings;
  changeGeneralSettings?: any;
  changeThumbnailSettings?: any;
  changeMosaicSettings?: any;
  changeMasonrySettings?: any;
  changeSlideshowSettings?: any;
  changeLightboxSettings?: any;
  changeCubeSettings?: any;
  changeCarouselSettings?: any;
  changeCardsSettings?: any;
  changeBlogSettings?: any;
  changeCss?: any;
  wrapperRef?: any;
  imagesCount?: number;
  changeImagesCount?: (count: number) => void;
}>({});

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();
  const {
    template,
    initTemplate,
    changeTemplate,
    resetTemplate,
    isLoading: areTemplatesLoading,
  } = useTemplates();
  const {galleryId, showControls, baseUrl, nonce, getOptionsTimestamp} =
    useAppInfo();
  const [thumbnailSettings, setThumbnailSettings] =
    useState<IThumbnailSettings>();
  const [mosaicSettings, setMosaicSettings] = useState<IMosaicSettings>();
  const [masonrySettings, setMasonrySettings] = useState<IMasonrySettings>();
  const [slideshowSettings, setSlideshowSettings] =
    useState<ISlideshowSettings>();
  const [generalSettings, setGeneralSettings] = useState<IGeneralSettings>();
  const [lightboxSettings, setLightboxSettings] = useState<ILightboxSettings>();
  const [cubeSettings, setCubeSettings] = useState<ICubeSettings>();
  const [carouselSettings, setCarouselSettings] = useState<ICarouselSettings>();
  const [cardsSettings, setCardsSettings] = useState<ICardsSettings>();
  const [blogSettings, setBlogSettings] = useState<IBlogSettings>();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<GalleryType>();
  const [css, setCss] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const wrapperRef = useRef(null);
  const [imagesCount, setImagesCount] = useState<number>(0);

  const getDataFromWindow = () => {
    const allData = (window as any).reacg_data;
    const currentData = allData?.[galleryId as string];
    const optionsData: any = currentData?.options;
    const newSettings: ISettingsDTO = optionsData;

    setType(newSettings.type);
    setCss(newSettings.css || '');
    setGeneralSettings(newSettings.general || generalMockSettings);
    setThumbnailSettings(newSettings.thumbnails || thumbnailMockSettings);
    setMosaicSettings(newSettings.mosaic || mosaicMockSettings);
    setMasonrySettings(newSettings.masonry || mosaicMockSettings);
    setSlideshowSettings(newSettings.slideshow || slideshowMockSettings);
    setLightboxSettings(newSettings.lightbox);
    setCubeSettings(newSettings.cube || cubeMockSettings);
    setCarouselSettings(newSettings.carousel || carouselMockSettings);
    setCardsSettings(newSettings.cards || cardsMockSettings);
    setBlogSettings(newSettings.blog || blogMockSettings);

    initTemplate?.(
      newSettings?.template_id as string,
      newSettings?.title as string
    );
  };

  const getData = async () => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
      let queryString = queryStringSeperator;
      queryString += `timestamp=${getOptionsTimestamp?.()}`;
      const newSettings: ISettingsDTO = (
        await axios.get(`${fetchUrl}${queryString}`)
      ).data;

      // setType(newSettings.type);
      // setCss(newSettings.css || '');
      // setGeneralSettings(newSettings.general || generalMockSettings);
      // setThumbnailSettings(newSettings.thumbnails || thumbnailMockSettings);
      // setMosaicSettings(newSettings.mosaic || mosaicMockSettings);
      // setMasonrySettings(newSettings.masonry || mosaicMockSettings);
      // setSlideshowSettings(newSettings.slideshow || slideshowMockSettings);
      // setLightboxSettings(newSettings.lightbox);
      // setCubeSettings(newSettings.cube || cubeMockSettings);
      // setCarouselSettings(newSettings.carousel || carouselMockSettings);
      // setCardsSettings(newSettings.cards || cardsMockSettings);
      // setBlogSettings(newSettings.blog || blogMockSettings);
      setGeneralSettings(generalMockSettings);
      setThumbnailSettings(thumbnailMockSettings);
      setMosaicSettings(mosaicMockSettings);
      setMasonrySettings(masonryMockSettings);
      setSlideshowSettings(slideshowMockSettings);
      setLightboxSettings(lightboxMockSettings);
      setCubeSettings(cubeMockSettings);
      setCarouselSettings(carouselMockSettings);
      setCardsSettings(cardsMockSettings);
      setBlogSettings(blogMockSettings);
      initTemplate?.(
        newSettings?.template_id as string,
        newSettings?.title as string
      );
      setIsLoading(false);
    } else {
      setType(GalleryType.THUMBNAILS);
      setGeneralSettings(generalMockSettings);
      setThumbnailSettings(thumbnailMockSettings);
      setMosaicSettings(mosaicMockSettings);
      setMasonrySettings(masonryMockSettings);
      setSlideshowSettings(slideshowMockSettings);
      setLightboxSettings(lightboxMockSettings);
      setCubeSettings(cubeMockSettings);
      setCarouselSettings(carouselMockSettings);
      setCardsSettings(cardsMockSettings);
      setBlogSettings(blogMockSettings);
    }
  };

  useLayoutEffect(() => {
    const allData = (window as any).reacg_data;
    const currentData = allData?.[galleryId as string];
    const hasFirstChunk: boolean = currentData?.options;

    if (!hasFirstChunk) {
      getData();
    } else {
      getDataFromWindow();
    }
  }, []);

  const changeType = async (newType: GalleryType) => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setType(newType);
      // const settings: ISettingsDTO = {
      //   type: newType,
      // } as ISettingsDTO;

      // try {
      //   const response = await axios.post(fetchUrl, settings, {
      //     headers: {'X-WP-Nonce': nonce},
      //   });
      //   const responseType: GalleryType = response.data.type;
      //   if (responseType !== newType) {
      //     setType(responseType);
      //   }
      // } catch (error) {
      //   setType(type);
      //   console.error(error);
      // }
    }
  };

  const onTypeChange = async (newType: GalleryType): Promise<void> => {
    await changeType(newType);
    resetTemplate?.();
    setCss('');
  };

  const onSave = async (): Promise<void> => {
    setHasChanges(false);

    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const settings: ISettingsDTO = {
        general: generalSettings,
        thumbnails: thumbnailSettings,
        lightbox: lightboxSettings,
        mosaic: mosaicSettings,
        masonry: masonrySettings,
        cube: cubeSettings,
        carousel: carouselSettings,
        cards: cardsSettings,
        slideshow: slideshowSettings,
        blog: blogSettings,
        template_id:
          template?.template_id == 'none' ? '' : template?.template_id,
        css: css || '',
      } as ISettingsDTO;

      try {
        const response = await axios.post(fetchUrl, settings, {
          headers: {'X-WP-Nonce': nonce},
        });
        const newSettings: ISettingsDTO = response.data;

        setGeneralSettings(newSettings.general);
        setThumbnailSettings(newSettings.thumbnails);
        setMosaicSettings(newSettings.mosaic);
        setMasonrySettings(newSettings.masonry);
        setSlideshowSettings(newSettings.slideshow);
        setLightboxSettings(newSettings.lightbox);
        setCubeSettings(newSettings.cube);
        setCarouselSettings(newSettings.carousel);
        setCardsSettings(newSettings.cards);
        setBlogSettings(newSettings.blog);
        initTemplate?.(
          (TypeUtils.isNumber(newSettings?.template_id)
            ? newSettings?.template_id
            : 'none') as string,
          newSettings?.title as string
        );
        enqueueSnackbar('Options are up to date!', {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
      } catch (error) {
        enqueueSnackbar('Cannot update options!', {
          variant: 'error',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        console.error(error);
      }

      setIsLoading(false);
    } else {
      enqueueSnackbar('Cannot update options!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
    }
  };

  const onReset = async (): Promise<void> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);

      try {
        const successMessage: string = (
          await axios.delete(fetchUrl, {
            headers: {'X-WP-Nonce': nonce},
          })
        ).data as string;
        const queryStringSeperator: string = fetchUrl.includes('?') ? '&' : '?';
        let queryString = queryStringSeperator;
        queryString += `timestamp=${getOptionsTimestamp?.()}`;
        const response = await axios.get(`${fetchUrl}${queryString}`);
        const newSettings: ISettingsDTO = response.data;

        setGeneralSettings(newSettings.general);
        setThumbnailSettings(newSettings.thumbnails);
        setMosaicSettings(newSettings.mosaic);
        setMasonrySettings(newSettings.masonry);
        setSlideshowSettings(newSettings.slideshow);
        setLightboxSettings(newSettings.lightbox);
        setCubeSettings(newSettings.cube);
        setCarouselSettings(newSettings.carousel);
        setCardsSettings(newSettings.cards);
        setBlogSettings(newSettings.blog);
        setCss(newSettings.css || '');
        changeTemplate?.(newSettings.template_id as string);
        enqueueSnackbar(successMessage, {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
      } catch (error: any) {
        enqueueSnackbar('Cannot reset options', {
          variant: 'error',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        console.error(error);
      }

      setIsLoading(false);
      setHasChanges(false);
    } else {
      enqueueSnackbar('Cannot reset options!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
    }
  };

  const renderChildren = (): ReactNode => {
    return (
      <div
        ref={wrapperRef}
        className={clsx('reacg-gallery-wrapper', {
          'reacg-gallery-wrapper__margin-bottom': type === GalleryType.CUBE,
        })}
      >
        {children}
        {css !== '' && (
          <style>{'#reacg-root' + galleryId + '{' + css + '}'}</style>
        )}
      </div>
    );
  };

  const createOnChange =
    (callback: any) =>
    (...params: any[]) => {
      setHasChanges(true);
      callback?.(...params);
    };

  return (
    <SettingsContext.Provider
      value={{
        type,
        changeType,
        hasChanges,
        thumbnailSettings,
        mosaicSettings,
        masonrySettings,
        slideshowSettings,
        generalSettings,
        lightboxSettings,
        cubeSettings,
        carouselSettings,
        cardsSettings,
        blogSettings,
        changeGeneralSettings: createOnChange(setGeneralSettings),
        changeThumbnailSettings: createOnChange(setThumbnailSettings),
        changeMosaicSettings: createOnChange(setMosaicSettings),
        changeMasonrySettings: createOnChange(setMasonrySettings),
        changeSlideshowSettings: createOnChange(setSlideshowSettings),
        changeLightboxSettings: createOnChange(setLightboxSettings),
        changeCubeSettings: createOnChange(setCubeSettings),
        changeCarouselSettings: createOnChange(setCarouselSettings),
        changeCardsSettings: createOnChange(setCardsSettings),
        changeBlogSettings: createOnChange(setBlogSettings),
        changeCss: createOnChange(setCss),
        wrapperRef,
        imagesCount,
        changeImagesCount: setImagesCount,
      }}
    >
      {showControls && (
        <Suspense>
          <SettingsSections
            isLoading={isLoading || !!areTemplatesLoading}
            onTypeChange={onTypeChange}
            onSave={onSave}
            onReset={onReset}
          />
        </Suspense>
      )}
      {renderChildren()}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
