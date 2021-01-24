import { Expressions, GetPropertyExpression, MethodExpression, NamedMethodExpression } from "../expressions";
import { ReflectorProxy } from "../reflector-proxy";
import { InjectionFactory } from "../../injector/injection-factory";

export class ApplyTrap implements InjectionFactory {
    constructor(
        private readonly proxy: ReflectorProxy,
        private readonly expressions: Expressions<unknown>[]) {
        return this.factory() as any;
    }

    factory() {
        return (target, thisArg, args) => {
            const last = this.expressions.pop();
            if (last instanceof GetPropertyExpression) {
                this.expressions.push(new NamedMethodExpression(last.name, args));
            } else {
                if (last !== undefined) {
                    this.expressions.push(last);
                }
                this.expressions.push(new MethodExpression(args));
            }
            return this.proxy.factory();
        };
    }
}
