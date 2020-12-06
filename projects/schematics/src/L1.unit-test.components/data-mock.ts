export type IDataMock<T> = {
  [P in keyof T]?: IDataMock<T[P]>|any;
};

export function dataMock<T>(instance: IDataMock<T>): T {
  return instance as any;
}
