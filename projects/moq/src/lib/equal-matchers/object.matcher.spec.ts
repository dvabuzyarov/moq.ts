import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { ObjectMatcher } from "./object.matcher";
import { IteratorMatcher } from "./iterator.matcher";
import { POJOMatcher } from "./pojo.matcher";

xdescribe("Object matcher", () => {
    beforeEach(() => {
        const iteratorMatcher = jasmine.createSpyObj<IteratorMatcher>("", ["matched"]);
        const pojoMatcher = jasmine.createSpyObj<POJOMatcher>("", ["matched"]);

        createInjector([
            {provide: IteratorMatcher, useValue: iteratorMatcher, deps: []},
            {provide: POJOMatcher, useValue: pojoMatcher, deps: []},
            // {provide: ObjectMatcher, useClass: ObjectMatcher, deps: [IteratorMatcher, POJOMatcher]},
            {provide: ObjectMatcher, useClass: ObjectMatcher, deps: []},
        ]);
    });

    it("Returns true when compared values are null", () => {
        const left = null;
        const right = null;

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when compared values is the same", () => {
        const left = {};
        const right = left;

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when compared values support iterable protocol and equal", () => {
        const left = {};
        const right = {};

        resolve(IteratorMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when compared values are POJO and equal", () => {
        const left = {};
        const right = {};

        resolve(IteratorMatcher)
            .matched.withArgs(left, right).and.returnValue(false);

        resolve(POJOMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when compared values are POJO and not equal", () => {
        const left = {};
        const right = {};

        resolve(IteratorMatcher)
            .matched.withArgs(left, right).and.returnValue(false);

        resolve(POJOMatcher)
            .matched.withArgs(left, right).and.returnValue(false);

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });


});
