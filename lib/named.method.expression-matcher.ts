import {It} from './expression-predicates';
import {NamedMethodInfo} from './expression-reflector';
import {IArgumentsMatcher} from './arguments-matcher';

export class NamedMethodExpressionMatcher{

    constructor(private argumentsMatcher: IArgumentsMatcher){

    }

    public matched(left: NamedMethodInfo, right: NamedMethodInfo|It<any>): boolean{
        if (left === right) return true;
        if (right instanceof It)
            return (right as It<any>).invoke(left);

        const rightExpression = right as NamedMethodInfo;
        const argumentsAreMatched = this.argumentsMatcher.matched(left.arguments, rightExpression.arguments);
        return left.name === rightExpression.name && argumentsAreMatched;
    }
}