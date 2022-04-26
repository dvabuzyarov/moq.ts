import { ExpressionFormatter } from "./expression.formatter";
import { createInjector, resolve2, resolveMock } from "../../../../tests.components/resolve.builder";
import {
    FunctionExpression,
    GetPropertyExpression,
    MethodExpression,
    NewOperatorExpression
} from "../../../reflector/expressions";
import { FunctionFormatter } from "../../../formatters/function.formatter";
import { PropertyKeyFormatter } from "../../../formatters/property-key.formatter";
import { MethodFormatter } from "../../../formatters/method.formatter";
import { ConstantFormatter } from "../../../formatters/constant.formatter";

describe("Expression formatter", () => {

    beforeEach(() => {
        createInjector(ExpressionFormatter, [FunctionFormatter, PropertyKeyFormatter, MethodFormatter, ConstantFormatter]);
    });

    it("Returns function presentation", () => {
        const name = "name";
        const expression = new FunctionExpression([]);
        const presentation = "presentation";

        resolveMock(FunctionFormatter)
            .setup(instance => instance.format(expression))
            .returns(presentation);

        const formatter = resolve2(ExpressionFormatter);
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

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression, name);

        expect(actual).toEqual(`.${presentation}`);
    });

    it("Returns method presentation", () => {
        const name = "name";
        const expression = new MethodExpression("property name", []);
        const presentation = "presentation";

        resolveMock(MethodFormatter)
            .setup(instance => instance.format(expression))
            .returns(presentation);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression, name);

        expect(actual).toEqual(`.${presentation}`);
    });

    it("Returns new operator presentation", () => {
        const name = "name";
        const expression = new NewOperatorExpression([]);
        const presentation = "presentation";

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(expression.args))
            .returns(presentation);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression, name);

        expect(actual).toEqual(`new ${name}(${presentation})`);
    });
});
