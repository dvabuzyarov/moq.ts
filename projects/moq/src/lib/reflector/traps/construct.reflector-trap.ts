import { Expressions } from "../expressions";
import { InjectionFactory } from "../../injector/injection-factory";
import { IReturnValueFactory } from "../expression-reflector";
import { NewOperatorExpression } from "../expressions";

export class ConstructReflectorTrap implements InjectionFactory {
    constructor(
        private readonly returnValueFactory: IReturnValueFactory,
        private readonly expressions: Expressions<unknown>[]) {
        return this.factory() as any;
    }

    factory() {
        return (target: any, args: any) => {
            this.expressions.push(new NewOperatorExpression(args));
            return this.returnValueFactory.create();
        };
    }
}
