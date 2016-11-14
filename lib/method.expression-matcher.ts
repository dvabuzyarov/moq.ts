import {It} from './expression-predicates';
import {MethodInfo} from './expression-reflector';
import {IArgumentsMatcher} from './arguments-matcher';

export class MethodExpressionMatcher{

    constructor(private argumentsMatcher: IArgumentsMatcher){

    }

    public matched(left: MethodInfo, right: MethodInfo|It<any>): boolean{
        if (left === right) return true;
        if (right instanceof It)
            return (right as It<any>).invoke(left);

        const rightExpression = right as MethodInfo;
        return this.argumentsMatcher.matched(left.arguments, rightExpression.arguments);

    }
}