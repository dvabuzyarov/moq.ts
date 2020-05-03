import { resolveBuilder } from "../../tests.components/resolve.builder";
import { IteratorMatcher } from "./iterator.matcher";
import { ConstantMatcher } from "../expression-matchers/constant-matcher";
import { IterableTester } from "./iterable.tester";
import { ConstantMatcherFactory } from "../expression-matchers/constant.matcher.factory";

describe("Iterator matcher", () => {

    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const constantMatcherFactory = jasmine.createSpyObj<ConstantMatcherFactory>("", ["create"]);
        const constantMatcher = jasmine.createSpyObj<ConstantMatcher>("", ["matched"]);
        const iterableTester = jasmine.createSpyObj<IterableTester>("", ["verify"]);

        constantMatcherFactory.create.and.returnValue(constantMatcher);

        resolve = resolveBuilder([
            [ConstantMatcher, constantMatcher],
            [IterableTester, iterableTester],
            [IteratorMatcher, new IteratorMatcher(constantMatcherFactory, iterableTester)]
        ]);
    });

    it("Returns true", () => {
        const left = [2];
        const right = [1];

        resolve(IterableTester)
            .verify.withArgs(left, right).and.returnValue(true);

        resolve(ConstantMatcher)
            .matched.withArgs(2, 1).and.returnValue(true);

        const provider = resolve(IteratorMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when compared values do not pass iterable condition", () => {
        const left = [];
        const right = {};

        resolve(IterableTester)
            .verify.withArgs(left, right).and.returnValue(false);

        const provider = resolve(IteratorMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when compared values have different length", () => {
        const left = [];
        const right = [1];

        resolve(IterableTester)
            .verify.withArgs(left, right).and.returnValue(true);

        const provider = resolve(IteratorMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when compared values have different members", () => {
        const left = [2];
        const right = [1];

        resolve(IterableTester)
            .verify.withArgs(left, right).and.returnValue(true);

        resolve(ConstantMatcher)
            .matched.withArgs(2, 1).and.returnValue(false);

        const provider = resolve(IteratorMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });
});
