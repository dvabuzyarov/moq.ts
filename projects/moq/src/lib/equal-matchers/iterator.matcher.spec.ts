import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { IteratorMatcher } from "./iterator.matcher";
import { ConstantMatcher } from "../expression-matchers/constant-matcher";
import { IterableTester } from "./iterable.tester";

xdescribe("Iterator matcher", () => {

    beforeEach(() => {
        const constantMatcher = jasmine.createSpyObj<ConstantMatcher>("", ["matched"]);
        const iterableTester = jasmine.createSpyObj<IterableTester>("", ["verify"]);

        createInjector([
            {provide: ConstantMatcher, useValue: constantMatcher, deps: []},
            {provide: IterableTester, useValue: iterableTester, deps: []},
            {provide: IteratorMatcher, useClass: IteratorMatcher, deps: [ConstantMatcher, IterableTester]}
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
