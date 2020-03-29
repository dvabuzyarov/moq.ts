import { ExpressionFormatter } from "./expression-formatter";
import {
    GetPropertyInteraction,
    InOperatorInteraction,
    MethodInteraction,
    NamedMethodInteraction,
    SetPropertyInteraction
} from "../interactions";
import { GetPropertyExpressionFormatter } from "./get.property-formatter";
import { SetPropertyExpressionFormatter } from "./set.property-formatter";
import { NamedMethodExpressionFormatter } from "./named.method-formatter";
import { MethodExpressionFormatter } from "./method-formatter";
import { It } from "../expected-expressions/expression-predicates";
import { ConstantFormatter } from "./constant-formatter";
import { InOperatorFormatter } from "./in-operator.formatter";

describe("Expression formatter", () => {
    function formatterFactory<T>(): T {
        const formatter = jasmine.createSpy("formatter");
        return (<any>{
            format: formatter
        } as T);
    }

    it("Returns formatted description for GetPropertyExpression", () => {
        const expression = new GetPropertyInteraction("name");
        const expected = "get property description";

        const getPropertyFormatter = formatterFactory<GetPropertyExpressionFormatter>();
        (<jasmine.Spy>getPropertyFormatter.format).withArgs(expression).and.returnValue(expected);

        const formatter = new ExpressionFormatter(getPropertyFormatter, undefined, undefined, undefined, undefined);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });


    it("Returns formatted description for SetPropertyExpression", () => {
        const expression = new SetPropertyInteraction("name", "value");
        const expected = "set property description";

        const setPropertyFormatter = formatterFactory<SetPropertyExpressionFormatter>();
        (<jasmine.Spy>setPropertyFormatter.format).withArgs(expression).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, setPropertyFormatter, undefined, undefined, undefined);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for InOperatorInteraction", () => {
        const expression = new InOperatorInteraction("name");
        const expected = "get property description";

        const inOperatorFormatter = formatterFactory<InOperatorFormatter>();
        (<jasmine.Spy>inOperatorFormatter.format).withArgs(expression).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, undefined, undefined, undefined, undefined, inOperatorFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for MethodExpression", () => {
        const expression = new MethodInteraction(["value"]);
        const expected = "method description";

        const methodExpressionFormatter = formatterFactory<MethodExpressionFormatter>();
        (<jasmine.Spy>methodExpressionFormatter.format).withArgs(expression).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, undefined, methodExpressionFormatter, undefined, undefined);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for NamedMethodExpression", () => {
        const expression = new NamedMethodInteraction("name", ["value"]);
        const expected = "named method description";

        const namedMethodExpressionFormatter = formatterFactory<NamedMethodExpressionFormatter>();
        (<jasmine.Spy>namedMethodExpressionFormatter.format).withArgs(expression).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, undefined, undefined, namedMethodExpressionFormatter, undefined);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for It", () => {
        const expression = new It(() => undefined);
        const expected = "It description";

        const constantFormatter = formatterFactory<ConstantFormatter>();
        (<jasmine.Spy>constantFormatter.format).withArgs(expression).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, undefined, undefined, undefined, constantFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });


});
