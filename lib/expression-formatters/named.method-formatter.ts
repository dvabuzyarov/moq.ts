import {NamedMethodExpression} from '../expressions';
import {ConstantFormatter} from './constant-formatter';

export class NamedMethodExpressionFormatter{

    constructor(private constantFormatter: ConstantFormatter){

    }

    public format(expression: NamedMethodExpression): string{
        const value = this.constantFormatter.format(expression.arguments);
        return `${expression.name}(${value})`;
    }
}