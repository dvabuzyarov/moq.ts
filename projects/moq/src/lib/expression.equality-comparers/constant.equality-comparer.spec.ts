import { ConstantEqualityComparer } from "./constant.equality-comparer";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ItEqualityComparer } from "./it.equality-comparer";

describe("Constant equality comparer", () => {
    beforeEach(() => {
        createInjector(ConstantEqualityComparer, [ItEqualityComparer]);
    });

    it("Returns true when both are undefined", () => {
        const left = undefined;
        const right = undefined;

        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(undefined);

        const matcher = resolve2(ConstantEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are null", () => {
        const left = null;
        const right = null;

        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(undefined);

        const matcher = resolve2(ConstantEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(true);
    });

    it("Returns true when both are the same value", () => {
        const left = 1;
        const right = 1;

        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(undefined);

        const matcher = resolve2(ConstantEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(true);
    });


    it("Returns false when left and right are object", () => {
        const left = {};
        const right = {};

        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(undefined);

        const matcher = resolve2(ConstantEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(false);
    });


    it("Returns value from It matcher when it is not undefined", () => {
        const left = "left";
        const right = {};

        const expected = true;
        resolveMock(ItEqualityComparer)
            .setup(instance => instance.equals(left, right))
            .returns(expected);


        const matcher = resolve2(ConstantEqualityComparer);
        const actual = matcher.equals(left, right);

        expect(actual).toBe(expected);
    });
});
