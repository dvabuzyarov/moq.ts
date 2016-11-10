import {It} from './expression-predicates';

export interface IExpression<T> {
    (instance: T): void | It<T>;
}

export interface IExpressionInfo {
    name?: string;
    arguments?: any[];
}

function expressionProxy(info: IExpressionInfo): any {

    const options = {
        get(target, name) {
            info.name = name;
            return (...args)=> info.arguments = args
        },

        apply(target, thisArg, args){
            info.arguments = args;
        }
    };

    return new Proxy(function () {  }, options);
}

export function reflectExpression<T>(expression: IExpression<T>): IExpressionInfo| It<T> {
    const info: IExpressionInfo = {};

    const proxy = expressionProxy(info);
    const predicate = expression(proxy);

    return predicate instanceof It ? predicate : info;
}

