export interface InjectionFactory {
    factory(...args: any[]): any;
}

export type typeOfInjectionFactory<T extends InjectionFactory> = ReturnType<T["factory"]>;
