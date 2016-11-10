import {IExpressionInfo} from './expression';
import {IArgumentsMatcher} from './arguments-matcher';

export class ExpressionMatcher{

    constructor(private argumentsMatcher: IArgumentsMatcher){

    }

    public matched(left: IExpressionInfo, right: IExpressionInfo): boolean{
        if (left === right) return true;
        if (right.name === undefined && right.arguments === undefined) return true;
        if (left.name !== right.name) return false;
        if (this.argumentsMatcher.matched(left.arguments, right.arguments) === false) return false;
        return true;
    }
}