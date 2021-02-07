import { Expressions, NewOperatorExpression } from "../expressions";
import { ReflectorProxy } from "../reflector-proxy";
import { InjectionFactory } from "../../injector/injection-factory";

export class ConstructReflectorTrap implements InjectionFactory {
    constructor(
        private readonly proxy: ReflectorProxy,
        private readonly expressions: Expressions<unknown>[]) {
        return this.factory() as any;
    }

    factory() {
        return (target: any, args: any) => {
            this.expressions.push(new NewOperatorExpression(args));
            return this.proxy.factory();
        };
    }
}
