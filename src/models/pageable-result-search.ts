export interface PageableSearch {
  pageNumber?: number;
  pageSize?: number;
  sort?: string[];
  offset?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface PageableResultSearch<Type> {
  content: Type[];
  pageable?: PageableSearch;
  size?: number;
  number?: number;
  sort?: string[];
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}
