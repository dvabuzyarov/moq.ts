import {It} from './expression-predicates';
import {SetPropertyInfo} from './expression-reflector';

export class SetPropertyExpressionMatcher{

    public matched(left: SetPropertyInfo, right: SetPropertyInfo|It<any>): boolean{
        if (left === right) return true;
        if (right instanceof It)
            return (right as It<any>).invoke(left);

        const rightExpression = right as SetPropertyInfo;
        if (left.name === rightExpression.name && left.value === rightExpression.value) return true;

        return false;
    }
}