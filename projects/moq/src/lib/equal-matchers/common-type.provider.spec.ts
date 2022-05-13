import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { CommonTypeProvider } from "./common-type.provider";

describe("Common type provider", () => {

    beforeEach(() => {
        createInjector(CommonTypeProvider, []);
    });

    it("Returns undefined", () => {
        const left = undefined;
        const right = undefined;

        const provider = resolve2(CommonTypeProvider);
        const actual = provider.ofType(left, right);

        expect(actual).toBe("undefined");
    });

    it("Returns object", () => {
        const left = {};
        const right = {};

        const provider = resolve2(CommonTypeProvider);
        const actual = provider.ofType(left, right);

        expect(actual).toBe("object");
    });

    it("Returns boolean", () => {
        const left = true;
        const right = false;

        const provider = resolve2(CommonTypeProvider);
        const actual = provider.ofType(left, right);

        expect(actual).toBe("boolean");
    });

    it("Returns number", () => {
        const left = 1;
        const right = 2;

        const provider = resolve2(CommonTypeProvider);
        const actual = provider.ofType(left, right);

        expect(actual).toBe("number");
    });

    it("Returns string", () => {
        const left = "";
        const right = "value";

        const provider = resolve2(CommonTypeProvider);
        const actual = provider.ofType(left, right);

        expect(actual).toBe("string");
    });

    it("Returns function", () => {
        const left = () => undefined;
        const right = () => undefined;

        const provider = resolve2(CommonTypeProvider);
        const actual = provider.ofType(left, right);

        expect(actual).toBe("function");
    });

    it("Returns function", () => {
        const left = Symbol("a");
        const right = Symbol("z");

        const provider = resolve2(CommonTypeProvider);
        const actual = provider.ofType(left, right);

        expect(actual).toBe("symbol");
    });

    it("Returns bigint", () => {
        const left = BigInt("1");
        const right = BigInt("0x1fffffffffffff");

        const provider = resolve2(CommonTypeProvider);
        const actual = provider.ofType(left, right);

        expect(actual).toBe("bigint");
    });
});
