export interface Pagination<T> {
  paginate(page: number, pageSize: number): Promise<T[]>;
}
