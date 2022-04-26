import { Injector } from "../static.injector/injector";
import { GetReflectorTrap } from "./traps/get.reflector-trap";
import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { SetReflectorTrap } from "./traps/set.reflector-trap";
import { ApplyReflectorTrap } from "./traps/apply.reflector-trap";
import { HasReflectorTrap } from "./traps/has.reflector-trap";
import { ConstructReflectorTrap } from "./traps/construct.reflector-trap";
import { IReturnValueFactory } from "./expression-reflector";
import { MethodReflectorTrap } from "./traps/method.reflector-trap";

export class MethodOnlyReflectingProxyFactory implements IReturnValueFactory {
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
