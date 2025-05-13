import {IImageDTO, LightboxTextsPosition} from 'data-structures';

type GetSlideMarginsParams = {
  images?: IImageDTO[];
  index: number;
  showTitle: boolean;
  showDescription: boolean;
  textPosition: LightboxTextsPosition;
  titleFontSize: number;
  descriptionFontSize: number;
  descriptionMaxRowsCount?: number;
  minFactor: number;
  maxFactor: number;
};

export const getSlideMargins = ({
  images,
  index,
  showTitle,
  showDescription,
  textPosition,
  titleFontSize,
  descriptionFontSize,
  descriptionMaxRowsCount,
  minFactor,
  maxFactor,
}: GetSlideMarginsParams) => {
  const titleMarginPx = 8;
  const verticalPaddingAroundText = 20;

  const titleSpace = !!(showTitle && images?.[index]?.title);
  const descriptionSpace = !!(showDescription && images?.[index]?.description);
  const hasCaptions = titleSpace || descriptionSpace;

  const getClampedSize = (fontSize: number) =>
    `clamp(${fontSize / minFactor}rem, ${fontSize}vw, ${
      fontSize * maxFactor
    }rem)`;

  const buildCalcPart = () => {
    const parts: string[] = [];

    if (titleSpace) {
      parts.push(
        `(${getClampedSize(titleFontSize)} * 1.5 + ${titleMarginPx}px)`
      );
    }

    if (descriptionSpace) {
      parts.push(
        `(${getClampedSize(descriptionFontSize)} * 1.5 * ${
          descriptionMaxRowsCount || 1
        })`
      );
    }

    if (parts.length > 0) {
      parts.push(`${verticalPaddingAroundText}px`);
    }

    return parts.length > 0 ? `calc(${parts.join(' + ')})` : '0';
  };

  const margin = hasCaptions ? buildCalcPart() : 0;

  return {
    marginTop: textPosition === LightboxTextsPosition.ABOVE ? margin : 0,
    marginBottom: textPosition === LightboxTextsPosition.BELOW ? margin : 0,
  };
};
