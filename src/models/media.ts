import { Base } from './base';

export class Media extends Base {
  name: string;
  description: string;
  releasedDate: number;
  coverPictureUrl: string;
  rate: number;
  review: string;
  state: string;
  type: string;

  constructor(id: string, name: string, description: string, releasedDate: number, coverPictureUrl: string, rate: number, review: string, state: string, type: string) {
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
