import { Expressions, GetPropertyExpression } from "../expressions";
import { ReflectorProxy } from "../reflector-proxy";
import { InjectionFactory } from "../../injector/injection-factory";

export class GetReflectorTrap implements InjectionFactory {
    constructor(
        private readonly proxy: ReflectorProxy,
        private readonly expressions: Expressions<unknown>[]) {
        return this.factory() as any;
    }

    factory() {
        return (target, name) => {
            this.expressions.push(new GetPropertyExpression(name));
            return this.proxy.factory();
        };
    }
}
