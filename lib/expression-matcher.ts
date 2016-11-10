import {IExpressionInfo} from './expression';
import {IArgumentsMatcher} from './arguments-matcher';
import {It} from './expression-predicates';

export class ExpressionMatcher{

    constructor(private argumentsMatcher: IArgumentsMatcher){

    }

    public matched(left: IExpressionInfo, right: IExpressionInfo|It<any>): boolean{
        if (left === right) return true;
        if (right instanceof It)
            return (right as It<any>).invoke(left);

        const rightExpression = right as IExpressionInfo;
        if (rightExpression.name === undefined && rightExpression.arguments === undefined) return true;


        if (left.name !== rightExpression.name) return false;
        if (this.argumentsMatcher.matched(left.arguments, rightExpression.arguments) === false) return false;
        return true;
    }
}