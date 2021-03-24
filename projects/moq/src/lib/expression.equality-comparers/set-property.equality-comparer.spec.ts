import { SetPropertyInteraction } from "../interactions";
import { SetPropertyExpression } from "../reflector/expressions";
import { ConstantEqualityComparer } from "./constant.equality-comparer";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { SetPropertyEqualityComparer } from "./set-property.equality-comparer";

describe("Set property expression equality comparer", () => {
    beforeEach(() => {
        createInjector2(SetPropertyEqualityComparer, [ConstantEqualityComparer]);
    });

    it("Returns true when they are equal", () => {
        const name = "name";
        const value = "value";
        const left = new SetPropertyInteraction(name, value);
        const right = new SetPropertyExpression(name, value);

        resolveMock(ConstantEqualityComparer)
            .setup(instance => instance.equals(value, value))
            .returns(true);

        const matcher = resolve2(SetPropertyEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right by name", () => {
        const value = "value";
        const left = new SetPropertyInteraction("left name", value);
        const right = new SetPropertyExpression("right name", value);

        resolveMock(ConstantEqualityComparer)
            .setup(instance => instance.equals(value, value))
            .returns(true);

        const matcher = resolve2(SetPropertyEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when left does not equal to right by value", () => {
        const name = "name";
        const leftValue = "left value";
        const rightValue = "right value";

        const left = new SetPropertyInteraction(name, leftValue);
        const right = new SetPropertyExpression(name, rightValue);

        resolveMock(ConstantEqualityComparer)
            .setup(instance => instance.equals(leftValue, rightValue))
            .returns(false);

        const matcher = resolve2(SetPropertyEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(false);
    });
});
