import { Expressions } from "../expressions";
import { InjectionFactory } from "../../injector/injection-factory";
import { GetPropertyExpression, MethodExpression } from "../expressions";

export class MethodReflectorTrap implements InjectionFactory {
    constructor(
        private readonly expressions: Expressions<unknown>[]) {
        return this.factory() as any;
    }

    factory() {
        return (target, thisArg, args) => {
            const last = this.expressions.pop();
            if (last instanceof GetPropertyExpression) {
                this.expressions.push(new MethodExpression(last.name, args));
            } else {
                if (last !== undefined) {
                    this.expressions.push(last);
                }
            }
            return undefined;
        };
    }
}
