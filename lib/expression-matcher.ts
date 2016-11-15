import {It} from './expression-predicates';
import {GetPropertyInfo, SetPropertyInfo, MethodInfo, NamedMethodInfo} from './expression-reflector';
import {GetPropertyExpressionMatcher} from './get.property.expression-matcher';
import {SetPropertyExpressionMatcher} from './set.property.expression-matcher';
import {MethodExpressionMatcher} from './method.expression-matcher';
import {NamedMethodExpressionMatcher} from './named.method.expression-matcher';

export class ExpressionMatcher {

    constructor(private getPropertyExpressionMatcher: GetPropertyExpressionMatcher,
                private setPropertyExpressionMatcher: SetPropertyExpressionMatcher,
                private methodExpressionMatcher: MethodExpressionMatcher,
                private namedMethodExpressionMatcher: NamedMethodExpressionMatcher) {

    }

    public matched(left: GetPropertyInfo|SetPropertyInfo|MethodInfo|NamedMethodInfo,
                   right: GetPropertyInfo|SetPropertyInfo|MethodInfo|NamedMethodInfo|It<any>): boolean {

        if (left === right) return true;
        if (right === undefined) return true;

        if (left instanceof GetPropertyInfo && (right instanceof GetPropertyInfo || right instanceof It))
            return this.getPropertyExpressionMatcher.matched(left, <GetPropertyInfo|It>right);
        if (left instanceof SetPropertyInfo && (right instanceof SetPropertyInfo || right instanceof It))
            return this.setPropertyExpressionMatcher.matched(left, <SetPropertyInfo|It>right);
        if (left instanceof MethodInfo && (right instanceof MethodInfo || right instanceof It))
            return this.methodExpressionMatcher.matched(left, <MethodInfo|It>right);
        if (left instanceof NamedMethodInfo && (right instanceof NamedMethodInfo || right instanceof It))
            return this.namedMethodExpressionMatcher.matched(left, <NamedMethodInfo|It>right);

        return false;
    }
}