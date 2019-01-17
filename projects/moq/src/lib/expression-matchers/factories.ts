import { ArgumentsMatcher } from "./arguments-matcher";
import { ConstantMatcher } from "./constant-matcher";
import { MethodExpressionMatcher } from "./method-matcher";
import { NamedMethodExpressionMatcher } from "./named.method-matcher";
import { SetPropertyExpressionMatcher } from "./set.property-matcher";
import { ExpressionMatcher } from "./expression-matcher";
import { GetPropertyExpressionMatcher } from "./get.property-matcher";

/**
 * @hidden
 */
export function argumentsMatcherFactory(): ArgumentsMatcher {
    return new ArgumentsMatcher(new ConstantMatcher());
}

/**
 * @hidden
 */
export function methodMatcherFactory(): MethodExpressionMatcher {
    return new MethodExpressionMatcher(argumentsMatcherFactory());
}

/**
 * @hidden
 */
export function namedMethodMatcherFactory(): NamedMethodExpressionMatcher {
    return new NamedMethodExpressionMatcher(argumentsMatcherFactory());
}

/**
 * @hidden
 */
export function setPropertyMatcherFactory(): SetPropertyExpressionMatcher {
    return new SetPropertyExpressionMatcher(new ConstantMatcher());
}

/**
 * @hidden
 */
export function expressionMatcherFactory(): ExpressionMatcher {
    return new ExpressionMatcher(
        new GetPropertyExpressionMatcher(),
        setPropertyMatcherFactory(),
        methodMatcherFactory(),
        namedMethodMatcherFactory()
    );
}
