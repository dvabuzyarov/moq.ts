import { IExpression } from "./expression-reflector";
import { It } from "./expression-predicates";

export class AsyncExpressionDetector {
    public isAsync<T>(expression: IExpression<T>) {
        if (expression instanceof It) {
            return false;
        }

        const get = () => proxy;
        const set = () => true;
        const apply = () => proxy;
        const has = () => false;
        const construct = () => proxy;
        const options = {get, set, apply, has, construct};
        const reflector = function () {
            return undefined;
        };
        const proxy = new Proxy(reflector, options);
        const predicate = expression(proxy as any);

        return predicate instanceof It ? false : predicate instanceof Promise;
    }
}
