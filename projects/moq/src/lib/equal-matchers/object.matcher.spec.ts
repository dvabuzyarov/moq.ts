import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { ObjectMatcher } from "./object.matcher";
import { IObjectMatcher } from "./object-matcher.type";
import { OBJECT_MATCHERS } from "./object-matchers.injection-token";
import { InjectionToken } from "../static.injector/injection_token";

describe("Object matcher", () => {
    const FIRST_MATCHER = new InjectionToken<IObjectMatcher>("First Matcher");
    const SECOND_MATCHER = new InjectionToken<IObjectMatcher>("Second Matcher");

    beforeEach(() => {
        const firstMatcher = jasmine.createSpyObj<IObjectMatcher>("", ["matched"]);
        const secondMatcher = jasmine.createSpyObj<IObjectMatcher>("", ["matched"]);

        createInjector([
            {provide: FIRST_MATCHER, useValue: firstMatcher, deps: []},
            {provide: OBJECT_MATCHERS, useValue: firstMatcher, multi: true, deps: []},
            {provide: OBJECT_MATCHERS, useValue: secondMatcher, multi: true, deps: []},
            {provide: SECOND_MATCHER, useValue: secondMatcher, deps: []},
            {provide: ObjectMatcher, useClass: ObjectMatcher, deps: [OBJECT_MATCHERS]},
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

    it("Returns false when all matchers return undefined", () => {
        const left = {};
        const right = {};

        resolve(FIRST_MATCHER)
            .matched.withArgs(left, right).and.returnValue(undefined);
        resolve(SECOND_MATCHER)
            .matched.withArgs(left, right).and.returnValue(undefined);

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when the first matcher returns false", () => {
        const left = {};
        const right = {};

        resolve(FIRST_MATCHER)
            .matched.withArgs(left, right).and.returnValue(false);
        resolve(SECOND_MATCHER)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true when the first matcher returns true", () => {
        const left = {};
        const right = {};

        resolve(FIRST_MATCHER)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(SECOND_MATCHER)
            .matched.withArgs(left, right).and.returnValue(false);

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the second matcher returns false", () => {
        const left = {};
        const right = {};

        resolve(FIRST_MATCHER)
            .matched.withArgs(left, right).and.returnValue(undefined);
        resolve(SECOND_MATCHER)
            .matched.withArgs(left, right).and.returnValue(false);

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns true when the second matcher returns true", () => {
        const left = {};
        const right = {};

        resolve(FIRST_MATCHER)
            .matched.withArgs(left, right).and.returnValue(undefined);
        resolve(SECOND_MATCHER)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(ObjectMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

});
