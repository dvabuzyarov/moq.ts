export interface InjectionFactory {
    factory(...args: unknown[]): unknown;
}

export type TypeOfInjectionFactory<T extends InjectionFactory> = ReturnType<T["factory"]>;
