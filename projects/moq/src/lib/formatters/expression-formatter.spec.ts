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
import { createInjector, resolve } from "../../tests.components/resolve.builder";

describe("Expression formatter", () => {

    beforeEach(() => {
        const getPropertyFormatter = jasmine.createSpyObj<GetPropertyExpressionFormatter>(["format"]);
        const setPropertyFormatter = jasmine.createSpyObj<SetPropertyExpressionFormatter>(["format"]);
        const methodFormatter = jasmine.createSpyObj<MethodExpressionFormatter>(["format"]);
        const instanceMethodFormatter = jasmine.createSpyObj<NamedMethodExpressionFormatter>(["format"]);
        const constantFormatter = jasmine.createSpyObj<ConstantFormatter>(["format"]);
        const inOperatorFormatter = jasmine.createSpyObj<InOperatorFormatter>(["format"]);
        createInjector([
            {
                provide: ExpressionFormatter,
                useClass: ExpressionFormatter,
                deps: [
                    GetPropertyExpressionFormatter,
                    SetPropertyExpressionFormatter,
                    MethodExpressionFormatter,
                    NamedMethodExpressionFormatter,
                    ConstantFormatter,
                    InOperatorFormatter
                ]
            },
            {provide: GetPropertyExpressionFormatter, useValue: getPropertyFormatter, deps: []},
            {provide: SetPropertyExpressionFormatter, useValue: setPropertyFormatter, deps: []},
            {provide: MethodExpressionFormatter, useValue: methodFormatter, deps: []},
            {provide: NamedMethodExpressionFormatter, useValue: instanceMethodFormatter, deps: []},
            {provide: ConstantFormatter, useValue: constantFormatter, deps: []},
            {provide: InOperatorFormatter, useValue: inOperatorFormatter, deps: []},
        ]);
    });

    it("Returns formatted description for GetPropertyExpression", () => {
        const expression = new GetPropertyInteraction("name");
        const expected = "get property description";

        resolve(GetPropertyExpressionFormatter).format.withArgs(expression).and.returnValue(expected);

        const formatter = resolve(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });


    it("Returns formatted description for SetPropertyExpression", () => {
        const expression = new SetPropertyInteraction("name", "value");
        const expected = "set property description";

        resolve(SetPropertyExpressionFormatter).format.withArgs(expression).and.returnValue(expected);

        const formatter = resolve(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for InOperatorInteraction", () => {
        const expression = new InOperatorInteraction("name");
        const expected = "get property description";

        resolve(InOperatorFormatter).format.withArgs(expression).and.returnValue(expected);

        const formatter = resolve(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for MethodExpression", () => {
        const expression = new MethodInteraction(["value"]);
        const expected = "method description";

        resolve(MethodExpressionFormatter).format.withArgs(expression).and.returnValue(expected);

        const formatter = resolve(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for NamedMethodExpression", () => {
        const expression = new NamedMethodInteraction("name", ["value"]);
        const expected = "named method description";

        resolve(NamedMethodExpressionFormatter).format.withArgs(expression).and.returnValue(expected);

        const formatter = resolve(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });

    it("Returns formatted description for It", () => {
        const expression = new It(() => undefined);
        const expected = "It description";

        resolve(ConstantFormatter).format.withArgs(expression).and.returnValue(expected);

        const formatter = resolve(ExpressionFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(expected);
    });


});
