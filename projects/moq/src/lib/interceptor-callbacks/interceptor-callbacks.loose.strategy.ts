import { Preset } from "../preset/preset";
import { Expressions, GetPropertyExpression } from "../expressions";
import { Tracker } from "../tracker";
import { IInterceptorCallbacksStrategy } from "./interceptor-callbacks";

/**
 * @hidden
 */
export class InterceptorCallbacksLooseStrategy<T> implements IInterceptorCallbacksStrategy {

    constructor(private definedSetups: Preset<T>,
                private tracker: Tracker) {

    }

    public intercepted(expression: Expressions): void {
        this.tracker.add(expression);
    }

    public invoke(expression: Expressions): any {
        const setup = this.definedSetups.get(expression);
        if (setup !== undefined) {
            return setup.invoke(expression);
        }
        return undefined;
    }

    public hasNamedMethod(methodName: string, prototype: any): boolean {
        const getPropertyExpression = new GetPropertyExpression(methodName);
        const setup = this.definedSetups.get(getPropertyExpression);
        return setup !== undefined ? false : true;
    }
}
