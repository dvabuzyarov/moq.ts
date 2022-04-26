import { ArgumentsEqualityComparer } from "./arguments.equality-comparer";
import { NewOperatorExpression } from "../reflector/expressions";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { NewOperatorEqualityComparer } from "./new-operator.equality-comparer";

describe("new operator expression equality comparer", () => {

    beforeEach(() => {
        createInjector(NewOperatorEqualityComparer, [ArgumentsEqualityComparer]);
    });

    it("Returns true when they are equal", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new NewOperatorExpression(arguments1);
        const right = new NewOperatorExpression(arguments2);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(arguments1, arguments2))
            .returns(true);

        const comparer = resolve2(NewOperatorEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const arguments1 = [];
        const arguments2 = [];

        const left = new NewOperatorExpression(arguments1);
        const right = new NewOperatorExpression(arguments2);

        resolveMock(ArgumentsEqualityComparer)
            .setup(instance => instance.equals(arguments1, arguments2))
            .returns(false);

        const comparer = resolve2(NewOperatorEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });
});
