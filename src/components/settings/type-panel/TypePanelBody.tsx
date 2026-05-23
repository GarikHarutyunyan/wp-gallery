import Button from '@mui/material/Button';
import axios from 'axios';
import {useAppInfo} from 'contexts';
import {Align, Aligner} from 'core-components/aligner';
import {GalleryType, IImageDTO} from 'data-structures';
import React from 'react';
import {TemplatesSelect} from '../TemplatesSelect';
import {useSettings} from '../useSettings';
import {TypeOption} from './TypeOption';
import {GalleryTypeOptions} from './TypePanel.utils';
import {TypePanelSelect} from './TypePanelSelect';
import {AIImage} from './images/AIImage';
import {TemplateImage} from './images/TemplateImage';

interface ITypePanelBodyProps {
  isMedium: boolean;
  isSmall: boolean;
  isExtraSmall: boolean;
  onChange: (type: GalleryType) => void;
}

const TypePanelBody: React.FC<ITypePanelBodyProps> = ({
  isMedium,
  isSmall,
  isExtraSmall,
  onChange,
}) => {
  const {type} = useSettings();
  const {galleryId, baseUrl, getGalleryTimestamp} = useAppInfo();

  const normalizeImages = (rawImages: any[] = []): IImageDTO[] => {
    return rawImages.map((data: any) => {
      const original = data?.original || {url: '', width: 0, height: 0};
      const sizes =
        Array.isArray(data?.sizes) && data.sizes.length
          ? data.sizes
          : [original];

      return {
        ...data,
        id: String(data?.id ?? ''),
        title: data?.title || '',
        caption: data?.caption || '',
        description: data?.description || '',
        alt: data?.alt || '',
        original,
        sizes,
      } as IImageDTO;
    });
  };

  const getSmallImageUrl = (image: IImageDTO): string => {
    if (!image?.sizes?.length) {
      return image?.original?.url || '';
    }

    const smallestSize = image.sizes.reduce((smallest, size) => {
      return size.width < smallest.width ? size : smallest;
    }, image.sizes[0]);

    return smallestSize.url || image?.original?.url || '';
  };

  const getImageId = (image: IImageDTO): string | null => {
    const rawId = String(image?.id || '').trim();
    const numericId = rawId.replace(/\D/g, '');

    if (!numericId) {
      return null;
    }

    const numericGalleryId = String(galleryId || '').replace(/\D/g, '');

    // Some ids are composite: {galleryId}{imageId}.
    if (
      numericGalleryId &&
      numericId.startsWith(numericGalleryId) &&
      numericId.length > numericGalleryId.length
    ) {
      return numericId.slice(numericGalleryId.length);
    }

    return numericId;
  };

  const onAIGenerateClick = async () => {
    if (baseUrl && galleryId) {
      const fetchUrl = `${baseUrl}gallery/${galleryId}/images`;
      const queryStringSeperator = fetchUrl.includes('?') ? '&' : '?';
      let queryString = queryStringSeperator;
      queryString += `&timestamp=${getGalleryTimestamp?.() || ''}`;

      try {
        const response = await axios.get(`${fetchUrl}${queryString}`);
        const sourceRawImages = normalizeImages(response?.data || []);
        const sourceImages = sourceRawImages
          .map((image) => ({
            image,
            imageId: getImageId(image),
          }))
          .filter(
            (item): item is {image: IImageDTO; imageId: string} =>
              !!item.imageId
          );

        const galleryImagesData = sourceImages.map(({image, imageId}) => ({
          id: imageId,
          url: getSmallImageUrl(image),
          title: image.title,
          caption: image.caption,
          description: image.description,
          alt: image.alt,
        }));

        const galleryImagesDataById = galleryImagesData.reduce(
          (acc, image) => {
            acc[image.id] = {
              url: image.url,
              title: image.title,
              caption: image.caption,
              description: image.description,
              alt: image.alt,
            };

            return acc;
          },
          {} as Record<string, Omit<(typeof galleryImagesData)[number], 'id'>>
        );

        (window as any).reacg_open_ai_generate_content_modal?.(
          galleryImagesDataById
        );
      } catch (error) {
        // Keep fallback sourceRawImages when live fetch fails.
        console.error('Failed to fetch latest images for AI generation', error);
      }
    }
  };

  if (!type) return null;

  return (
    <>
      <div className={'reacg-templates-library-row'}>
        <div className={'reacg-templates-library-row__left'}>
          <div className={'reacg-templates-library-row__icon'}>
            <div className={'reacg-templates-library-row__icon-grid'}>
              <TemplateImage />
            </div>
          </div>
          <div className={'reacg-templates-library-row__description'}>
            <div className={'reacg-templates-library-row__title'}>
              Template Library
            </div>
            <div className={'reacg-templates-library-row__subtitle'}>
              Choose from 55+ ready-made gallery designs.
            </div>
          </div>
        </div>
        <TemplatesSelect />
      </div>
      {(window as any).reacg_open_ai_generate_content_modal && (
        <div
          className={
            'reacg-templates-library-row reacg-templates-library-row--generative'
          }
        >
          <div className={'reacg-templates-library-row__left'}>
            <div className={'reacg-templates-library-row__icon'}>
              <div className={'reacg-templates-library-row__icon-generate'}>
                <AIImage />
              </div>
            </div>
            <div className={'reacg-templates-library-row__description'}>
              <div className={'reacg-templates-library-row__title'}>
                Generative AI
              </div>
              <div className={'reacg-templates-library-row__subtitle'}>
                Generate image content in seconds.
              </div>
            </div>
          </div>
          <Button
            variant={'outlined'}
            className={
              'button button-hero options-panel_body-button templates-select-button templates-select-button--ai'
            }
            onClick={onAIGenerateClick}
          >
            AI Generate
          </Button>
        </div>
      )}
      {isSmall || isExtraSmall ? (
        <TypePanelSelect value={type} onChange={onChange} />
      ) : (
        <Aligner className={'type-option__wrapper'} align={Align.SPACE_AROUND}>
          {GalleryTypeOptions.map(({value, title, image, isPro}) => {
            return (
              <TypeOption
                key={title}
                image={image}
                title={title}
                value={value as GalleryType}
                isSelected={type === value}
                requiresPro={!!isPro}
                onClick={type !== value ? onChange : undefined}
              />
            );
          })}
        </Aligner>
      )}
    </>
  );
};

export {TypePanelBody};
