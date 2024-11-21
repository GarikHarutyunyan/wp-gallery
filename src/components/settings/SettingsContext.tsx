import axios from 'axios';
import {useAppInfo} from 'contexts/AppInfoContext';
import {useTemplates} from 'contexts/TemplatesContext';
import {Section} from 'core-components';
import {
  GalleryType,
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
import React, {ReactNode, useLayoutEffect, useRef, useState} from 'react';
import {TypeUtils} from 'utils';
import {
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
import {OptionsPanelBody} from './OptionsPanelBody';
import {OptionsPanelHeader} from './OptionsPanelHeader';
import {TypePanelBody} from './TypePanelBody ';
import {TypePanelHeader} from './TypePanelHeader';
import './settings-context.css';

const SettingsContext = React.createContext<{
  type?: GalleryType;
  changeType?: (type: GalleryType) => void;
  generalSettings?: IGeneralSettings;
  thumbnailSettings?: IThumbnailSettings;
  mosaicSettings?: IMosaicSettings;
  masonrySettings?: IMasonrySettings;
  slideshowSettings?: ISlideshowSettings;
  lightboxSettings?: ILightboxSettings;
  cubeSettings?: ICubeSettings;
  carouselSettings?: ICarouselSettings;
  cardsSettings?: ICardsSettings;
  changeGeneralSettings?: any;
  changeThumbnailSettings?: any;
  changeMosaicSettings?: any;
  changeMasonrySettings?: any;
  changeSlideshowSettings?: any;
  changeLightboxSettings?: any;
  changeCubeSettings?: any;
  changeCarouselSettings?: any;
  changeCardsSettings?: any;
  wrapperRef?: any;
  imagesCount?: number;
  changeImagesCount?: (count: number) => void;
}>({});

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();
  const {template, initTemplate, changeTemplate, resetTemplate} =
    useTemplates();
  const {galleryId, showControls, baseUrl, nonce} = useAppInfo();
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
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<GalleryType>();
  const [css, setCSS] = useState("");
  const wrapperRef = useRef(null);
  const [imagesCount, setImagesCount] = useState<number>(0);

  const getData = async () => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const newSettings: ISettingsDTO = (
        await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;

      setType(newSettings.type);
      setCSS(newSettings.css || "");
      setGeneralSettings(newSettings.general || generalMockSettings);
      setThumbnailSettings(newSettings.thumbnails || thumbnailMockSettings);
      setMosaicSettings(newSettings.mosaic || mosaicMockSettings);
      setMasonrySettings(newSettings.masonry || mosaicMockSettings);
      setSlideshowSettings(newSettings.slideshow || slideshowMockSettings);
      setLightboxSettings(newSettings.lightbox);
      setCubeSettings(newSettings.cube || cubeMockSettings);
      setCarouselSettings(newSettings.carousel || carouselMockSettings);
      setCardsSettings(newSettings.cards || cardsMockSettings);
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
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const changeType = async (newType: GalleryType) => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      setIsLoading(true);
      const settings: ISettingsDTO = {
        type: newType,
      } as ISettingsDTO;

      try {
        const response = await axios.post(fetchUrl, settings, {
          headers: {'X-WP-Nonce': nonce},
        });
        const newType: GalleryType = response.data.type;

        setType(newType);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }
  };

  const onTypeChange = async (newType: GalleryType): Promise<void> => {
    await changeType(newType);
    resetTemplate?.();
  };

  const onSave = async (): Promise<void> => {
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
        template_id:
          template?.template_id == 'none' ? '' : template?.template_id,
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
        const response = await axios.get(fetchUrl, {
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
    } else {
      enqueueSnackbar('Cannot reset options!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
    }
  };

  const renderChildren = (): ReactNode => {
    return (
      <div ref={wrapperRef} className={'reacg-gallery-wrapper'}>
        {children}
        {css !== '' && (
            <style>
              {"#reacg-root" + galleryId + "{" + css + "}"}
            </style>
        )}
      </div>
    );
  };

  return (
    <SettingsContext.Provider
      value={{
        type,
        changeType,
        thumbnailSettings,
        mosaicSettings,
        masonrySettings,
        slideshowSettings,
        generalSettings,
        lightboxSettings,
        cubeSettings,
        carouselSettings,
        cardsSettings,
        changeGeneralSettings: setGeneralSettings,
        changeThumbnailSettings: setThumbnailSettings,
        changeMosaicSettings: setMosaicSettings,
        changeMasonrySettings: setMasonrySettings,
        changeSlideshowSettings: setSlideshowSettings,
        changeLightboxSettings: setLightboxSettings,
        changeCubeSettings: setCubeSettings,
        changeCarouselSettings: setCarouselSettings,
        changeCardsSettings: setCardsSettings,
        wrapperRef,
        imagesCount,
        changeImagesCount: setImagesCount,
      }}
    >
      {showControls && (
        <>
          <Section
            header={<TypePanelHeader />}
            body={
              <TypePanelBody isLoading={isLoading} onChange={onTypeChange} />
            }
            outlined={false}
            className={'reacg-settings'}
          />
          <Section
            header={<OptionsPanelHeader />}
            body={
              <OptionsPanelBody
                isLoading={isLoading}
                onSave={onSave}
                onReset={onReset}
              />
            }
            outlined={false}
            className={'reacg-settings'}
          />
        </>
      )}
      {renderChildren()}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
