import { Injector } from "../static.injector/injector";
import { ReflectingProxyFactory } from "./reflecting-proxy.factory";
import { GetReflectorTrap } from "./traps/get.reflector-trap";
import { SetReflectorTrap } from "./traps/set.reflector-trap";
import { ApplyReflectorTrap } from "./traps/apply.reflector-trap";
import { HasReflectorTrap } from "./traps/has.reflector-trap";
import { ConstructReflectorTrap } from "./traps/construct.reflector-trap";
import { StaticProvider } from "../static.injector/interface/provider";
import { APPLY_RETURN_VALUE, CONSTRUCT_RETURN_VALUE, EXPRESSIONS, GET_RETURN_VALUE } from "./expression-reflector";

export class ReflectingProxyInjectorFactory {
    create(options: { providers: StaticProvider[] } = {providers: []}) {
        const providers = [
            {provide: EXPRESSIONS, useValue: [], deps: []},
            {provide: ReflectingProxyFactory, useClass: ReflectingProxyFactory, deps: [Injector]},
            {provide: GetReflectorTrap, useClass: GetReflectorTrap, deps: [GET_RETURN_VALUE, EXPRESSIONS]},
            {provide: GET_RETURN_VALUE, useExisting: ReflectingProxyFactory, deps: []},
            {provide: SetReflectorTrap, useClass: SetReflectorTrap, deps: [EXPRESSIONS]},
            {provide: ApplyReflectorTrap, useClass: ApplyReflectorTrap, deps: [APPLY_RETURN_VALUE, EXPRESSIONS]},
            {provide: APPLY_RETURN_VALUE, useExisting: ReflectingProxyFactory, deps: []},
            {provide: HasReflectorTrap, useClass: HasReflectorTrap, deps: [EXPRESSIONS]},
            {
                provide: ConstructReflectorTrap,
                useClass: ConstructReflectorTrap,
                deps: [CONSTRUCT_RETURN_VALUE, EXPRESSIONS]
            },
            {provide: CONSTRUCT_RETURN_VALUE, useExisting: ReflectingProxyFactory, deps: []},
            ...options.providers
        ];
        return Injector.create({providers});
    }
}
