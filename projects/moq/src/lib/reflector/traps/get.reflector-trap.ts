import { Expressions } from "../expressions";
import { InjectionFactory } from "../../injector/injection-factory";
import { IReturnValueFactory } from "../expression-reflector";
import { GetPropertyExpression } from "../expressions";

export class GetReflectorTrap implements InjectionFactory {
    constructor(
        private readonly returnValueFactory: IReturnValueFactory,
        private readonly expressions: Expressions<unknown>[]) {
        return this.factory() as any;
    }

    factory() {
        return (target, name) => {
            this.expressions.push(new GetPropertyExpression(name));
            return this.returnValueFactory.create();
        };
    }
}
