export interface Filters<T> {
  filter(filters: Partial<T>): Promise<T[]>;
}
