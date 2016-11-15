import {It} from './expression-predicates';
import {GetPropertyInfo} from './expression-reflector';

export class GetPropertyExpressionMatcher{

    public matched(left: GetPropertyInfo, right: GetPropertyInfo|It<any>): boolean{
        if (left === right) return true;
        if (right instanceof It)
            return (right as It<any>).invoke(left);

        const rightExpression = right as GetPropertyInfo;
        if (left.name === rightExpression.name) return true;

        return false;
    }
}