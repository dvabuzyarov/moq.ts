import {It} from './expression-predicates';

export interface IExpression<T> {
    (instance: T): void | It<T>;
}

export class NamedMethodInfo {
    public arguments: any[];

    constructor(public name: string,
                args: any[]) {
        this.arguments = args;
    }
}

export class MethodInfo {
    public arguments: any[];

    constructor(args: any[]) {
        this.arguments = args;
    }
}

export class GetPropertyInfo {
    constructor(public name: string) {

    }
}
export class SetPropertyInfo {
    constructor(public name: string,
                public value: any) {

    }
}

export class ExpressionReflector {

    private reflectedInfo;

    private expressionProxy(): any {

        const options = {
            get: (target, name) => {
                this.reflectedInfo = new GetPropertyInfo(name);
                return (...args)=> {
                    this.reflectedInfo = new NamedMethodInfo(name, args);
                }
            },

            set: (target, name, value, receiver) => {
                this.reflectedInfo = new SetPropertyInfo(name,value);
                return true;
            },

            apply: (target, thisArg, args)=> {
                this.reflectedInfo = new MethodInfo(args);
            }
        };

        return new Proxy(function () {
        }, options);
    }

    public reflect<T>(expression: IExpression<T>): MethodInfo | GetPropertyInfo | SetPropertyInfo | NamedMethodInfo | It<T> {
        this.reflectedInfo = undefined;

        const proxy = this.expressionProxy();
        const predicate = expression(proxy);

        return predicate instanceof It ? predicate : this.reflectedInfo;
    }
}

