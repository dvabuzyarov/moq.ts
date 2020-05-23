import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { MapMatcher } from "./map.matcher";
import { ConstantMatcher } from "../expression-matchers/constant.matcher";
import { Injector } from "../static.injector/injector";

describe("Map matcher", () => {
    beforeEach(() => {
        const constantMatcher = jasmine.createSpyObj<ConstantMatcher>("", ["matched"]);
        createInjector([
            {provide: ConstantMatcher, useValue: constantMatcher},
            {provide: MapMatcher, useClass: MapMatcher, deps: [Injector]},
        ]);
    });

    it("Returns true when the compared values are equal", () => {
        const left = new Map();
        const right = new Map();

        const matcher = resolve(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the compared values have different size", () => {
        const left = new Map([["prop1", 1]]);
        const right = new Map();

        const matcher = resolve(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when the compared values have different value", () => {
        const left = new Map([["prop1", 1]]);
        const right = new Map([["prop1", 1]]);

        resolve(ConstantMatcher)
            .matched.withArgs(1, 1).and.returnValue(false);

        const matcher = resolve(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns undefined when the left is not instance of Map", () => {
        const left = null;
        const right = new Map();

        const matcher = resolve(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });

    it("Returns undefined when the right is not instance of Map", () => {
        const left = new Map();
        const right = null;

        const matcher = resolve(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });

    it("Returns undefined when the both are not instance of Map", () => {
        const left = null;
        const right = null;

        const matcher = resolve(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });
});
