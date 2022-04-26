import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { CommonTypeProvider } from "./common-type.provider";
import { TypesMatcher } from "./types.matcher";
import { PrimitiveMatcher } from "./primitive.matcher";
import { ObjectMatcher } from "./object.matcher";
import { FunctionMatcher } from "./function.matcher";
import { EqualMatcher } from "./equal.matcher";

describe("Equal matcher", () => {

    beforeEach(() => {
        createInjector(EqualMatcher, [TypesMatcher, CommonTypeProvider, PrimitiveMatcher, ObjectMatcher, FunctionMatcher]);
    });

    it("Returns false when compared values have different type", () => {
        const left = {};
        const right = {};

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(false);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns primitive matcher result when compared values of undefined type", () => {
        const left = undefined;
        const right = undefined;

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);
        resolveMock(CommonTypeProvider)
            .setup(instance => instance.ofType(left, right))
            .returns("undefined");
        resolveMock(PrimitiveMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns object matcher result when compared values of object type", () => {
        const left = {};
        const right = {};

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);
        resolveMock(CommonTypeProvider)
            .setup(instance => instance.ofType(left, right))
            .returns("object");
        resolveMock(ObjectMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of boolean type", () => {
        const left = true;
        const right = false;

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);
        resolveMock(CommonTypeProvider)
            .setup(instance => instance.ofType(left, right))
            .returns("boolean");
        resolveMock(PrimitiveMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of number type", () => {
        const left = 1;
        const right = 2;

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);
        resolveMock(CommonTypeProvider)
            .setup(instance => instance.ofType(left, right))
            .returns("number");
        resolveMock(PrimitiveMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of string type", () => {
        const left = "1";
        const right = "2";

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);
        resolveMock(CommonTypeProvider)
            .setup(instance => instance.ofType(left, right))
            .returns("string");
        resolveMock(PrimitiveMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns function matcher result when compared values of function type", () => {
        const left = () => undefined;
        const right = () => 1;

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);
        resolveMock(CommonTypeProvider)
            .setup(instance => instance.ofType(left, right))
            .returns("function");
        resolveMock(FunctionMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of symbol type", () => {
        const left = Symbol("a");
        const right = Symbol("b");

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);
        resolveMock(CommonTypeProvider)
            .setup(instance => instance.ofType(left, right))
            .returns("symbol");
        resolveMock(PrimitiveMatcher)
            .setup(instance => instance.matched(left, right as any))
            .returns(true);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of bigint type", () => {
        const left = BigInt(1);
        const right = BigInt(2);

        resolveMock(TypesMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);
        resolveMock(CommonTypeProvider)
            .setup(instance => instance.ofType(left, right))
            .returns("bigint");
        resolveMock(PrimitiveMatcher)
            .setup(instance => instance.matched(left, right))
            .returns(true);

        const provider = resolve2(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

});
