import { ConstantEqualityComparer } from "./constant.equality-comparer";
import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { GetPropertyEqualityComparer } from "./get-property.equality-comparer";
import { InOperatorEqualityComparer } from "./in-operator.equality-comparer";
import { InstanceMethodEqualityComparer } from "./instance-method.equality-comparer";
import { ItEqualityComparer } from "./it.equality-comparer";
import { MethodEqualityComparer } from "./method.equality-comparer";
import { NewOperatorEqualityComparer } from "./new-operator.equality-comparer";
import { SetPropertyEqualityComparer } from "./set-property.equality-comparer";
import { ExpressionEqualityComparer } from "./expression.equality-comparer";

/**
 * @hidden
 */
export default [
    {provide: ConstantEqualityComparer, useClass: ConstantEqualityComparer, deps: [ItEqualityComparer]},
    {provide: ArgumentsEqualityComparer, useClass: ArgumentsEqualityComparer, deps: [ConstantEqualityComparer]},
    {provide: GetPropertyEqualityComparer, useClass: GetPropertyEqualityComparer, deps: []},
    {provide: InOperatorEqualityComparer, useClass: InOperatorEqualityComparer, deps: []},
    {
        provide: InstanceMethodEqualityComparer,
        useClass: InstanceMethodEqualityComparer,
        deps: [ArgumentsEqualityComparer]
    },
    {provide: ItEqualityComparer, useClass: ItEqualityComparer, deps: []},
    {provide: MethodEqualityComparer, useClass: MethodEqualityComparer, deps: [ArgumentsEqualityComparer]},
    {provide: NewOperatorEqualityComparer, useClass: NewOperatorEqualityComparer, deps: [ArgumentsEqualityComparer]},
    {provide: SetPropertyEqualityComparer, useClass: SetPropertyEqualityComparer, deps: [ConstantEqualityComparer]},
    {
        provide: ExpressionEqualityComparer,
        useClass: ExpressionEqualityComparer,
        deps: [
            GetPropertyEqualityComparer,
            SetPropertyEqualityComparer,
            MethodEqualityComparer,
            InstanceMethodEqualityComparer,
            InOperatorEqualityComparer,
            NewOperatorEqualityComparer,
            ItEqualityComparer
        ]
    },
];

