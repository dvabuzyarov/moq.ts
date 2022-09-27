import { InjectionToken, Injector, StaticProvider, Type } from "@angular/core";
import { IMock, Mock, MoqAPI } from "moq.ts";
import { IOptions, IParameter, MockFactory, moqInjectorProvidersFactory } from "ng-auto-moq";
import { InjectionFactory, TypeofInjectionFactory } from "@testdozer/ng-injector-types";
import { nameof } from "./nameof";

export let injector: Injector;
export let testedToken: Type<any>;

export interface IMoqInjectorOptions extends IOptions {
    providers?: StaticProvider[];
}

export const createMoqInjector = <T>(constructor: Type<T>, options: IMoqInjectorOptions = {}): Injector => {
    testedToken = constructor;
    const moqInjectorProviders = moqInjectorProvidersFactory({
        providers: [
            {provide: MockFactory, useValue: mockFactory, deps: []},
        ]
    });
    const customProvider = options.providers || [];
    const providers = [...moqInjectorProviders(constructor, options), ...customProvider];
    injector = Injector.create({providers});
    return injector;
};

export function resolveMock<T,
    R = T extends InjectionFactory ? TypeofInjectionFactory<T> : T>(token: Type<T> | InjectionToken<T>): IMock<R> {
    const object = injector.get(token) as unknown;
    // todo: add "strictNullChecks": true to tsconfig.base.json
    return object[MoqAPI];
}

export function resolve<T,
    R = T extends InjectionFactory ? TypeofInjectionFactory<T> : T>(token: Type<T> | InjectionToken<T> = testedToken): R {
    return injector.get(token) as any;
}

function mockFactory({token, displayName}: IParameter) {
    if (typeof token === "function") {
        const propertyKey = nameof<InjectionFactory>("factory");
        const injectionFactory = Reflect.has(token, propertyKey) || Reflect.has(token.prototype, propertyKey);
        const target = injectionFactory ? () => undefined : {};
        return new Mock<any>({name: displayName, target})
            .prototypeof(token.prototype);
    }

    return new Mock<any>({name: displayName});
}
