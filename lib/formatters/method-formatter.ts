import {MethodExpression} from '../expressions';
import {ConstantFormatter} from './constant-formatter';

export class MethodExpressionFormatter{

    constructor(private constantFormatter: ConstantFormatter){

    }

    public format(expression: MethodExpression): string{
        const value = this.constantFormatter.format(expression.arguments);
        return `(${value})`;
    }
}