import {SetPropertyExpressionFormatter} from './set.property-formatter';
import {ConstantFormatter} from './constant-formatter';
import {MethodExpressionFormatter} from './method-formatter';
import {NamedMethodExpressionFormatter} from './named.method-formatter';
import {ExpressionFormatter} from './expression-formatter';
import {GetPropertyExpressionFormatter} from './get.property-formatter';

export function setPropertyFormatterFactory(): SetPropertyExpressionFormatter {
    return new SetPropertyExpressionFormatter(new ConstantFormatter());
}

export function methodFormatterFactory(): MethodExpressionFormatter {
    return new MethodExpressionFormatter(new ConstantFormatter());
}

export function namedMethodFormatterFactory(): NamedMethodExpressionFormatter {
    return new NamedMethodExpressionFormatter(new ConstantFormatter());
}

export function expressionFormatterFactory(): ExpressionFormatter {
    return new ExpressionFormatter(
        new GetPropertyExpressionFormatter(),
        setPropertyFormatterFactory(),
        methodFormatterFactory(),
        namedMethodFormatterFactory(),
        new ConstantFormatter());
}