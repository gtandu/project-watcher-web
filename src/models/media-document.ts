import { BaseObject } from './base-object';
export enum MediaType {
  MANGA = 'manga'
}
export class MediaDocument extends BaseObject {
  name: string;
  description: string;
  releasedDate: number;
  coverPictureUrl: string;
  rate: number;
  review: string;
  state: string;
  type: MediaType;

  constructor(id: number | undefined, name: string, description: string, releasedDate: number, coverPictureUrl: string, rate: number, review: string, state: string, type: MediaType) {
    super(id);
    this.name = name;
    this.description = description;
    this.releasedDate = releasedDate;
    this.coverPictureUrl = coverPictureUrl;
    this.rate = rate;
    this.review = review;
    this.state = state;
    this.type = type;
  }
}
