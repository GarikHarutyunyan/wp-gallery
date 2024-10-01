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
  const widthConteinerWithoutTranslateZ =
    2 * activeSLideWidth + distanceBetweenEndFirstSlideAndStartLastSlide;
  const progressToRightWithTranslateZ =
    containerPercentageValue * perspectiveFactor -
    (activeSLideWidth - activeSLideWidth * perspectiveFactor) / 2;
  const newConteinerWidht =
    widthConteinerWithoutTranslateZ -
    (containerPercentageValue - progressToRightWithTranslateZ);
  const lastSlideWidth = activeSLideWidth * perspectiveFactor;
  const lastSlideHeight = activeSlideHeight * perspectiveFactor;
  const rotationRad = 20 * (Math.PI / 180);
  const topRightX = lastSlideWidth * Math.cos(rotationRad);
  const topRightY = lastSlideHeight * Math.sin(rotationRad);
  const rotateDistance = Math.sqrt(
    Math.pow(topRightX - lastSlideWidth, 2) + Math.pow(topRightY - 0, 2)
  );
  let angleDegree = 20;
  if (activeSlideHeight > activeSLideWidth) {
    angleDegree += (activeSlideHeight / activeSLideWidth) * 0.05;
    console.log((activeSlideHeight / activeSLideWidth) * 0.05, angleDegree);
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
  return newConteinerWidht + Math.sin(angleDegree) * rotateDistance;
};
export {getWidthAllCards};
