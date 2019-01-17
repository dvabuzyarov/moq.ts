import {ExpressionFormatter} from "./expression-formatter";
import {
    GetPropertyExpression, SetPropertyExpression, NamedMethodExpression,
    MethodExpression
} from "../expressions";
import {GetPropertyExpressionFormatter} from "./get.property-formatter";
import {SetPropertyExpressionFormatter} from "./set.property-formatter";
import {NamedMethodExpressionFormatter} from "./named.method-formatter";
import {MethodExpressionFormatter} from "./method-formatter";
import {It} from "../expected-expressions/expression-predicates";
import {ConstantFormatter} from "./constant-formatter";

describe("Expression formatter", () => {
    function formatterFactory<T>(): T {
        const formatter = jasmine.createSpy("formatter");
        return (<any>{
            format: formatter
        } as T);
    }

    it("Returns formatted description for GetPropertyExpression", () => {
        const expression = new GetPropertyExpression("name");
        const expected = "get property description";

        const getPropertyFormatter = formatterFactory<GetPropertyExpressionFormatter>();
        (<jasmine.Spy>getPropertyFormatter.format).and.returnValue(expected);

        const formatter = new ExpressionFormatter(getPropertyFormatter, undefined, undefined, undefined, undefined);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
        expect(getPropertyFormatter.format).toHaveBeenCalledWith(expression);
    });


    it("Returns formatted description for SetPropertyExpression", () => {
        const expression = new SetPropertyExpression("name", "value");
        const expected = "set property description";

        const setPropertyFormatter = formatterFactory<SetPropertyExpressionFormatter>();
        (<jasmine.Spy>setPropertyFormatter.format).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, setPropertyFormatter, undefined, undefined, undefined);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
        expect(setPropertyFormatter.format).toHaveBeenCalledWith(expression);
    });

    it("Returns formatted description for MethodExpression", () => {
        const expression = new MethodExpression(["value"]);
        const expected = "method description";

        const methodExpressionFormatter = formatterFactory<MethodExpressionFormatter>();
        (<jasmine.Spy>methodExpressionFormatter.format).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, undefined, methodExpressionFormatter, undefined, undefined);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
        expect(methodExpressionFormatter.format).toHaveBeenCalledWith(expression);
    });

    it("Returns formatted description for NamedMethodExpression", () => {
        const expression = new NamedMethodExpression("name", ["value"]);
        const expected = "named method description";

        const namedMethodExpressionFormatter = formatterFactory<NamedMethodExpressionFormatter>();
        (<jasmine.Spy>namedMethodExpressionFormatter.format).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, undefined, undefined, namedMethodExpressionFormatter, undefined);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
        expect(namedMethodExpressionFormatter.format).toHaveBeenCalledWith(expression);
    });

    it("Returns formatted description for It", () => {
        const expression = new It(() => undefined);
        const expected = "It description";

        const constantFormatter = formatterFactory<ConstantFormatter>();
        (<jasmine.Spy>constantFormatter.format).and.returnValue(expected);

        const formatter = new ExpressionFormatter(undefined, undefined, undefined, undefined, constantFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
        expect(constantFormatter.format).toHaveBeenCalledWith(expression);
    });


});
