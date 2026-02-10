import {ISliderSettings} from 'data-structures';

export function getPaginationCSSVars(settings: ISliderSettings) {
  const {
    paginationBulletsBackgroundColor,
    paginationBulletsSize,
    paginationBulletsBorder,
    paginationBulletsBorderRadius,
    paginationBulletsBorderColor,
    paginationActiveBulletBackgroundColor,
    paginationActiveBulletSize,
    paginationActiveBulletBorder,
    paginationActiveBulletBorderColor,
    paginationActiveBulletBorderRadius,
    paginationFractionColor,
    paginationFractionFontSize,
    paginationFractionTextFontFamily,
  } = settings as ISliderSettings;

  return {
    '--slider-pagination-bullet-bg':
      paginationBulletsBackgroundColor || '#aeb0b1',
    '--slider-pagination-bullet-size': `${paginationBulletsSize || 21}px`,

    '--slider-pagination-bullet-border': `${paginationBulletsBorder || 0}px`,
    '--slider-pagination-bullet-border-radius': `${paginationBulletsBorderRadius}px`,
    '--slider-pagination-bullet-border-color':
      paginationBulletsBorderColor || '#ffffff',
    /* ───────────── ACTIVE BULLET ───────────── */
    '--slider-pagination-active-bullet-bg':
      paginationActiveBulletBackgroundColor || '#007aff',
    '--slider-pagination-active-bullet-size': `${
      paginationActiveBulletSize || paginationBulletsSize || 21
    }px`,

    '--slider-pagination-active-bullet-border': `${
      paginationActiveBulletBorder || paginationBulletsBorder
    }px`,
    '--slider-pagination-active-bullet-border-radius': `${
      paginationActiveBulletBorderRadius || paginationBulletsBorderRadius || 0
    }px`,
    '--slider-pagination-active-bullet-border-color':
      paginationActiveBulletBorderColor ||
      paginationBulletsBorderColor ||
      '#ffffff',

    /* ───────────── FRACTION ───────────── */
    '--slider-pagination-fraction-color': paginationFractionColor || '#ffffff',
    '--slider-pagination-fraction-font-size': `${
      paginationFractionFontSize || 16
    }px`,
    '--slider-pagination-fraction-font-family':
      paginationFractionTextFontFamily || 'inherit',
  } as React.CSSProperties;
}
