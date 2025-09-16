import { ISettingsDTO } from 'data-structures';

export interface ITemplate extends Partial<ISettingsDTO> {
  template_id: string | number;
  title: string;
  template: boolean;
  templateType: string;
}

export interface ITemplateReference {
  id: string | number;
  title: string;
  type?: string;
  paid: boolean;
  preview_url?: string;
  youtube_link?: string;
}
