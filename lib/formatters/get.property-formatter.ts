import {GetPropertyExpression} from '../expressions';

/**
 * @hidden
 */
export class GetPropertyExpressionFormatter{

    public format(expression: GetPropertyExpression): string{
        return `Getter of \'${expression.name}\'`;
    }
}