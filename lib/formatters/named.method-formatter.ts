import {NamedMethodExpression} from '../expressions';
import {ConstantFormatter} from './constant-formatter';
/**
 * @hidden
 */
export class NamedMethodExpressionFormatter{

    constructor(private constantFormatter: ConstantFormatter){

    }

    public format(expression: NamedMethodExpression): string{
        const formatted: string[] = [];

        expression.arguments.forEach(arg=>{
            formatted.push(this.constantFormatter.format(arg));
        });

        const value = formatted.join(', ');
        return `${expression.name}(${value})`;
    }
}