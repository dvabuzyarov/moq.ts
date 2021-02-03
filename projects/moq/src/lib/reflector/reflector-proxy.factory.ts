import { Expressions } from "./expressions";
import { Injector } from "../static.injector/injector";
import { EXPRESSIONS } from "./expressions.injection-token";
import { ReflectorProxy } from "./reflector-proxy";
import { GetReflectorTrap } from "./traps/get.reflector-trap";
import { SetReflectorTrap } from "./traps/set.reflector-trap";
import { ApplyReflectorTrap } from "./traps/apply.reflector-trap";
import { HasReflectorTrap } from "./traps/has.reflector-trap";
import { ConstructReflectorTrap } from "./traps/construct.reflector-trap";

export class ReflectorProxyFactory {
    create<T>(expressions: Expressions<T>[]): T {
        const providers = [
            {provide: EXPRESSIONS, useValue: expressions, deps: []},
            {provide: ReflectorProxy, useClass: ReflectorProxy, deps: [Injector]},
            {provide: GetReflectorTrap, useClass: GetReflectorTrap, deps: [ReflectorProxy, EXPRESSIONS]},
            {provide: SetReflectorTrap, useClass: SetReflectorTrap, deps: [EXPRESSIONS]},
            {provide: ApplyReflectorTrap, useClass: ApplyReflectorTrap, deps: [ReflectorProxy, EXPRESSIONS]},
            {provide: HasReflectorTrap, useClass: HasReflectorTrap, deps: [EXPRESSIONS]},
            {provide: ConstructReflectorTrap, useClass: ConstructReflectorTrap, deps: [ReflectorProxy, EXPRESSIONS]},
        ];
        const injector = Injector.create({providers});
        return injector.get(ReflectorProxy).factory() as unknown as T;
    }
}
