import { GuardedExpressionFormatter } from "./guarded-expression.formatter";
import { createInjector, resolve2, resolveMock } from "../../../../tests.components/resolve.builder";
import {
    FunctionExpression,
    GetPropertyExpression,
    MethodExpression,
    NewOperatorExpression
} from "../../../reflector/expressions";
import { FunctionExpressionFormatter } from "../../../formatters/function-expression.formatter";
import { PropertyKeyFormatter } from "../../../formatters/property-key.formatter";
import { MethodExpressionFormatter } from "../../../formatters/method-expression.formatter";
import { ObjectFormatter } from "../../../object-formatters/object.formatter";

describe("Guarded expression formatter", () => {

    beforeEach(() => {
        createInjector(GuardedExpressionFormatter, [
            FunctionExpressionFormatter,
            PropertyKeyFormatter,
            MethodExpressionFormatter,
            ObjectFormatter
        ]);
    });

    it("Returns function presentation", () => {
        const name = "name";
        const expression = new FunctionExpression([]);
        const presentation = "presentation";

        resolveMock(FunctionExpressionFormatter)
            .setup(instance => instance.format(expression))
            .returns(presentation);

        const formatter = resolve2(GuardedExpressionFormatter);
        const actual = formatter.format(expression, name);

        expect(actual).toEqual(presentation);
    });

    it("Returns get property presentation", () => {
        const name = "name";
        const propertyName = "property name";
        const expression = new GetPropertyExpression(propertyName);
        const presentation = "presentation";

        resolveMock(PropertyKeyFormatter)
            .setup(instance => instance.format(propertyName))
            .returns(presentation);

        const formatter = resolve2(GuardedExpressionFormatter);
        const actual = formatter.format(expression, name);

        expect(actual).toEqual(`.${presentation}`);
    });

    it("Returns method presentation", () => {
        const name = "name";
        const expression = new MethodExpression("property name", []);
        const presentation = "presentation";

        resolveMock(MethodExpressionFormatter)
            .setup(instance => instance.format(expression))
            .returns(presentation);

        const formatter = resolve2(GuardedExpressionFormatter);
        const actual = formatter.format(expression, name);

        expect(actual).toEqual(`.${presentation}`);
    });

    it("Returns new operator presentation", () => {
        const name = "name";
        const expression = new NewOperatorExpression([]);
        const presentation = "presentation";

        resolveMock(ObjectFormatter)
            .setup(instance => instance.format(expression.args))
            .returns(presentation);

        const formatter = resolve2(GuardedExpressionFormatter);
        const actual = formatter.format(expression, name);

        expect(actual).toEqual(`new ${name}(${presentation})`);
    });
});
