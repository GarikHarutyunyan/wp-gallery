import { ISettingsDTO } from 'data-structures';

export interface ITemplate extends Partial<ISettingsDTO> {
  template_id: string;
  title: string;
  templateType: string;
}

export interface ITemplateReference {
  id: string;
  title: string;
  paid: boolean;
  preview_url?: string;
  youtube_link?: string;
}
