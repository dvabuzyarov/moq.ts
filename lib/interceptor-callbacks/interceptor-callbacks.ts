import {Expressions} from '../expressions';
import {InterceptorCallbacksStrictStrategy} from './interceptor-callbacks.strict.strategy';
import {DefinedSetups} from '../defined-setups';
import {Tracker} from '../tracker';
import {InterceptorCallbacksLooseStrategy} from './interceptor-callbacks.loose.strategy';

export const enum MockBehavior{
    Strict,
    Loose
}

export interface IInterceptorCallbacksStrategy {
    intercepted(expression: Expressions): any;
    hasNamedMethod(methodName: string): boolean;
}

export interface IInterceptorCallbacks extends IInterceptorCallbacksStrategy {
    setBehaviorStrategy(behavior: MockBehavior): void;
}


export function interceptorCallbacksFactory<T>(definedSetups: DefinedSetups<T>, tracker: Tracker): InterceptorCallbacks<T> {
    const strictStrategy = new InterceptorCallbacksStrictStrategy<T>(definedSetups, tracker);
    const looseStrategy = new InterceptorCallbacksLooseStrategy<T>(definedSetups, tracker);
    return new InterceptorCallbacks<T>(strictStrategy, looseStrategy);
}

export class InterceptorCallbacks<T> implements IInterceptorCallbacks {
    private activeStrategy: IInterceptorCallbacksStrategy;

    constructor(private strictStrategy: IInterceptorCallbacksStrategy,
                private looseStrategy: IInterceptorCallbacksStrategy) {

        this.activeStrategy = strictStrategy;
    }

    public intercepted(expression: Expressions): any {
        return this.activeStrategy.intercepted(expression);
    }

    public hasNamedMethod(methodName: string): boolean {
        return this.activeStrategy.hasNamedMethod(methodName);
    }

    public setBehaviorStrategy(behavior: MockBehavior): void {
        if (behavior === MockBehavior.Strict)
            this.activeStrategy = this.strictStrategy;

        if (behavior === MockBehavior.Loose)
            this.activeStrategy = this.looseStrategy;
    }
}