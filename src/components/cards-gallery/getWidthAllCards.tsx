const getWidthAllCards = (
  activeSLideWidth: number,
  activeSlideHeight: number,
  perSlideOffset: number
): number => {
  const perspective = 1000;
  let percentageToGoLeft = 4 * (perSlideOffset - 4) + 4;
  const perspectiveFactor = perspective / (perspective + 400);
  const containerPercentageValue =
    (activeSLideWidth * percentageToGoLeft) / 100;
  const calcX = containerPercentageValue - 4 * activeSLideWidth;
  const distanceBetweenEndFirstSlideAndStartLastSlide =
    3 * activeSLideWidth + calcX;
  const widthContainerWithoutTranslateZ =
    2 * activeSLideWidth + distanceBetweenEndFirstSlideAndStartLastSlide;
  const progressToRightWithTranslateZ =
    containerPercentageValue * perspectiveFactor -
    (activeSLideWidth - activeSLideWidth * perspectiveFactor) / 2;
  const newContainerWidht =
    widthContainerWithoutTranslateZ -
    (containerPercentageValue - progressToRightWithTranslateZ);
  const lastSlideWidth = activeSLideWidth * perspectiveFactor;
  const lastSlideHeight = activeSlideHeight * perspectiveFactor;
  const rotationRad = 20 * (Math.PI / 180);
  const topRightX = lastSlideWidth * Math.cos(rotationRad);
  const topRightY = lastSlideHeight * Math.sin(rotationRad);
  const rotateDistance = Math.sqrt(
    Math.pow(topRightX - lastSlideWidth, 2) + Math.pow(topRightY, 2)
  );
  let angleDegree = 20;
  if (activeSlideHeight > activeSLideWidth) {
    angleDegree += (activeSlideHeight / activeSLideWidth) * 0.05;
  } else if (activeSlideHeight < activeSLideWidth) {
    const ratio = activeSLideWidth / activeSlideHeight;
    if (ratio <= 2) {
      angleDegree -=
        (0.5 / activeSLideWidth) * (activeSLideWidth - activeSlideHeight);
    } else if (ratio <= 3) {
      angleDegree -= 0.25 + (0.43 - 0.25) * (ratio - 2);
    } else if (ratio <= 4) {
      angleDegree -= 0.45 + (0.58 - 0.43) * (ratio - 3);
    } else if (ratio <= 5) {
      angleDegree -= 0.58 + (0.7 - 0.58) * (ratio - 4);
    } else if (ratio <= 6) {
      angleDegree -= 0.7 + (0.82 - 0.7) * (ratio - 5);
    } else if (ratio <= 7) {
      angleDegree -= 0.8 + (0.9 - 0.82) * (ratio - 6);
    } else if (ratio <= 10) {
      angleDegree -= 1;
    } else {
      angleDegree -= 1.5;
    }
  }
  return newContainerWidht + Math.sin(angleDegree) * rotateDistance;
};

const getContainerWidth = (
  activeSLideWidth: number,
  activeSlideHeight: number,
  perSlideOffset: number
): number => {
  return (
    2 *
      (getWidthAllCards(activeSLideWidth, activeSlideHeight, perSlideOffset) -
        activeSLideWidth) +
    activeSLideWidth
  );
};

interface marginValues {
  marginTop: number;
  marginBottom: number;
}
const getMargin = (
  activeSLideWidth: number,
  activeSlideHeight: number
): marginValues => {
  const perspective = 1000;

  const perspectiveFactor = perspective / (perspective + 400);
  const lastSlideWidth = activeSLideWidth * perspectiveFactor;
  const lastSlideHeight = activeSlideHeight * perspectiveFactor;
  const baseMultiplier = 0.34;
  const aspectRatio = activeSLideWidth / activeSlideHeight;
  const aspectRatioThresholds: [number, number][] = [
    [2, 1.76],
    [3, 1.79],
    [4, 1.83],
    [5, 1.86],
    [6, 1.89],
    [7, 1.91],
    [9, 1.93],
    [11, 1.96],
  ];

  let rotatedLastSlideAndInitialLastSlideDistanceTop;
  let rotatedLastSlideAndInitialLastSlideDistanceBottom =
    (lastSlideWidth / 2) * baseMultiplier;

  for (const [threshold, divisor] of aspectRatioThresholds) {
    if (aspectRatio >= threshold) {
      rotatedLastSlideAndInitialLastSlideDistanceTop =
        (lastSlideWidth - lastSlideWidth / divisor) * baseMultiplier;
    }
  }
  let marginBottom = Math.max(
    0,
    (rotatedLastSlideAndInitialLastSlideDistanceBottom || 0) -
      (activeSlideHeight - lastSlideHeight) / 2
  );
  let marginTop = Math.max(
    0,
    (rotatedLastSlideAndInitialLastSlideDistanceTop || 0) -
      (activeSlideHeight - lastSlideHeight) / 2
  );

  return {marginTop, marginBottom};
};

export {getContainerWidth, getMargin};
