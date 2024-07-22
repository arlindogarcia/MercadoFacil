export interface ApiPaginationRes<T> {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  data: T;
}

export interface ApiPaginationResWithoutData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
