import { Expressions, InOperatorExpression } from "../expressions";
import { InjectionFactory } from "../../injector/injection-factory";

export class HasReflectorTrap implements InjectionFactory {
    constructor(
        private readonly expressions: Expressions<unknown>[]) {
        return this.factory() as any;
    }

    factory() {
        return (target, name) => {
            this.expressions.push(new InOperatorExpression(name));
            return true;
        };
    }
}
