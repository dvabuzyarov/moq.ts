import {It} from './expression-predicates';
import {
    ExpectedGetPropertyExpression, ExpectedNamedMethodExpression,
    ExpectedSetPropertyExpression, ExpectedMethodExpression, ExpectedExpressions
} from './expected-expressions';

export interface IExpectedExpression<T> {
    (instance: T): void | any | It<T>;
}


export class ExpectedExpressionReflector {

    private reflectedInfo;

    private expressionProxy(): any {

        const options = {
            get: (target, name) => {
                this.reflectedInfo = new ExpectedGetPropertyExpression(name);
                return (...args) => {
                    this.reflectedInfo = new ExpectedNamedMethodExpression(name, args);
                }
            },

            set: (target, name, value) => {
                this.reflectedInfo = new ExpectedSetPropertyExpression(name, value);
                return true;
            },

            apply: (target, thisArg, args) => {
                this.reflectedInfo = new ExpectedMethodExpression(args);
            }
        };

        return new Proxy(function () {
        }, options);
    }

    public reflect<T>(expression: IExpectedExpression<T>): ExpectedExpressions<T> {
        this.reflectedInfo = undefined;

        const proxy = this.expressionProxy();
        const predicate = expression(proxy);

        return predicate instanceof It ? predicate : this.reflectedInfo;
    }
}

