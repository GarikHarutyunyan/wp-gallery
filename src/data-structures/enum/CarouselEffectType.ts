import {ISelectOption} from 'components/controls/SelectControl';

export enum CarouselEffects {
  COVERFLOW = 'coverflow',
  CREATIVE = 'creative',
  FLIP = 'flip',
}

export const CarouselEffectsOptions: ISelectOption[] = [
  {value: CarouselEffects.COVERFLOW, title: 'coverflow'},
  {value: CarouselEffects.CREATIVE, title: 'creative'},
  {value: CarouselEffects.FLIP, title: 'flip'},
];