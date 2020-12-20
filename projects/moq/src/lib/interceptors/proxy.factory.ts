import { GetTrap } from "./get.trap";
import { SetTrap } from "./set.trap";
import { ApplyTrap } from "./apply.trap";
import { GetPrototypeOfTrap } from "./get-prototype-of.trap";
import { SetPrototypeOfTrap } from "./set-prototype-of.trap";
import { HasTrap } from "./has.trap";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { TypeofInjectionToken } from "../typeof-injection-token";
import { ConstructTrap } from "./construct.trap";

/**
 * @hidden
 */
export class ProxyFactory<T> {
    private _proxy: T;

    constructor(private readonly options: TypeofInjectionToken<typeof MOCK_OPTIONS>,
                private readonly getTrap: GetTrap,
                private readonly setTrap: SetTrap,
                private readonly hasTrap: HasTrap,
                private readonly applyTrap: ApplyTrap,
                private readonly getPrototypeOfTrap: GetPrototypeOfTrap,
                private readonly setPrototypeOfTrap: SetPrototypeOfTrap,
                private readonly constructTrap: ConstructTrap) {
    }

    public object(): T {
        if (this._proxy === undefined) {
            this._proxy = this.createObject();
        }

        return this._proxy;
    }

    private createObject(): T {
        const options = {
            get: (target, name) => this.getTrap.intercept(name),
            set: (target, name, value) => this.setTrap.intercept(target, name, value),
            has: (target, name) => this.hasTrap.intercept(name),
            apply: (target, thisArg, args) => this.applyTrap.intercept(target, thisArg, args),
            getPrototypeOf: () => this.getPrototypeOfTrap.intercept(),
            setPrototypeOf: (target, prototype) => this.setPrototypeOfTrap.intercept(prototype),
            construct: (target, args) => this.constructTrap.intercept(args)
        };

        if (this.options.name) {
            options["mockName"] = this.options.name;
        }

        return new Proxy(this.options.target, options);
    }
}
