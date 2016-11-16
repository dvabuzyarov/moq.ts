import {ArgumentsMatcher} from './arguments-matcher';
import {ConstantMatcher} from './constant-matcher';
import {MethodExpressionMatcher} from './method-matcher';
import {NamedMethodExpressionMatcher} from './named.method-matcher';
import {SetPropertyExpressionMatcher} from './set.property-matcher';
import {ExpressionMatcher} from './expression-matcher';
import {GetPropertyExpressionMatcher} from './get.property-matcher';

export function argumentsMatcherFactory(): ArgumentsMatcher {
    return new ArgumentsMatcher(new ConstantMatcher());
}

export function methodMatcherFactory(): MethodExpressionMatcher {
    return new MethodExpressionMatcher(argumentsMatcherFactory());
}

export function namedMethodMatcherFactory(): NamedMethodExpressionMatcher {
    return new NamedMethodExpressionMatcher(argumentsMatcherFactory());
}

export function setPropertyMatcherFactory(): SetPropertyExpressionMatcher {
    return new SetPropertyExpressionMatcher(new ConstantMatcher());
}

export function expressionMatcherFactory(): ExpressionMatcher {
    return new ExpressionMatcher(new GetPropertyExpressionMatcher(), setPropertyMatcherFactory(), methodMatcherFactory(), namedMethodMatcherFactory());
}