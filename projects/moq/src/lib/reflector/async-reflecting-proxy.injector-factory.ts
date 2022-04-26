import { Injector } from "../static.injector/injector";
import { StaticProvider } from "../static.injector/interface/provider";
import {
    APPLY_RETURN_VALUE,
    CONSTRUCT_RETURN_VALUE,
    EXPRESSIONS,
    GET_RETURN_VALUE,
    IReturnValueFactory
} from "./expression-reflector";
import { ReflectingProxyInjectorFactory } from "./reflecting-proxy.injector-factory";
import { MethodOnlyReflectingProxyFactory } from "./method-only-reflecting-proxy.factory";
import { MethodReflectorTrap } from "./traps/method.reflector-trap";

export class AsyncReflectingProxyInjectorFactory {
    constructor(private readonly reflectingProxyInjectorFactory: ReflectingProxyInjectorFactory) {
    }

    create(options: { providers: StaticProvider[] } = {providers: []}) {
        const providers = [
            {provide: GET_RETURN_VALUE, useExisting: MethodOnlyReflectingProxyFactory, deps: []},
            {provide: MethodOnlyReflectingProxyFactory, useClass: MethodOnlyReflectingProxyFactory, deps: [Injector]},
            {provide: APPLY_RETURN_VALUE, useValue: {create: () => ({})} as IReturnValueFactory, deps: []},
            {provide: CONSTRUCT_RETURN_VALUE, useValue: {create: () => ({})} as IReturnValueFactory, deps: []},
            {provide: MethodReflectorTrap, useClass: MethodReflectorTrap, deps: [EXPRESSIONS]},
            ...options.providers,
        ];
        return this.reflectingProxyInjectorFactory.create({providers});
    }
}
