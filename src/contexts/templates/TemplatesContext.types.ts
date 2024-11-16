import {ISettingsDTO} from 'data-structures';

export interface ITemplate extends Partial<ISettingsDTO> {
  template_id: string;
  title: string;
  template: boolean;
}

export interface ITemplateReference {
  id: string;
  title: string;
  isPro: boolean;
}
