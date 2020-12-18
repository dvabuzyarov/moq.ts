// @ts-ignore
import { Spy, SpyObj } from "jasmine";
// @ts-ignore
import { Type } from "../lib/static.injector/type";
import { StaticProvider } from "../lib/static.injector/interface/provider";
import { Injector } from "../lib/static.injector/injector";
import { InjectionToken } from "../lib/static.injector/injection_token";
import { Mock, MoqAPI } from "moq.ts";

export type SpiedObject<T> = T & {
    [K in keyof T]: T[K] extends () => void ? T[K] & SpiedObject<T> & Spy : SpiedObject<T[K]>;
};

let injector: Injector;

export function createInjector(providers: StaticProvider[]) {
    injector = Injector.create({providers});
    return injector;
}

export const createInjector2 = <T>(subject: Type<T>, dependencies: (Type<any> | InjectionToken<any>)[]) => {
    const providers = [
        {provide: subject, useClass: subject, deps: dependencies},
        ...dependencies.map(dep => ({provide: dep, useValue: new Mock().object(), deps: []}))
    ];
    injector = Injector.create({providers});
    return injector;
};

export const resolve2 = <T>(token: Type<T> | InjectionToken<T>) => injector.get(token) as T;
export const resolveMock = <T>(token: Type<T> | InjectionToken<T>) => injector.get(token)[MoqAPI] as Mock<T>;

export function resolve<T>(token: Type<T> | InjectionToken<T>): SpyObj<T> & Spy {
    return injector.get(token) as any;
}
