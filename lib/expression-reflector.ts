import {It} from './expression-predicates';

export interface IExpression<T> {
    (instance: T): void | It<T>;
}

export class MethodInfo {
    name?: string;
    arguments?: any[];
}

export class GetPropertyInfo {
    name: string;
}
export class SetPropertyInfo {
    name: string;
    value: any;
}

export class ExpressionReflector {

    private reflectedInfo;

    private expressionProxy(): any {

        const options = {
            get: (target, name) => {
                this.reflectedInfo = new GetPropertyInfo();
                this.reflectedInfo.name = name;
                return (...args)=> {
                    this.reflectedInfo = new MethodInfo();
                    this.reflectedInfo.name = name;
                    this.reflectedInfo.arguments = args
                }
            },
            set: (target, name, value, receiver) => {
                this.reflectedInfo = new SetPropertyInfo();
                this.reflectedInfo.name = name;
                this.reflectedInfo.value = value;
                return true;
            },

            apply: (target, thisArg, args)=> {
                this.reflectedInfo = new MethodInfo();
                this.reflectedInfo.arguments = args;
            }
        };

        return new Proxy(function () {
        }, options);
    }

    public reflect<T>(expression: IExpression<T>): MethodInfo | GetPropertyInfo | SetPropertyInfo | It<T> {
        this.reflectedInfo = undefined;

        const proxy = this.expressionProxy();
        const predicate = expression(proxy);

        return predicate instanceof It ? predicate : this.reflectedInfo;
    }
}

