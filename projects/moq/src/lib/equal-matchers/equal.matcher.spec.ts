import { resolveBuilder } from "../../tests.components/resolve.builder";
import { CommonTypeProvider } from "./common-type.provider";
import { TypesMatcher } from "./types.matcher";
import { PrimitiveMatcher } from "./primitive.matcher";
import { ObjectMatcher } from "./object.matcher";
import { FunctionMatcher } from "./function.matcher";
import { EqualMatcher } from "./equal.matcher";

xdescribe("Equal matcher", () => {

    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const typesMatcher = jasmine.createSpyObj<TypesMatcher>("", ["matched"]);
        const commonTypeProvider = jasmine.createSpyObj<CommonTypeProvider>("", ["ofType"]);
        const primitiveMatcher = jasmine.createSpyObj<PrimitiveMatcher>("", ["matched"]);
        const objectMatcher = jasmine.createSpyObj<ObjectMatcher>("", ["matched"]);
        const functionMatcher = jasmine.createSpyObj<FunctionMatcher>("", ["matched"]);

        resolve = resolveBuilder([
            [TypesMatcher, typesMatcher],
            [PrimitiveMatcher, primitiveMatcher],
            [CommonTypeProvider, commonTypeProvider],
            [ObjectMatcher, objectMatcher],
            [FunctionMatcher, functionMatcher],
            [EqualMatcher, new EqualMatcher(typesMatcher, commonTypeProvider, primitiveMatcher, objectMatcher, functionMatcher)]
        ]);
    });

    it("Returns false when compared values have different type", () => {
        const left = {};
        const right = {};

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(false);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(false);
    });

    it("Returns primitive matcher result when compared values of undefined type", () => {
        const left = undefined;
        const right = undefined;

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(CommonTypeProvider)
            .ofType.withArgs(left, right).and.returnValue("undefined");
        resolve(PrimitiveMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns object matcher result when compared values of object type", () => {
        const left = {};
        const right = {};

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(CommonTypeProvider)
            .ofType.withArgs(left, right).and.returnValue("object");
        resolve(ObjectMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of boolean type", () => {
        const left = true;
        const right = false;

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(CommonTypeProvider)
            .ofType.withArgs(left, right).and.returnValue("boolean");
        resolve(PrimitiveMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of number type", () => {
        const left = 1;
        const right = 2;

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(CommonTypeProvider)
            .ofType.withArgs(left, right).and.returnValue("number");
        resolve(PrimitiveMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of string type", () => {
        const left = "1";
        const right = "2";

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(CommonTypeProvider)
            .ofType.withArgs(left, right).and.returnValue("string");
        resolve(PrimitiveMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns function matcher result when compared values of function type", () => {
        const left = () => undefined;
        const right = () => 1;

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(CommonTypeProvider)
            .ofType.withArgs(left, right).and.returnValue("function");
        resolve(FunctionMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of symbol type", () => {
        const left = Symbol("a");
        const right = Symbol("b");

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(CommonTypeProvider)
            .ofType.withArgs(left, right).and.returnValue("symbol");
        resolve(PrimitiveMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

    it("Returns primitive matcher result when compared values of bigint type", () => {
        const left = BigInt(1);
        const right = BigInt(2);

        resolve(TypesMatcher)
            .matched.withArgs(left, right).and.returnValue(true);
        resolve(CommonTypeProvider)
            .ofType.withArgs(left, right).and.returnValue("bigint");
        resolve(PrimitiveMatcher)
            .matched.withArgs(left, right).and.returnValue(true);

        const provider = resolve(EqualMatcher);
        const actual = provider.matched(left, right);

        expect(actual).toBe(true);
    });

});
