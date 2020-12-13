export interface InjectionFactory {
    factory(...args: any[]): any;
}

export type TypeOfInjectionFactory<T extends InjectionFactory> = ReturnType<T["factory"]>;
