import {IInterceptorCallbacks} from '../interceptor';
import {GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression} from '../expressions';
import {DefinedSetups} from '../defined-setups';
import {Tracker} from '../tracker';

export class InterceptorCallbacksStrictStrategy<T> implements IInterceptorCallbacks {

    constructor(private definedSetups: DefinedSetups<T>,
                private tracker: Tracker) {

    }

    public intercepted(expression: MethodExpression | GetPropertyExpression | SetPropertyExpression): any {
        this.tracker.add(expression);
        const setup = this.definedSetups.get(expression);
        return setup !== undefined ? setup.invoke() : undefined;
    }

    public interceptedNamedMethod(expression: NamedMethodExpression, getPropertyExpression: GetPropertyExpression): any {
        this.tracker.addNamedMethod(expression, getPropertyExpression);
        const setup = this.definedSetups.get(expression);
        return setup !== undefined ? setup.invoke(expression.arguments) : undefined;
    }

    public hasNamedMethod(methodName: string): boolean {
        return this.definedSetups.hasNamedMethod(methodName);
    }

}