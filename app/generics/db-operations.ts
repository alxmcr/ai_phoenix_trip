export interface DBOperations<T> {
  create(item: T): Promise<T>;
  read(id: string): Promise<T | null>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
