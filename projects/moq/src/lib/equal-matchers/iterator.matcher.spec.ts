import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { IteratorMatcher } from "./iterator.matcher";
import { IterableTester } from "./iterable.tester";
import { StaticInjector } from "../static.injector/injector";
import { Mock } from "moq.ts";
import { ConstantEqualityComparer } from "../expression.equality-comparers/constant.equality-comparer";

describe("Iterator matcher", () => {

    beforeEach(() => {
        createInjector(IteratorMatcher, [StaticInjector, IterableTester]);
    });

    it("Returns true", () => {
        const left = [2];
        const right = [1];

        const constantEqualityComparer = new Mock<ConstantEqualityComparer>()
            .setup(instance => instance.equals(2, 1))
            .returns(true)
            .object();
        resolveMock(StaticInjector)
            .setup(instance => instance.get(ConstantEqualityComparer))
            .returns(constantEqualityComparer);
        resolveMock(IterableTester)
            .setup(instance => instance.verify(left, right))
            .returns(true);

        const provider = resolve2(IteratorMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns undefined when compared values do not pass iterable condition", () => {
        const left = [];
        const right = {};

        resolveMock(IterableTester)
            .setup(instance => instance.verify(left, right))
            .returns(false);

        const provider = resolve2(IteratorMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(undefined);
    });

    it("Returns false when compared values have different length", () => {
        const left = [];
        const right = [1];

        resolveMock(IterableTester)
            .setup(instance => instance.verify(left, right))
            .returns(true);

        const provider = resolve2(IteratorMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when compared values have different members", () => {
        const left = [2];
        const right = [1];

        const constantEqualityComparer = new Mock<ConstantEqualityComparer>()
            .setup(instance => instance.equals(2, 1))
            .returns(false)
            .object();
        resolveMock(StaticInjector)
            .setup(instance => instance.get(ConstantEqualityComparer))
            .returns(constantEqualityComparer);
        resolveMock(IterableTester)
            .setup(instance => instance.verify(left, right))
            .returns(true);

        const provider = resolve2(IteratorMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });
});
