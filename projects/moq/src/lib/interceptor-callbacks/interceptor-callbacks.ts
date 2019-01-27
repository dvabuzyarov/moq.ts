import { Preset } from "../preset";
import { Expressions } from "../expressions";
import { Tracker } from "../tracker";
import { InterceptorCallbacksLooseStrategy } from "./interceptor-callbacks.loose.strategy";
import { InterceptorCallbacksStrictStrategy } from "./interceptor-callbacks.strict.strategy";

/**
 * @obsolete
 * @deprecated
 */
export enum MockBehavior {
    Strict,
    Loose
}

/**
 * @hidden
 */
export interface IInterceptorCallbacksStrategy {
    intercepted(expression: Expressions): void;

    hasNamedMethod(methodName: string, prototype: any): boolean;

    invoke(expression: Expressions): any;
}

/**
 * @hidden
 */
export interface IInterceptorCallbacks extends IInterceptorCallbacksStrategy {
    setBehaviorStrategy(behavior: MockBehavior): void;
}

/**
 * @hidden
 */
export class InterceptorCallbacks<T> implements IInterceptorCallbacks {
    private activeStrategy: IInterceptorCallbacksStrategy;

    constructor(private strictStrategy: IInterceptorCallbacksStrategy,
                private looseStrategy: IInterceptorCallbacksStrategy) {

        this.activeStrategy = strictStrategy;
    }

    public invoke(expression: Expressions): any {
        return this.activeStrategy.invoke(expression);
    }

    public intercepted(expression: Expressions): void {
        return this.activeStrategy.intercepted(expression);
    }

    public hasNamedMethod(methodName: string, prototype: any): boolean {
        return this.activeStrategy.hasNamedMethod(methodName, prototype);
    }

    public setBehaviorStrategy(behavior: MockBehavior): void {
        if (behavior === MockBehavior.Strict) {
            this.activeStrategy = this.strictStrategy;
        }

        if (behavior === MockBehavior.Loose) {
            this.activeStrategy = this.looseStrategy;
        }
    }
}

/**
 * @hidden
 */
export function interceptorCallbacksFactory<T>(definedSetups: Preset<T>, tracker: Tracker): InterceptorCallbacks<T> {
    const strictStrategy = new InterceptorCallbacksStrictStrategy<T>(definedSetups, tracker);
    const looseStrategy = new InterceptorCallbacksLooseStrategy<T>(definedSetups, tracker);
    return new InterceptorCallbacks<T>(strictStrategy, looseStrategy);
}
