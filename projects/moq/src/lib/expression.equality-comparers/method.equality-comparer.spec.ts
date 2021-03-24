import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { MethodInteraction } from "../interactions";
import { MethodExpression } from "../reflector/expressions";
import { MethodEqualityComparer } from "./method.equality-comparer";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";

describe("Method expression equality comparer", () => {

    beforeEach(() => {
        createInjector2(MethodEqualityComparer, [ArgumentsEqualityComparer]);
    });

    it("Returns true when they are equal", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodInteraction(arguments1);
        const right = new MethodExpression(arguments2);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(arguments1, arguments2))
            .returns(true);

        const comparer = resolve2(MethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new MethodInteraction(arguments1);
        const right = new MethodExpression(arguments2);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(arguments1, arguments2))
            .returns(false);

        const comparer = resolve2(MethodEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });
});
