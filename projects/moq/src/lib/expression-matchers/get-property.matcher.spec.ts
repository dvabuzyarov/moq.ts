import { GetPropertyInteraction } from "../interactions";
import { GetPropertyExpressionMatcher } from "./get-property.matcher";
import { GetPropertyExpression } from "../reflector/expressions";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { GetPropertyEqualityComparer } from "../expression.equality-comparers/get-property.equality-comparer";

describe("Get property expression matcher", () => {
    beforeEach(() => {
        createInjector2(GetPropertyExpressionMatcher, [GetPropertyEqualityComparer]);
    });

    it("Returns true when they are equal", () => {
        const name = "name";
        const left = new GetPropertyInteraction(name);
        const right = new GetPropertyExpression(name);

        resolveMock(GetPropertyEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(true);

        const matcher = resolve2(GetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const left = new GetPropertyInteraction("left name");
        const right = new GetPropertyExpression("right name");

        resolveMock(GetPropertyEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(false);

        const matcher = resolve2(GetPropertyExpressionMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

});
