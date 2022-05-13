import { InteractionFormatter } from "./interaction.formatter";
import {
    GetPropertyExpression,
    InOperatorExpression,
    FunctionExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";
import { GetPropertyFormatter } from "./get-property.formatter";
import { SetPropertyFormatter } from "./set-property.formatter";
import { MethodFormatter } from "./method.formatter";
import { FunctionFormatter } from "./function.formatter";
import { It } from "../reflector/expression-predicates";
import { ConstantFormatter } from "./constant.formatter";
import { InOperatorFormatter } from "./in-operator.formatter";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { NewOperatorFormatter } from "./new-operator.formatter";

describe("Expression formatter", () => {

    beforeEach(() => {
        createInjector(InteractionFormatter, [
            GetPropertyFormatter,
            SetPropertyFormatter,
            FunctionFormatter,
            MethodFormatter,
            ConstantFormatter,
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

        const formatter = resolve2(InteractionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });


    it("Returns formatted description for SetPropertyExpression", () => {
        const expression = new SetPropertyExpression("name", "value");
        const expected = "set property description";

        resolveMock(SetPropertyFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(InteractionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for InOperatorInteraction", () => {
        const expression = new InOperatorExpression("name");
        const expected = "get property description";

        resolveMock(InOperatorFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(InteractionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for MethodExpression", () => {
        const expression = new FunctionExpression(["value"]);
        const expected = "method description";

        resolveMock(FunctionFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(InteractionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for NamedMethodExpression", () => {
        const expression = new MethodExpression("name", ["value"]);
        const expected = "named method description";

        resolveMock(MethodFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(InteractionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for It", () => {
        const expression = new It(() => undefined);
        const expected = "It description";

        resolveMock(ConstantFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(InteractionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for NewOperatorInteraction", () => {
        const expression = new NewOperatorExpression(["name"]);
        const expected = "new construct description";

        resolveMock(NewOperatorFormatter)
            .setup(instance => instance.format(expression))
            .returns(expected);

        const formatter = resolve2(InteractionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });
});
