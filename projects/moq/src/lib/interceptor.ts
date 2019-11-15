import { GetTrap } from "./traps/get.trap";
import { SetTrap } from "./traps/set.trap";
import { ApplyTrap } from "./traps/apply.trap";
import { GetPrototypeOfTrap } from "./traps/get-prototype-of.trap";
import { SetPrototypeOfTrap } from "./traps/set-prototype-of.trap";

/**
 * @hidden
 */
export class Interceptor<T> {
    private _proxy: T;

    constructor(private target: any,
                private mockName: string,
                private getTrap: GetTrap,
                private setTrap: SetTrap,
                private applyTrap: ApplyTrap,
                private getPrototypeOfTrap: GetPrototypeOfTrap,
                private setPrototypeOfTrap: SetPrototypeOfTrap) {
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
            apply: (target, thisArg, args) => this.applyTrap.intercept(target, thisArg, args),
            getPrototypeOf: () => this.getPrototypeOfTrap.intercept(),
            setPrototypeOf: (target, prototype) => this.setPrototypeOfTrap.intercept(prototype)
        };

        if (this.mockName) {
            options["mockName"] = this.mockName;
        }

        return new Proxy(this.target, options);
    }
}
