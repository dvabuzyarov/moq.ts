export interface IExpression<T, TResult> {
    (instance: T): TResult;
}

export interface IExpressionInfo {
    name: string;
    arguments: any[];
    next: IExpressionInfo;
}

function expressionProxy(info: IExpressionInfo, previous?: IExpressionInfo): any {
    const next: IExpressionInfo = {name: undefined, arguments: undefined, next: undefined};

    const setNext = ()=>{
        if (previous !== undefined)
            previous.next = info;
    };

    const options = {
        get(target, name) {
            setNext();
            info.name = name;
            return expressionProxy(next, info);
        },

        apply(target, thisArg, args){
            if (previous !== undefined && previous.name !== undefined && previous.arguments === undefined){
                previous.arguments = args;
                return expressionProxy(next, previous);
            } else {
                setNext();
                info.arguments = args;
                return expressionProxy(next, info);
            }
        }
    };

    return new Proxy(function () {}, options);
}

export function expression<T, TResult>(expression: IExpression<T, TResult>): IExpressionInfo {
    const info: IExpressionInfo = {name: undefined, arguments: undefined, next: undefined};

    const proxy = expressionProxy(info);
    expression(proxy);

    return info;
}

