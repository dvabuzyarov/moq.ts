import { NamedMethodInteraction } from "../interactions";
import { createInjector2, resolve2 } from "../../tests.components/resolve.builder";
import { ItMatcher } from "./it.matcher";
import { Mock } from "moq.ts";
import { It } from "../reflector/expression-predicates";

describe("It expression matcher", () => {

    beforeEach(() => {
        createInjector2(ItMatcher, []);
    });

    it("Returns true when they are equal", () => {
        const left = new NamedMethodInteraction("name", []);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(true)
            .object();

        const matcher = resolve2(ItMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when left does not equal to right", () => {
        const left = new NamedMethodInteraction("name", []);
        const right = new Mock<It<any>>({target: It.prototype})
            .setup(instance => instance.test(left))
            .returns(false)
            .object();

        const matcher = resolve2(ItMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});
