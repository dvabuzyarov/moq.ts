import { GetPropertyInteraction } from "../interactions";
import { GetPropertyExpression } from "../reflector/expressions";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";
import { GetPropertyEqualityComparer } from "./get-property.equality-comparer";

describe("Get property expression equality comparer", () => {
    beforeEach(() => {
        createInjector2(GetPropertyEqualityComparer, []);
    });

    it("Returns true when they are equal", () => {
        const name = "name";
        const left = new GetPropertyInteraction(name);
        const right = new GetPropertyExpression(name);

        const matcher = resolve2(GetPropertyEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const left = new GetPropertyInteraction("left name");
        const right = new GetPropertyExpression("right name");

        const matcher = resolve2(GetPropertyEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(false);
    });
});
