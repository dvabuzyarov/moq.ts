import { Expressions } from "../expressions";
import { InjectionFactory } from "../../injector/injection-factory";
import { IReturnValueFactory } from "../expression-reflector";
import { GetPropertyExpression, FunctionExpression, MethodExpression } from "../expressions";

export class ApplyReflectorTrap implements InjectionFactory {
    constructor(
        private readonly returnValueFactory: IReturnValueFactory,
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
                this.expressions.push(new FunctionExpression(args));
            }
            return this.returnValueFactory.create();
        };
    }
}
