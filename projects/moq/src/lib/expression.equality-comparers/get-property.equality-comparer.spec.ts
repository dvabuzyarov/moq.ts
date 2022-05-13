import { GetPropertyExpression } from "../reflector/expressions";
import { GetPropertyEqualityComparer } from "./get-property.equality-comparer";
import { createInjector, resolve2 } from "../../tests.components/resolve.builder";

describe("Get property expression equality comparer", () => {
    beforeEach(() => {
        createInjector(GetPropertyEqualityComparer, []);
    });

    it("Returns true when they are equal", () => {
        const name = "name";
        const left = new GetPropertyExpression(name);
        const right = new GetPropertyExpression(name);

        const matcher = resolve2(GetPropertyEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const left = new GetPropertyExpression("left name");
        const right = new GetPropertyExpression("right name");

        const matcher = resolve2(GetPropertyEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(false);
    });
});
