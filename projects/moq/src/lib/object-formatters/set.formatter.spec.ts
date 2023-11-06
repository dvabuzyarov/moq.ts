import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { StaticInjector } from "../static.injector/injector";
import { Mock } from "moq.ts";
import { ObjectFormatter } from "./object.formatter";
import { SetFormatter } from "./set.formatter";

describe("Set formatter", () => {

    beforeEach(() => {
        createInjector(SetFormatter, [StaticInjector]);
    });

    beforeEach(() => {
        resolveMock(StaticInjector).prototypeof(StaticInjector.prototype);
    });

    it("Returns formatted value", () => {
        const number = 1;
        const string = "string value";
        const value = new Set([number, string]);

        const objectFormatter = new Mock<ObjectFormatter>()
            .setup(instance => instance.format(number))
            .returns("1")
            .setup(instance => instance.format(string))
            .returns("2")
            .object();
        resolveMock(StaticInjector)
            .setup(instance => instance.get(ObjectFormatter))
            .returns(objectFormatter);

        const matcher = resolve2(SetFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("Set([1,2])");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(SetFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
