export interface DBOperations<T> {
  insert(item: Partial<T>): Promise<T>;
  insertMany(items: Partial<T>[]): Promise<T[]>;
  read(id: string): Promise<T | null>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
