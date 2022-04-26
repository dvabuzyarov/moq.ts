import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { MapMatcher } from "./map.matcher";
import { StaticInjector } from "../static.injector/injector";
import { Mock } from "moq.ts";
import { ConstantEqualityComparer } from "../expression.equality-comparers/constant.equality-comparer";

describe("Map matcher", () => {

    beforeEach(() => {
        createInjector(MapMatcher, [StaticInjector]);
    });

    beforeEach(() => {
        resolveMock(StaticInjector).prototypeof(StaticInjector.prototype);
    });

    it("Returns true when the compared values are equal", () => {
        const left = new Map();
        const right = new Map();

        const matcher = resolve2(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns false when the compared values have different size", () => {
        const left = new Map([["prop1", 1]]);
        const right = new Map();

        const matcher = resolve2(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns false when the compared values have different value", () => {
        const left = new Map([["prop1", 1]]);
        const right = new Map([["prop1", 1]]);

        const constantEqualityComparer = new Mock<ConstantEqualityComparer>()
            .setup(instance => instance.equals(1, 1))
            .returns(false)
            .object();
        resolveMock(StaticInjector)
            .setup(instance => instance.get(ConstantEqualityComparer))
            .returns(constantEqualityComparer);

        const matcher = resolve2(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns undefined when the left is not instance of Map", () => {
        const left = null;
        const right = new Map();

        const matcher = resolve2(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });

    it("Returns undefined when the right is not instance of Map", () => {
        const left = new Map();
        const right = null;

        const matcher = resolve2(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });

    it("Returns undefined when the both are not instance of Map", () => {
        const left = null;
        const right = null;

        const matcher = resolve2(MapMatcher);
        const actual = matcher.matched(left, right);

        expect(actual).toBe(undefined);
    });
});
