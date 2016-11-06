export interface IExpression<T, TResult> {
    (instance: T): TResult;
}

export interface IExpressionInfo {
    name: string;
    arguments: any[];
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

export function expression<T, TResult>(expression: IExpression<T, TResult>): IExpressionInfo {
    const info: IExpressionInfo = {name: undefined, arguments: undefined};

    const proxy = expressionProxy(info);
    expression(proxy);

    return info;
}

