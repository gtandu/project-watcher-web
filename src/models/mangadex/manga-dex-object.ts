export interface MangaDexAuthTokenResponse {
  session: string;
  refresh: string;
}

export interface MangaDexAuthResponse {
  result: string;
  token: MangaDexAuthTokenResponse;
}

export interface MangaDexResponse {
  result: string;
  response: string;
  data: MangaDexObject[];
}

export interface MangaDexObjectAttributesLanguageData {
  en: string;
  fr: string;
}

export enum MangaDexStatus {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  HIATUS = 'hiatus',
  CANCELLED = 'cancelled'
}

export function getMangaDexStatusMessage(state: MangaDexStatus): string {
  switch(state) {
    case MangaDexStatus.ONGOING:
      return $localize`ongoing`;
    case MangaDexStatus.COMPLETED:
      return $localize`completed`;
    case MangaDexStatus.HIATUS:
      return $localize`hiatus`;
    case MangaDexStatus.CANCELLED:
      return $localize`cancelled`;
    default:
      return $localize`unknown`;
  }
}

export interface MangaDexObjectAttributes {
  title: MangaDexObjectAttributesLanguageData;
  description: MangaDexObjectAttributesLanguageData;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: MangaDexStatus;
  year: number;
}

export interface MangaDexObjectRelationshipsData {
  id: string;
  type: string;
  attributes: MangaDexObjectRelationshipsAttributesData;
}

export interface MangaDexObjectRelationshipsAttributesData {
  fileName: string;
}

export interface MangaDexObject {
  id: string;
  type: string;
  attributes: MangaDexObjectAttributes;
  relationships: MangaDexObjectRelationshipsData[];
}
