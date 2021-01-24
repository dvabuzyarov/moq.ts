import { Expressions } from "./expressions";
import { Injector } from "../static.injector/injector";
import { EXPRESSIONS } from "./expressions.injection-token";
import { ReflectorProxy } from "./reflector-proxy";
import { GetTrap } from "./traps/get.trap";
import { SetTrap } from "./traps/set.trap";
import { ApplyTrap } from "./traps/apply.trap";
import { HasTrap } from "./traps/has.trap";
import { ConstructTrap } from "./traps/construct.trap";

export class ReflectorProxyFactory {
    create<T>(expressions: Expressions<T>[]): T {
        const providers = [
            {provide: EXPRESSIONS, useValue: expressions, deps: []},
            {provide: ReflectorProxy, useClass: ReflectorProxy, deps: [Injector]},
            {provide: GetTrap, useClass: GetTrap, deps: [ReflectorProxy, EXPRESSIONS]},
            {provide: SetTrap, useClass: SetTrap, deps: [EXPRESSIONS]},
            {provide: ApplyTrap, useClass: ApplyTrap, deps: [ReflectorProxy, EXPRESSIONS]},
            {provide: HasTrap, useClass: HasTrap, deps: [EXPRESSIONS]},
            {provide: ConstructTrap, useClass: ConstructTrap, deps: [ReflectorProxy, EXPRESSIONS]},
        ];
        const injector = Injector.create({providers});
        return injector.get(ReflectorProxy).factory() as unknown as T;
    }
}
