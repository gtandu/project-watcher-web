import { BaseObject } from './base-object';

export abstract class Media extends BaseObject {
  name: string;
  description: string;
  releasedDate: number;
  coverPictureUrl: string;
  rate: number;
  review: string;
  state: string;

  constructor(id: number | undefined, name: string, description: string, releasedDate: number, coverPictureUrl: string, rate: number, review: string, state: string) {
    super(id);
    this.name = name;
    this.description = description;
    this.releasedDate = releasedDate;
    this.coverPictureUrl = coverPictureUrl;
    this.rate = rate;
    this.review = review;
    this.state = state;
  }
}
