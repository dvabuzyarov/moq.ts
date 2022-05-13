import { Injector } from "../static.injector/injector";
import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { MethodReflectorTrap } from "./traps/method.reflector-trap";

export class MethodReflectingProxyFactory {
    constructor(private readonly injector: Injector) {
    }

    create() {
        const apply = this.injector.get(MethodReflectorTrap) as unknown as TypeOfInjectionFactory<MethodReflectorTrap>;
        const options = {apply};
        const reflector = function () {
            return undefined;
        };
        return new Proxy(reflector, options);
    }
}
