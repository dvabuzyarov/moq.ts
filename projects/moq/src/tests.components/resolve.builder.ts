// @ts-ignore
import { Spy, SpyObj } from "jasmine";
// @ts-ignore
import { Type } from "../lib/static.injector/type";
import { StaticProvider } from "../lib/static.injector/interface/provider";
import { Injector } from "../lib/static.injector/injector";
import { InjectionToken } from "../lib/static.injector/injection_token";
import { Mock, MoqAPI } from "moq.ts";
import { InjectionFactory, TypeOfInjectionFactory } from "../lib/injector/injection-factory";

export type SpiedObject<T> = T & {
    [K in keyof T]: T[K] extends () => void ? T[K] & SpiedObject<T> & Spy : SpiedObject<T[K]>;
};

let injector: Injector;

export const createInjector = <T>(
    subject: Type<T>,
    dependencies: (Type<any> | InjectionToken<any>)[],
    options: { providers?: StaticProvider[] } = {providers: []}) => {

    const providers = [
        {provide: subject, useClass: subject, deps: dependencies},
        ...dependencies.map(dep => ({provide: dep, useValue: new Mock().object(), deps: []})),
        ...options.providers
    ];
    injector = Injector.create({providers});
    return injector;
};

export const createInjectorFromProviders = <T>(providers: StaticProvider[]) => {
    injector = Injector.create({providers});
    return injector;
};

export const resolve2 = <T,
    R = T extends InjectionFactory ? TypeOfInjectionFactory<T> : T>(token: Type<T> | InjectionToken<T>) =>
    injector.get(token) as unknown as R;

export const resolveMock = <T,
    R = T extends InjectionFactory ? TypeOfInjectionFactory<T> : T>(token: Type<T> | InjectionToken<T>) =>
    injector.get(token)[MoqAPI] as Mock<R>;

export function resolve<T>(token: Type<T> | InjectionToken<T>): SpyObj<T> & Spy {
    return injector.get(token) as any;
}
