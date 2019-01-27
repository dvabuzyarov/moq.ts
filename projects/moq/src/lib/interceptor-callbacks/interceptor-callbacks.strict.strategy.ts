import { Preset } from "../preset";
import { Expressions } from "../expressions";
import { Tracker } from "../tracker";
import { IInterceptorCallbacksStrategy } from "./interceptor-callbacks";

/**
 * @hidden
 */
export class InterceptorCallbacksStrictStrategy<T> implements IInterceptorCallbacksStrategy {

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
        const hasNamedMethod = this.definedSetups.hasNamedMethod(methodName);
        if (hasNamedMethod === true) return true;

        if (prototype !== null && prototype[methodName] instanceof Function) {
            return true;
        }

        return false;
    }
}
