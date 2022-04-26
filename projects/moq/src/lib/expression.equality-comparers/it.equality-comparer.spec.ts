import { It } from "../reflector/expression-predicates";
import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { ItEqualityComparer } from "./it.equality-comparer";
import { MethodExpression } from "../reflector/expressions";
import { Mock } from "moq.ts";

describe("It predicate equality comparer", () => {

    beforeEach(() => {
        createInjector(ItEqualityComparer, []);
    });

    it("Returns true when they are the same", () => {
        const left = It.IsAny();

        const comparer = resolve2(ItEqualityComparer);
        const actual = comparer.equals(left, left);

        expect(actual).toBe(true);
    });

    it("Returns false when they are different but have the same predicate", () => {
        const left = It.IsAny();
        const right = It.IsAny();

        const comparer = resolve2(ItEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when they are different and the predicates are different", () => {
        const left = It.IsAny();
        const right = It.Is(() => false);

        const comparer = resolve2(ItEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true when right is It and the left passes the predicate", () => {
        const left = new MethodExpression("name", []);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(true)
            .object();

        const matcher = resolve2(ItEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when right is It and the left does not pass the predicate", () => {
        const left = new MethodExpression("name", []);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(false)
            .object();

        const matcher = resolve2(ItEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true when left is It and the right passes the predicate", () => {
        const right = new MethodExpression("name", []);
        const left = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(right))
            .returns(true)
            .object();

        const matcher = resolve2(ItEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left is It and the right does not pass the predicate", () => {
        const right = new MethodExpression("name", []);
        const left = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(right))
            .returns(false)
            .object();

        const matcher = resolve2(ItEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(false);
    });

    it("Returns undefined when neither the left or right is It", () => {
        const left = new MethodExpression("name", []);
        const right = new MethodExpression("name", []);

        const matcher = resolve2(ItEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(undefined);
    });
});
