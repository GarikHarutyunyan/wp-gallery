import axios from 'axios';
import {useAppInfo} from 'contexts/AppInfoContext';
import {Section} from 'core-components';
import {
  GalleryType,
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
import {
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
  generalSettings?: IGeneralSettings;
  thumbnailSettings?: IThumbnailSettings;
  mosaicSettings?: IMosaicSettings;
  masonrySettings?: IMasonrySettings;
  slideshowSettings?: ISlideshowSettings;
  lightboxSettings?: ILightboxSettings;
  cubeSettings?: ICubeSettings;
  changeGeneralSettings?: any;
  changeThumbnailSettings?: any;
  changeMosaicSettings?: any;
  changeMasonrySettings?: any;
  changeSlideshowSettings?: any;
  changeLightboxSettings?: any;
  changeCubeSettings?: any;
  wrapperRef?: any;
}>({});

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {enqueueSnackbar} = useSnackbar();

  const {galleryId, baseUrl, nonce} = useAppInfo();
  const [thumbnailSettings, setThumbnailSettings] =
    useState<IThumbnailSettings>();
  const [mosaicSettings, setMosaicSettings] = useState<IMosaicSettings>();
  const [masonrySettings, setMasonrySettings] = useState<IMasonrySettings>();
  const [slideshowSettings, setSlideshowSettings] =
    useState<ISlideshowSettings>();
  const [generalSettings, setGeneralSettings] = useState<IGeneralSettings>();
  const [lightboxSettings, setLightboxSettings] = useState<ILightboxSettings>();
  const [cubeSettings, setCubeSettings] = useState<ICubeSettings>();
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<GalleryType>();
  const wrapperRef = useRef(null);

  const getData = async () => {
    const dataElement = document.getElementById('reacg-root' + galleryId);
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;
    const showControlsData: number = +(
      dataElement?.getAttribute('data-options-section') || 1
    );

    setShowControls(!!showControlsData);

    if (fetchUrl) {
      setIsLoading(true);
      const newSettings: ISettingsDTO = (
        await axios.get(fetchUrl, {
          headers: {'X-WP-Nonce': nonce},
        })
      ).data;

      setType(newSettings.type);
      setGeneralSettings(newSettings.general || generalMockSettings);
      setThumbnailSettings(newSettings.thumbnails || thumbnailMockSettings);
      setMosaicSettings(newSettings.mosaic || mosaicMockSettings);
      setMasonrySettings(newSettings.masonry || mosaicMockSettings);
      setSlideshowSettings(newSettings.slideshow || slideshowMockSettings);
      setLightboxSettings(newSettings.lightbox);
      setCubeSettings(newSettings.cube || cubeMockSettings);

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
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const onTypeChange = async (newType: GalleryType): Promise<void> => {
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
        slideshow: slideshowSettings,
      } as ISettingsDTO;

      const validSettings: ISettingsDTO = Object.entries(settings).reduce(
        (accumulator, [key, value]) => ({...accumulator, [key]: value || ''}),
        {}
      ) as ISettingsDTO;

      try {
        const response = await axios.post(fetchUrl, validSettings, {
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
      </div>
    );
  };

  return (
    <SettingsContext.Provider
      value={{
        type,
        thumbnailSettings,
        mosaicSettings,
        masonrySettings,
        slideshowSettings,
        generalSettings,
        lightboxSettings,
        cubeSettings,
        changeGeneralSettings: setGeneralSettings,
        changeThumbnailSettings: setThumbnailSettings,
        changeMosaicSettings: setMosaicSettings,
        changeMasonrySettings: setMasonrySettings,
        changeSlideshowSettings: setSlideshowSettings,
        changeLightboxSettings: setLightboxSettings,
        changeCubeSettings: setCubeSettings,
        wrapperRef,
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
