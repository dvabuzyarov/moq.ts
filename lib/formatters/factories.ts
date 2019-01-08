import {SetPropertyExpressionFormatter} from './set.property-formatter';
import {ConstantFormatter} from './constant-formatter';
import {MethodExpressionFormatter} from './method-formatter';
import {NamedMethodExpressionFormatter} from './named.method-formatter';
import {ExpressionFormatter} from './expression-formatter';
import {GetPropertyExpressionFormatter} from './get.property-formatter';

/**
 * @hidden
 */
export function setPropertyFormatterFactory(): SetPropertyExpressionFormatter {
    return new SetPropertyExpressionFormatter(new ConstantFormatter());
}

/**
 * @hidden
 */
export function methodFormatterFactory(): MethodExpressionFormatter {
    return new MethodExpressionFormatter(new ConstantFormatter());
}

/**
 * @hidden
 */
export function namedMethodFormatterFactory(): NamedMethodExpressionFormatter {
    return new NamedMethodExpressionFormatter(new ConstantFormatter());
}

/**
 * @hidden
 */
export function expressionFormatterFactory(): ExpressionFormatter {
    return new ExpressionFormatter(
        new GetPropertyExpressionFormatter(),
        setPropertyFormatterFactory(),
        methodFormatterFactory(),
        namedMethodFormatterFactory(),
        new ConstantFormatter());
}