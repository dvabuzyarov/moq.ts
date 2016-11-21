import {GetPropertyExpression} from '../expressions';

export class GetPropertyExpressionFormatter{

    public format(expression: GetPropertyExpression): string{
        return `The property \'${expression.name}\'`;
    }
}