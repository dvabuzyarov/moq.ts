import { Injector } from "../static.injector/injector";
import { GetReflectorTrap } from "./traps/get.reflector-trap";
import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { SetReflectorTrap } from "./traps/set.reflector-trap";
import { ApplyReflectorTrap } from "./traps/apply.reflector-trap";
import { HasReflectorTrap } from "./traps/has.reflector-trap";
import { ConstructReflectorTrap } from "./traps/construct.reflector-trap";
import { IReturnValueFactory } from "./expression-reflector";

export class ReflectingProxyFactory implements IReturnValueFactory {
    constructor(private readonly injector: Injector) {
    }

    create() {
        const get = this.injector.get(GetReflectorTrap) as unknown as TypeOfInjectionFactory<GetReflectorTrap>;
        const set = this.injector.get(SetReflectorTrap) as unknown as TypeOfInjectionFactory<SetReflectorTrap>;
        const apply = this.injector.get(ApplyReflectorTrap) as unknown as TypeOfInjectionFactory<ApplyReflectorTrap>;
        const has = this.injector.get(HasReflectorTrap) as unknown as TypeOfInjectionFactory<HasReflectorTrap>;
        const construct = this.injector.get(ConstructReflectorTrap) as unknown as TypeOfInjectionFactory<ConstructReflectorTrap>;
        const options = {get, set, apply, has, construct};
        const reflector = function () {
            return undefined;
        };
        return new Proxy(reflector, options);
    }
}
