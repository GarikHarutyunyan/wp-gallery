import axios from 'axios';
import clsx from 'clsx';
import {useTemplates} from 'contexts';
import {useAppInfo} from 'contexts/AppInfoContext';
import {usePro} from 'contexts/ProContext';
import {
  GalleryType,
  IBlogSettings,
  ICardsSettings,
  ICarouselSettings,
  ICoverflowSettings,
  ICubeSettings,
  IGeneralSettings,
  IGridSettings,
  IJustifiedSettings,
  ILightboxSettings,
  IMasonrySettings,
  IMosaicSettings,
  IScrollerSettings,
  ISettingsDTO,
  ISlideshowSettings,
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
import {
  blogMockSettings,
  cardsMockSettings,
  carouselMockSettings,
  coverflowMockSettings,
  cubeMockSettings,
  generalMockSettings,
  gridMockSettings,
  justifiedMockSettings,
  lightboxMockSettings,
  masonryMockSettings,
  mosaicMockSettings,
  scrollerMockSettings,
  slideshowMockSettings,
} from './MockSettings';

const SettingsSections = lazy(() => import('./SettingsSections'));

const SettingsContext = React.createContext<{
  type?: GalleryType;
  changeType?: (type: GalleryType) => void;
  hasChanges?: boolean;
  generalSettings?: IGeneralSettings;
  gridSettings?: IGridSettings;
  mosaicSettings?: IMosaicSettings;
  lightboxSettings?: ILightboxSettings;
  justifiedSettings?: IJustifiedSettings;
  masonrySettings?: IMasonrySettings;
  slideshowSettings?: ISlideshowSettings;
  cubeSettings?: ICubeSettings;
  carouselSettings?: ICarouselSettings;
  coverflowSettings?: ICoverflowSettings;
  cardsSettings?: ICardsSettings;
  blogSettings?: IBlogSettings;
  scrollerSettings?: IScrollerSettings;
  changeGeneralSettings?: (settings: IGeneralSettings) => void;
  changeGridSettings?: (settings: IGridSettings) => void;
  changeMosaicSettings?: (settings: IMosaicSettings) => void;
  changeJustifiedSettings?: (settings: IJustifiedSettings) => void;
  changeMasonrySettings?: (settings: IMasonrySettings) => void;
  changeSlideshowSettings?: (settings: ISlideshowSettings) => void;
  changeLightboxSettings?: (settings: ILightboxSettings) => void;
  changeCubeSettings?: (settings: ICubeSettings) => void;
  changeCarouselSettings?: (settings: ICarouselSettings) => void;
  changeCoverflowSettings?: (settings: ICoverflowSettings) => void;
  changeCardsSettings?: (settings: ICardsSettings) => void;
  changeBlogSettings?: (settings: IBlogSettings) => void;
  changeScrollerSettings?: (settings: IScrollerSettings) => void;
  changeCss?: (css: string) => void;
  wrapperRef?: any;
  imagesCount?: number;
  changeImagesCount?: (count: number) => void;
}>({});

const SettingsProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  if (typeof window !== 'undefined') {
    (window as any).reacg_global = (window as any).reacg_global || {};
    (window as any).reacg_global.options_api_version = 1;
  }

  const {enqueueSnackbar} = useSnackbar();
  const {
    template,
    initTemplate,
    resetTemplate,
    isLoading: areTemplatesLoading,
  } = useTemplates();
  const {
    galleryId,
    pluginVersion,
    showControls,
    baseUrl,
    nonce,
    getOptionsTimestamp,
  } = useAppInfo();
  const [gridSettings, setGridSettings] = useState<IGridSettings>();
  const [mosaicSettings, setMosaicSettings] = useState<IMosaicSettings>();
  const [justifiedSettings, setJustifiedSettings] =
    useState<IJustifiedSettings>();
  const [masonrySettings, setMasonrySettings] = useState<IMasonrySettings>();
  const [slideshowSettings, setSlideshowSettings] =
    useState<ISlideshowSettings>();
  const [generalSettings, setGeneralSettings] = useState<IGeneralSettings>();
  const [lightboxSettings, setLightboxSettings] = useState<ILightboxSettings>();
  const [cubeSettings, setCubeSettings] = useState<ICubeSettings>();
  const [carouselSettings, setCarouselSettings] = useState<ICarouselSettings>();
  const [coverflowSettings, setCoverflowSettings] =
    useState<ICoverflowSettings>();
  const [cardsSettings, setCardsSettings] = useState<ICardsSettings>();
  const [blogSettings, setBlogSettings] = useState<IBlogSettings>();
  const [scrollerSettings, setScrollerSettings] = useState<IScrollerSettings>();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<GalleryType>();
  const [css, setCss] = useState('');
  const [customCss, setCustomCss] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const wrapperRef = useRef(null);
  const [imagesCount, setImagesCount] = useState<number>(0);

  const optionsRef = useRef<ISettingsDTO>({
    type: GalleryType.GRID,
    general: generalMockSettings,
    thumbnails: gridMockSettings,
    mosaic: mosaicMockSettings,
    justified: justifiedMockSettings,
    masonry: mosaicMockSettings,
    slideshow: slideshowMockSettings,
    lightbox: lightboxMockSettings,
    cube: cubeMockSettings,
    carousel: carouselMockSettings,
    coverflow: coverflowMockSettings,
    cards: cardsMockSettings,
    blog: blogMockSettings,
    scroller: scrollerMockSettings,
    css: '',
    custom_css: '',
  });

  const emitOptionsChange = (options: ISettingsDTO, hasChangesVal: boolean) => {
    try {
      const globalObj = (window as any).reacg_global;
      if (typeof globalObj?.onOptionsChange === 'function') {
        globalObj.onOptionsChange(options, {
          hasChanges: hasChangesVal,
          galleryId: galleryId ?? '',
        });
      }
    } catch (e) {
      console.error('Error in window.reacg_global.onOptionsChange:', e);
    }
  };

  const getDataFromWindow = () => {
    const allData = (window as any).reacg_data;
    const currentData = allData?.[galleryId as string];
    const optionsData: any = currentData?.options;
    const newSettings: ISettingsDTO = optionsData;
    const template_id = newSettings?.template_id?.toString();

    setType(newSettings.type);
    setCss(newSettings.css || '');
    setCustomCss(newSettings.custom_css || '');
    setGeneralSettings(newSettings.general || generalMockSettings);
    setGridSettings(newSettings.thumbnails || gridMockSettings);
    setMosaicSettings(newSettings.mosaic || mosaicMockSettings);
    setJustifiedSettings(newSettings.justified || justifiedMockSettings);
    setMasonrySettings(newSettings.masonry || mosaicMockSettings);
    setSlideshowSettings(newSettings.slideshow || slideshowMockSettings);
    setLightboxSettings(newSettings.lightbox);
    setCubeSettings(newSettings.cube || cubeMockSettings);
    setCarouselSettings(newSettings.carousel || carouselMockSettings);
    setCoverflowSettings(newSettings.coverflow || coverflowMockSettings);
    setCardsSettings(newSettings.cards || cardsMockSettings);
    setBlogSettings(newSettings.blog || blogMockSettings);
    setScrollerSettings(newSettings.scroller || scrollerMockSettings);
    initTemplate?.(
      template_id === '' || template_id === 'none'
        ? galleryId || ''
        : template_id || '',
      newSettings?.title as string,
      newSettings?.templateType as string
    );

    const fullOptions: ISettingsDTO = {
      type: newSettings.type ?? GalleryType.GRID,
      general: newSettings.general || generalMockSettings,
      thumbnails: newSettings.thumbnails || gridMockSettings,
      mosaic: newSettings.mosaic || mosaicMockSettings,
      justified: newSettings.justified || justifiedMockSettings,
      masonry: newSettings.masonry || mosaicMockSettings,
      slideshow: newSettings.slideshow || slideshowMockSettings,
      lightbox: newSettings.lightbox,
      cube: newSettings.cube || cubeMockSettings,
      carousel: newSettings.carousel || carouselMockSettings,
      coverflow: newSettings.coverflow || coverflowMockSettings,
      cards: newSettings.cards || cardsMockSettings,
      blog: newSettings.blog || blogMockSettings,
      scroller: newSettings.scroller || scrollerMockSettings,
      template_id: newSettings.template_id,
      templateType: newSettings.templateType,
      title: newSettings.title,
      css: newSettings.css || '',
      custom_css: newSettings.custom_css || '',
    };
    optionsRef.current = fullOptions;
    emitOptionsChange(fullOptions, false);
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
      const template_id = newSettings?.template_id?.toString();

      setType(newSettings.type);
      setCss(newSettings.css || '');
      setCustomCss(newSettings.custom_css || '');
      setGeneralSettings(newSettings.general || generalMockSettings);
      setGridSettings(newSettings.thumbnails || gridMockSettings);
      setMosaicSettings(newSettings.mosaic || mosaicMockSettings);
      setJustifiedSettings(newSettings.justified || justifiedMockSettings);
      setMasonrySettings(newSettings.masonry || mosaicMockSettings);
      setSlideshowSettings(newSettings.slideshow || slideshowMockSettings);
      setLightboxSettings(newSettings.lightbox);
      setCubeSettings(newSettings.cube || cubeMockSettings);
      setCarouselSettings(newSettings.carousel || carouselMockSettings);
      setCoverflowSettings(newSettings.coverflow || coverflowMockSettings);
      setCardsSettings(newSettings.cards || cardsMockSettings);
      setBlogSettings(newSettings.blog || blogMockSettings);
      setScrollerSettings(newSettings.scroller || scrollerMockSettings);
      initTemplate?.(
        template_id === '' || template_id === 'none'
          ? galleryId || ''
          : template_id || '',
        newSettings?.title as string,
        newSettings?.templateType as string
      );
      setIsLoading(false);

      const fullOptions: ISettingsDTO = {
        type: newSettings.type ?? GalleryType.GRID,
        general: newSettings.general || generalMockSettings,
        thumbnails: newSettings.thumbnails || gridMockSettings,
        mosaic: newSettings.mosaic || mosaicMockSettings,
        justified: newSettings.justified || justifiedMockSettings,
        masonry: newSettings.masonry || mosaicMockSettings,
        slideshow: newSettings.slideshow || slideshowMockSettings,
        lightbox: newSettings.lightbox,
        cube: newSettings.cube || cubeMockSettings,
        carousel: newSettings.carousel || carouselMockSettings,
        coverflow: newSettings.coverflow || coverflowMockSettings,
        cards: newSettings.cards || cardsMockSettings,
        blog: newSettings.blog || blogMockSettings,
        scroller: newSettings.scroller || scrollerMockSettings,
        template_id: newSettings.template_id,
        templateType: newSettings.templateType,
        title: newSettings.title,
        css: newSettings.css || '',
        custom_css: newSettings.custom_css || '',
      };
      optionsRef.current = fullOptions;
      emitOptionsChange(fullOptions, false);
    } else {
      setType(GalleryType.GRID);
      setGeneralSettings(generalMockSettings);
      setGridSettings(gridMockSettings);
      setMosaicSettings(mosaicMockSettings);
      setJustifiedSettings(justifiedMockSettings);
      setMasonrySettings(masonryMockSettings);
      setSlideshowSettings(slideshowMockSettings);
      setLightboxSettings(lightboxMockSettings);
      setCubeSettings(cubeMockSettings);
      setCarouselSettings(carouselMockSettings);
      setCoverflowSettings(coverflowMockSettings);
      setCardsSettings(cardsMockSettings);
      setBlogSettings(blogMockSettings);
      setScrollerSettings(scrollerMockSettings);

      const fullOptions: ISettingsDTO = {
        type: GalleryType.GRID,
        general: generalMockSettings,
        thumbnails: gridMockSettings,
        mosaic: mosaicMockSettings,
        justified: justifiedMockSettings,
        masonry: masonryMockSettings,
        slideshow: slideshowMockSettings,
        lightbox: lightboxMockSettings,
        cube: cubeMockSettings,
        carousel: carouselMockSettings,
        coverflow: coverflowMockSettings,
        cards: cardsMockSettings,
        blog: blogMockSettings,
        scroller: scrollerMockSettings,
        css: '',
        custom_css: '',
      };
      optionsRef.current = fullOptions;
      emitOptionsChange(fullOptions, false);
    }
  };

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).reacg_global = (window as any).reacg_global || {};
      (window as any).reacg_global.options_api_version = 1;
    }

    if (!galleryId) {
      return;
    }
    const allData = (window as any).reacg_data;
    const currentData = allData?.[galleryId as string];
    const hasFirstChunk: boolean = currentData?.options;

    if (!hasFirstChunk || showControls) {
      getData();
    } else {
      getDataFromWindow();
    }
  }, []);

  const changeType = async (newType: GalleryType) => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    setType(newType);
    setHasChanges(true);
    const updatedOptions: ISettingsDTO = {
      ...optionsRef.current,
      type: newType,
      templateType: template?.templateType ?? optionsRef.current.templateType,
      template_id: template?.template_id ?? optionsRef.current.template_id,
      title: template?.title ?? optionsRef.current.title,
    };
    optionsRef.current = updatedOptions;
    emitOptionsChange(updatedOptions, true);

    if (fetchUrl) {
      const settings: ISettingsDTO = {
        type: newType,
      } as ISettingsDTO;
      try {
        const response = await axios.post(fetchUrl, settings, {
          headers: {'X-WP-Nonce': nonce},
        });
        const responseType: GalleryType = response.data.type;
        if (responseType !== newType) {
          setType(responseType);
          const syncOptions: ISettingsDTO = {
            ...optionsRef.current,
            type: responseType,
          };
          optionsRef.current = syncOptions;
          emitOptionsChange(syncOptions, true);
        }
      } catch (error) {
        setType(type);
        if (type) {
          const revertOptions: ISettingsDTO = {
            ...optionsRef.current,
            type,
          };
          optionsRef.current = revertOptions;
          emitOptionsChange(revertOptions, true);
        }
        console.error(error);
      }
    }
  };

  const onTypeChange = async (newType: GalleryType): Promise<void> => {
    await changeType(newType);
    resetTemplate?.();
    setCss('');
  };
  const {isPro} = usePro();

  const onSave = async (): Promise<void> => {
    const fetchUrl: string | undefined = baseUrl
      ? baseUrl + 'options/' + galleryId
      : undefined;

    if (fetchUrl) {
      if (generalSettings) {
        if (!isPro) {
          generalSettings.enableWatermark = false;
          generalSettings.enableSearch = false;
        }
        generalSettings.enableWhiteLabel = isPro;
      }
      const settings: ISettingsDTO = {
        type: type,
        general: generalSettings,
        thumbnails: gridSettings,
        lightbox: lightboxSettings,
        mosaic: mosaicSettings,
        justified: justifiedSettings,
        masonry: masonrySettings,
        cube: cubeSettings,
        carousel: carouselSettings,
        coverflow: coverflowSettings,
        cards: cardsSettings,
        slideshow: slideshowSettings,
        blog: blogSettings,
        scroller: scrollerSettings,
        templateType: template?.templateType,
        template_id: template?.template_id,
        css: css || '',
        custom_css: isPro ? customCss : customCss.slice(0, 100), // Do not allow to save more than 100 characteres as custom css with free plan.
      } as ISettingsDTO;

      try {
        const response = await axios.post(fetchUrl, settings, {
          headers: {'X-WP-Nonce': nonce},
        });
        const newSettings: ISettingsDTO = response.data;
        const template_id = newSettings?.template_id?.toString();

        setGeneralSettings(newSettings.general);
        setGridSettings(newSettings.thumbnails);
        setMosaicSettings(newSettings.mosaic);
        setJustifiedSettings(newSettings.justified);
        setMasonrySettings(newSettings.masonry);
        setSlideshowSettings(newSettings.slideshow);
        setLightboxSettings(newSettings.lightbox);
        setCubeSettings(newSettings.cube);
        setCarouselSettings(newSettings.carousel);
        setCoverflowSettings(newSettings.coverflow || coverflowMockSettings);
        setCardsSettings(newSettings.cards);
        setBlogSettings(newSettings.blog);
        setScrollerSettings(newSettings.scroller || scrollerMockSettings);
        initTemplate?.(
          template_id === '' || template_id === 'none'
            ? galleryId || ''
            : template_id || '',
          newSettings?.title as string,
          newSettings?.templateType as string
        );

        setHasChanges(false);

        const savedOptions: ISettingsDTO = {
          type: newSettings.type ?? type ?? GalleryType.GRID,
          general: newSettings.general ?? generalSettings,
          thumbnails: newSettings.thumbnails ?? gridSettings,
          mosaic: newSettings.mosaic ?? mosaicSettings,
          justified: newSettings.justified ?? justifiedSettings,
          masonry: newSettings.masonry ?? masonrySettings,
          slideshow: newSettings.slideshow ?? slideshowSettings,
          lightbox: newSettings.lightbox ?? lightboxSettings,
          cube: newSettings.cube ?? cubeSettings,
          carousel: newSettings.carousel ?? carouselSettings,
          coverflow:
            newSettings.coverflow ??
            (coverflowSettings || coverflowMockSettings),
          cards: newSettings.cards ?? cardsSettings,
          blog: newSettings.blog ?? blogSettings,
          scroller:
            newSettings.scroller ?? (scrollerSettings || scrollerMockSettings),
          template_id: newSettings.template_id ?? template?.template_id,
          templateType: newSettings.templateType ?? template?.templateType,
          title: newSettings.title ?? template?.title,
          css: newSettings.css ?? css ?? '',
          custom_css:
            newSettings.custom_css ??
            (isPro ? customCss : customCss.slice(0, 100)),
        };
        optionsRef.current = savedOptions;
        emitOptionsChange(savedOptions, false);

        enqueueSnackbar('Options are up to date!', {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
      } catch (error) {
        enqueueSnackbar('Cannot update options!', {
          variant: 'error',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        (window as any).reacg_open_error_dialog?.({
          errorMessage: 'Cannot update options',
        });
        console.error(error);
      }
    } else {
      enqueueSnackbar('Cannot update options!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
      (window as any).reacg_open_error_dialog?.({
        errorMessage: 'Cannot update options',
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
        const template_id = newSettings?.template_id?.toString();

        setGeneralSettings(newSettings.general);
        setGridSettings(newSettings.thumbnails);
        setMosaicSettings(newSettings.mosaic);
        setJustifiedSettings(newSettings.justified);
        setMasonrySettings(newSettings.masonry);
        setSlideshowSettings(newSettings.slideshow);
        setLightboxSettings(newSettings.lightbox);
        setCubeSettings(newSettings.cube);
        setCarouselSettings(newSettings.carousel);
        setCoverflowSettings(newSettings.coverflow || coverflowMockSettings);
        setCardsSettings(newSettings.cards);
        setBlogSettings(newSettings.blog);
        setScrollerSettings(newSettings.scroller || scrollerMockSettings);
        setCss(newSettings.css || '');
        initTemplate?.(
          template_id === '' || template_id === 'none'
            ? galleryId || ''
            : template_id || '',
          newSettings?.title as string,
          newSettings?.templateType as string
        );

        setHasChanges(false);

        const resetOptions: ISettingsDTO = {
          type: newSettings.type ?? type ?? GalleryType.GRID,
          general: newSettings.general ?? generalMockSettings,
          thumbnails: newSettings.thumbnails ?? gridMockSettings,
          mosaic: newSettings.mosaic ?? mosaicMockSettings,
          justified: newSettings.justified ?? justifiedMockSettings,
          masonry: newSettings.masonry ?? mosaicMockSettings,
          slideshow: newSettings.slideshow ?? slideshowMockSettings,
          lightbox: newSettings.lightbox,
          cube: newSettings.cube ?? cubeMockSettings,
          carousel: newSettings.carousel ?? carouselMockSettings,
          coverflow: newSettings.coverflow ?? coverflowMockSettings,
          cards: newSettings.cards ?? cardsMockSettings,
          blog: newSettings.blog ?? blogMockSettings,
          scroller: newSettings.scroller ?? scrollerMockSettings,
          template_id: newSettings.template_id,
          templateType: newSettings.templateType,
          title: newSettings.title,
          css: newSettings.css || '',
          custom_css: newSettings.custom_css || '',
        };
        optionsRef.current = resetOptions;
        emitOptionsChange(resetOptions, false);

        enqueueSnackbar(successMessage, {
          variant: 'success',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
      } catch (error: any) {
        enqueueSnackbar('Cannot reset options', {
          variant: 'error',
          anchorOrigin: {horizontal: 'right', vertical: 'top'},
        });
        (window as any).reacg_open_error_dialog?.({
          errorMessage: 'Cannot reset options',
        });
        console.error(error);
      }

      setIsLoading(false);
    } else {
      enqueueSnackbar('Cannot reset options!', {
        variant: 'error',
        anchorOrigin: {horizontal: 'right', vertical: 'top'},
      });
      (window as any).reacg_open_error_dialog?.({
        errorMessage: 'Cannot reset options',
      });
    }
  };

  const renderChildren = (): ReactNode => {
    const handleContextMenu = (e: React.MouseEvent) => {
      if (generalSettings?.enableRightClickProtection) {
        e.preventDefault();
      }
    };

    return (
      <div
        ref={wrapperRef}
        className={clsx('reacg-gallery-wrapper', {
          'reacg-gallery-wrapper__margin-bottom': type === GalleryType.CUBE,
          'reacg-gallery-wrapper--protected':
            generalSettings?.enableRightClickProtection,
        })}
        onContextMenu={handleContextMenu}
      >
        {children}
        {css !== '' && (
          <style>
            {'.reacg-gallery[data-gallery-id="' + galleryId + '"]{' + css + '}'}
          </style>
        )}
        {customCss !== '' && (
          <style>
            {'.reacg-gallery[data-gallery-id="' +
              galleryId +
              '"]{' +
              customCss +
              '}'}
          </style>
        )}
      </div>
    );
  };

  const createOnChange = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    key: keyof ISettingsDTO
  ) => {
    return (value: T) => {
      setHasChanges(true);
      setter(value);
      const updatedOptions: ISettingsDTO = {
        ...optionsRef.current,
        [key]: value,
        templateType: template?.templateType ?? optionsRef.current.templateType,
        template_id: template?.template_id ?? optionsRef.current.template_id,
        title: template?.title ?? optionsRef.current.title,
      };
      optionsRef.current = updatedOptions;
      emitOptionsChange(updatedOptions, true);
      return value;
    };
  };

  return (
    <SettingsContext.Provider
      value={{
        type,
        changeType,
        hasChanges,
        gridSettings,
        mosaicSettings,
        justifiedSettings,
        masonrySettings,
        slideshowSettings,
        generalSettings,
        lightboxSettings,
        cubeSettings,
        carouselSettings,
        coverflowSettings,
        cardsSettings,
        blogSettings,
        scrollerSettings,
        changeGeneralSettings: createOnChange(setGeneralSettings, 'general'),
        changeGridSettings: createOnChange(setGridSettings, 'thumbnails'),
        changeMosaicSettings: createOnChange(setMosaicSettings, 'mosaic'),
        changeJustifiedSettings: createOnChange(
          setJustifiedSettings,
          'justified'
        ),
        changeMasonrySettings: createOnChange(setMasonrySettings, 'masonry'),
        changeSlideshowSettings: createOnChange(
          setSlideshowSettings,
          'slideshow'
        ),
        changeLightboxSettings: createOnChange(setLightboxSettings, 'lightbox'),
        changeCubeSettings: createOnChange(setCubeSettings, 'cube'),
        changeCarouselSettings: createOnChange(setCarouselSettings, 'carousel'),
        changeCoverflowSettings: createOnChange(
          setCoverflowSettings,
          'coverflow'
        ),
        changeCardsSettings: createOnChange(setCardsSettings, 'cards'),
        changeBlogSettings: createOnChange(setBlogSettings, 'blog'),
        changeScrollerSettings: createOnChange(setScrollerSettings, 'scroller'),
        changeCss: createOnChange(setCss, 'css'),
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
