import { It } from "../reflector/expression-predicates";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";
import { ItEqualityComparer } from "./it.equality-comparer";

describe("It predicate equality comparer", () => {

    beforeEach(() => {
        createInjector2(ItEqualityComparer, []);
    });

    it("Returns true when they are the same", () => {
        const left = It.IsAny();

        const comparer = resolve2(ItEqualityComparer);
        const actual = comparer.equals(left, left);

        expect(actual).toBe(true);
    });

    it("Returns false when they are different", () => {
        const left = It.IsAny();
        const right = It.IsAny();

        const comparer = resolve2(ItEqualityComparer);
        const actual = comparer.equals(left, right);

        expect(actual).toBe(false);
    });
});
