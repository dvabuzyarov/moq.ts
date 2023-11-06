import { ExpressionFormatter } from "./expression.formatter";
import {
    FunctionExpression,
    GetPropertyExpression,
    InOperatorExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { GetPropertyFormatter } from "./get-property.formatter";
import { SetPropertyFormatter } from "./set-property.formatter";
import { MethodExpressionFormatter } from "./method-expression.formatter";
import { FunctionExpressionFormatter } from "./function-expression.formatter";
import { It } from "../reflector/expression-predicates";
import { InOperatorFormatter } from "./in-operator.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { NewOperatorFormatter } from "./new-operator.formatter";
import { ObjectFormatter } from "../object-formatters/object.formatter";

describe("Expression formatter", () => {

    beforeEach(() => {
        createInjector(ExpressionFormatter, [
            GetPropertyFormatter,
            SetPropertyFormatter,
            FunctionExpressionFormatter,
            MethodExpressionFormatter,
            ObjectFormatter,
            InOperatorFormatter,
            NewOperatorFormatter
        ]);
    });

    it("Returns formatted description for GetPropertyExpression", () => {
        const expression = new GetPropertyExpression("name");
        const expected = "get property description";

        resolveMock(GetPropertyFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });


    it("Returns formatted description for SetPropertyExpression", () => {
        const expression = new SetPropertyExpression("name", "value");
        const expected = "set property description";

        resolveMock(SetPropertyFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for InOperatorInteraction", () => {
        const expression = new InOperatorExpression("name");
        const expected = "get property description";

        resolveMock(InOperatorFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for MethodExpression", () => {
        const expression = new FunctionExpression(["value"]);
        const expected = "method description";

        resolveMock(FunctionExpressionFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for NamedMethodExpression", () => {
        const expression = new MethodExpression("name", ["value"]);
        const expected = "named method description";

        resolveMock(MethodExpressionFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for It", () => {
        const expression = new It(() => undefined);
        const expected = "It description";

        resolveMock(ObjectFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for NewOperatorInteraction", () => {
        const expression = new NewOperatorExpression(["name"]);
        const expected = "new construct description";

        resolveMock(NewOperatorFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });
});
