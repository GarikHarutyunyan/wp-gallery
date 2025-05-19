import {IImageDTO, LightboxTextPosition} from 'data-structures';

type GetSlideMarginsParams = {
  images?: IImageDTO[];
  index: number;
  showTitle: boolean;
  showDescription: boolean;
  textPosition: LightboxTextPosition;
  titleFontSize: number;
  descriptionFontSize: number;
  descriptionMaxRowsCount?: number;
  minFactor: number;
  maxFactor: number;
  paddingAroundText: number;
  titleMargin: number;
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
  paddingAroundText,
  titleMargin,
}: GetSlideMarginsParams) => {
  // Calculate extra margin applied around the title
  const titleMarginPx = 2 * titleMargin;

  // Total vertical padding (top + bottom) around text
  const verticalPaddingAroundText = 2 * paddingAroundText;
  // Determine whether we need space for the title and description
  const titleSpace = !!(showTitle && images?.[index]?.title);
  const descriptionSpace = !!(showDescription && images?.[index]?.description);

  // Check if there is any text content to account for
  const hasCaptions = titleSpace || descriptionSpace;

  // Utility function to generate a responsive font size using CSS clamp()
  const getClampedSize = (fontSize: number) =>
    `clamp(${fontSize / minFactor}rem, ${fontSize}vw, ${
      fontSize * maxFactor
    }rem)`;
  // Build the final CSS calc() expression for margin based on content
  const buildCalcPart = () => {
    const parts: string[] = [];
    // Add space for title if it exists
    if (titleSpace) {
      parts.push(
        `(${getClampedSize(titleFontSize)} * 1.5 + ${titleMarginPx}px)`
      );
    }
    // Add space for description, adjusted by max number of rows
    if (descriptionSpace) {
      parts.push(
        `(${getClampedSize(descriptionFontSize)} * 1.5 * ${
          descriptionMaxRowsCount || 1
        })`
      );
    }
    // Add padding only if there is any text content
    if (parts.length > 0) {
      parts.push(`${verticalPaddingAroundText}px`);
    }
    // Combine all parts into a CSS calc() string or return 0
    return parts.length > 0 ? `calc(${parts.join(' + ')})` : '0';
  };
  // Final computed margin value
  const margin = hasCaptions ? buildCalcPart() : 0;
  // Return margins based on the position of the text (above or below image)
  return {
    marginTop: textPosition === LightboxTextPosition.ABOVE ? margin : 0,
    marginBottom: textPosition === LightboxTextPosition.BELOW ? margin : 0,
  };
};
