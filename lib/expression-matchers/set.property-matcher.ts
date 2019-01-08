import {ExpectedSetPropertyExpression} from '../expected-expressions/expected-expressions';
import {SetPropertyExpression} from '../expressions';
import {It} from '../expected-expressions/expression-predicates';
import {ConstantMatcher} from './constant-matcher';

/**
 * @hidden
 */
export class SetPropertyExpressionMatcher{

    constructor(private constantMatcher: ConstantMatcher){

    }

    public matched(left: SetPropertyExpression, right: ExpectedSetPropertyExpression|It<any>): boolean{
        if (right instanceof It)
            return (right as It<any>).test(left);

        const rightExpression = right as ExpectedSetPropertyExpression;
        if (left.name === rightExpression.name && this.constantMatcher.matched(left.value, rightExpression.value)) return true;

        return false;
    }
}