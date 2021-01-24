import { Expressions, SetPropertyExpression } from "../expressions";
import { InjectionFactory } from "../../injector/injection-factory";

export class SetTrap implements InjectionFactory {
    constructor(
        private readonly expressions: Expressions<unknown>[]) {
        return this.factory() as any;
    }

    factory() {
        return (target, name, value) => {
            this.expressions.push(new SetPropertyExpression(name, value));
            return true;
        };
    }
}
