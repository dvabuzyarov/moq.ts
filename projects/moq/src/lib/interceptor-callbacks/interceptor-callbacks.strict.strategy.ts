import { DefinedSetups } from "../defined-setups";
import { Expressions, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";
import { Tracker } from "../tracker";
import { IInterceptorCallbacksStrategy } from "./interceptor-callbacks";
/**
 * @hidden
 */
export class InterceptorCallbacksStrictStrategy<T> implements IInterceptorCallbacksStrategy {

    constructor(private definedSetups: DefinedSetups<T>,
                private tracker: Tracker) {

    }

    public intercepted(expression: Expressions): void {
        this.tracker.add(expression);
    }

    public invoke(expression: Expressions): any {
        const setup = this.definedSetups.get(expression);
        if (setup !== undefined) {
            if (expression instanceof MethodExpression) {
                return setup.invoke((<MethodExpression>expression).args);
            }
            if (expression instanceof NamedMethodExpression) {
                return setup.invoke((<NamedMethodExpression>expression).args);
            }
            if (expression instanceof SetPropertyExpression) {
                return setup.invoke([(<SetPropertyExpression>expression).value]);
            }

            return setup.invoke();
        }
        return undefined;
    }

    public hasNamedMethod(methodName: string, prototype: any): boolean {
        const hasNamedMethod = this.definedSetups.hasNamedMethod(methodName);
        if (hasNamedMethod === true) return true;

        if (prototype !== null && prototype[methodName] instanceof Function) {
            return true;
        }

        return false;
    }
}
