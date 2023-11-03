import { ConstantFormatter } from "./constant.formatter";
import { It } from "../reflector/expression-predicates";
import { createInjector, resolve2 } from "../../tests.components/resolve.builder";

describe("Constant formatter", () => {

    beforeEach(() => {
        createInjector(ConstantFormatter, []);
    });

    it("Returns formatted description for undefined", () => {
        const value = undefined;

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("undefined");
    });

    it("Returns formatted description for null", () => {
        const value = null;

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("null");
    });

    it("Returns formatted description for boolean", () => {
        const value = true;

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("true");
    });

    it("Returns formatted description for string", () => {
        const value = "string value";

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("'string value'");
    });

    it("Returns formatted description for date", () => {
        const value = new Date(2016);

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe(`${value}`);
    });

    it("Returns formatted description for number", () => {
        const value = 2016.12;

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("2016.12");
    });

    it("Returns formatted description for Regex", () => {
        const value = new RegExp("^$");

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("/^$/");
    });

    it("Returns formatted description for object", () => {
        const value = {property: "value"};

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("{'property': 'value'}");
    });

    it("Returns formatted description for array", () => {
        const value = [1, "string value", true, new It(() => undefined), [0, 3]];

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("[1,'string value',true,It.Is(() => undefined),[0,3]]");
    });

    it("Returns formatted description for It", () => {
        const predicate = () => undefined;
        const value = new It(predicate);

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("It.Is(() => undefined)");
    });

    it("Returns formatted description for function", () => {
        const value = function name() {
            return 1;
        };

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe(`${value}`);
    });

    it("Returns formatted description for arrow function", () => {
        const value = () => 1;

        const matcher = resolve2(ConstantFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("() => 1");
    });

});
