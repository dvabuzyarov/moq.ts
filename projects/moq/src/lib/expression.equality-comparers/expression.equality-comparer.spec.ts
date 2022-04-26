import { ExpressionEqualityComparer } from "./expression.equality-comparer";
import { GetPropertyEqualityComparer, } from "./get-property.equality-comparer";
import { SetPropertyEqualityComparer, } from "./set-property.equality-comparer";
import { MethodEqualityComparer, } from "./method.equality-comparer";
import { InstanceMethodEqualityComparer, } from "./instance-method.equality-comparer";
import { InOperatorEqualityComparer, } from "./in-operator.equality-comparer";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { NewOperatorEqualityComparer } from "./new-operator.equality-comparer";
import { ItEqualityComparer } from "./it.equality-comparer";
import { It } from "../reflector/expression-predicates";
import {
    GetPropertyExpression,
    InOperatorExpression,
    FunctionExpression,
    MethodExpression,
    NewOperatorExpression,
    SetPropertyExpression
} from "../reflector/expressions";

describe("Expression equality comparer", () => {
    beforeEach(() => {
        createInjector(ExpressionEqualityComparer, [
            GetPropertyEqualityComparer,
            SetPropertyEqualityComparer,
            MethodEqualityComparer,
            InstanceMethodEqualityComparer,
            InOperatorEqualityComparer,
            NewOperatorEqualityComparer,
            ItEqualityComparer
        ]);
    });

    it("Returns true when both are undefined", () => {
        const left = undefined;
        const right = undefined;

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are null", () => {
        const left = null;
        const right = null;

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns value from ItEqualityComparer when left and right are It expressions", () => {
        const left = It.IsAny();
        const right = It.IsAny();
        const expected = true;

        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from ItEqualityComparer when left is It expression", () => {
        const left = It.IsAny();
        const right = new GetPropertyExpression("");
        const expected = true;

        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from ItEqualityComparer when right is It expression", () => {
        const left = new GetPropertyExpression("");
        const right = It.IsAny();
        const expected = true;

        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from GetPropertyEqualityComparer when left and right are GetProperty expressions", () => {
        const left = new GetPropertyExpression("left name");
        const right = new GetPropertyExpression("right name");
        const expected = true;

        resolveMock(GetPropertyEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from SetPropertyEqualityComparer when left and right are SetProperty expressions", () => {
        const left = new SetPropertyExpression("left name", "left value");
        const right = new SetPropertyExpression("right name", "right value");
        const expected = true;

        resolveMock(SetPropertyEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from InOperatorEqualityComparer when left and right are InOperator expressions", () => {
        const left = new InOperatorExpression("left name");
        const right = new InOperatorExpression("right name");
        const expected = true;

        resolveMock(InOperatorEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from MethodEqualityComparer when left and right are Method expressions", () => {
        const left = new FunctionExpression([]);
        const right = new FunctionExpression([]);
        const expected = true;

        resolveMock(MethodEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from InstanceMethodEqualityComparer when left and right are NamedMethod expressions", () => {
        const left = new MethodExpression("name", []);
        const right = new MethodExpression("name", []);
        const expected = true;

        resolveMock(InstanceMethodEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const comparer = resolve2(ExpressionEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns value from NewOperatorEqualityComparer when left and right are NewOperator expressions", () => {
        const left = new NewOperatorExpression(["left name"]);
        const right = new NewOperatorExpression(["right name"]);
        const expected = true;

        resolveMock(NewOperatorEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);

        const matcher = resolve2(ExpressionEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(expected);
    });

    it("Returns false when left and right represent different expressions", () => {
        const left = new GetPropertyExpression("name");
        const right = new SetPropertyExpression("name", []);

        const matcher = resolve2(ExpressionEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(false);
    });

});
