import { InjectionToken, Injector, StaticProvider, Type } from "@angular/core";
import { IMock, Mock, MoqAPI } from "moq.ts";
import { IOptions, IParameter, moqInjectorProviders } from "ng-auto-moq";
import { InjectionFactory, TypeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";

export let injector: Injector;
export let testedToken: Type<any>;

export interface IMoqInjectorOptions<T> extends IOptions<T> {
    providers?: StaticProvider[];
}

export function createMoqInjector<T>(constructor: Type<T>, options: IMoqInjectorOptions<T> = {}): Injector {
    testedToken = constructor;
    options.mockFactory = options.mockFactory ? options.mockFactory : mockFactory;
    const customProvider = options.providers ? options.providers : [];
    const providers = [...moqInjectorProviders(constructor, options), ...customProvider];
    injector = Injector.create({providers});
    return injector;
}

export function resolve<T, R = T extends InjectionFactory ? TypeOfInjectionFactory<T> : T>(token: Type<T> | InjectionToken<T>): IMock<R> {
    const object = injector.get(token) as unknown;
    return object[MoqAPI];
}

export function get<T,
    R = T extends InjectionFactory ? TypeOfInjectionFactory<T> : T>(token: Type<T> | InjectionToken<T> = testedToken): R {
    return injector.get(token) as any;
}

function mockFactory({token, displayName}: IParameter) {
    if (typeof token === "function") {
        const target = () => undefined;
        return new Mock<any>({name: displayName, target})
            .prototypeof(token.prototype);
    }

    return new Mock<any>({name: displayName});
}
