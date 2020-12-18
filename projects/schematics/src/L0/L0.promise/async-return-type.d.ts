export type AsyncReturnType<T> = T extends Promise<infer U> ? U : never;
