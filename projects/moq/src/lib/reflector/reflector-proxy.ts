import { Injector } from "../static.injector/injector";
import { GetTrap } from "./traps/get.trap";
import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { SetTrap } from "./traps/set.trap";
import { ApplyTrap } from "./traps/apply.trap";
import { HasTrap } from "./traps/has.trap";
import { ConstructTrap } from "./traps/construct.trap";

export class ReflectorProxy {
    constructor(private readonly injector: Injector) {
    }

    factory() {
        const get = this.injector.get(GetTrap) as unknown as TypeOfInjectionFactory<GetTrap>;
        const set = this.injector.get(SetTrap) as unknown as TypeOfInjectionFactory<SetTrap>;
        const apply = this.injector.get(ApplyTrap) as unknown as TypeOfInjectionFactory<ApplyTrap>;
        const has = this.injector.get(HasTrap) as unknown as TypeOfInjectionFactory<HasTrap>;
        const construct = this.injector.get(ConstructTrap) as unknown as TypeOfInjectionFactory<ConstructTrap>;
        const options = {get, set, apply, has, construct};
        const target = function () {
            return undefined;
        };
        return new Proxy(target, options);
    }
}
