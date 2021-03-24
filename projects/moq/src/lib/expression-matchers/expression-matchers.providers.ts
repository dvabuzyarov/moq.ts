import { SetPropertyExpressionMatcher } from "./set-property.matcher";
import { ConstantMatcher } from "./constant.matcher";
import { NamedMethodExpressionMatcher } from "./instance-method.matcher";
import { ArgumentsMatcher } from "./arguments.matcher";
import { MethodExpressionMatcher } from "./method.matcher";
import { InOperatorExpressionMatcher } from "./in-operator.matcher";
import { GetPropertyExpressionMatcher } from "./get-property.matcher";
import { ExpressionMatcher } from "./expression.matcher";
import { NewOperatorExpressionMatcher } from "./new-operator.matcher";

/**
 * @hidden
 */
export const expressionMatchersProviders = [
    {
        provide: ExpressionMatcher,
        useClass: ExpressionMatcher,
        deps: [
            GetPropertyExpressionMatcher,
            SetPropertyExpressionMatcher,
            MethodExpressionMatcher,
            NamedMethodExpressionMatcher,
            InOperatorExpressionMatcher,
            NewOperatorExpressionMatcher
        ]
    },
    {provide: SetPropertyExpressionMatcher, useClass: SetPropertyExpressionMatcher, deps: [ConstantMatcher]},
    {provide: NamedMethodExpressionMatcher, useClass: NamedMethodExpressionMatcher, deps: [ArgumentsMatcher]},
    {provide: MethodExpressionMatcher, useClass: MethodExpressionMatcher, deps: [ArgumentsMatcher]},
    {provide: InOperatorExpressionMatcher, useClass: InOperatorExpressionMatcher, deps: []},
    {provide: GetPropertyExpressionMatcher, useClass: GetPropertyExpressionMatcher, deps: []},
    {provide: ConstantMatcher, useClass: ConstantMatcher, deps: []},
    {provide: ArgumentsMatcher, useClass: ArgumentsMatcher, deps: [ConstantMatcher]},
    {provide: NewOperatorExpressionMatcher, useClass: NewOperatorExpressionMatcher, deps: [ArgumentsMatcher]},
];
