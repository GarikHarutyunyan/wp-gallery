import { ISettingsDTO } from 'data-structures';

export type TemplateId = number | string;

export interface ITemplate extends Partial<Omit<ISettingsDTO, 'template_id'>> {
  template_id: TemplateId;
  title: string;
  templateType: string;
}

export interface ITemplateReference {
  id: string;
  title: string;
  paid: boolean;
  preview_url?: string;
  youtube_link?: string;
  thumbnail?: string;
  categories?: string[];
  type?: string;
}
