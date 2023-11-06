import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { StaticInjector } from "../static.injector/injector";
import { Mock } from "moq.ts";
import { ObjectFormatter } from "./object.formatter";
import { MapFormatter } from "./map.formatter";

describe("Map formatter", () => {

    beforeEach(() => {
        createInjector(MapFormatter, [StaticInjector]);
    });

    beforeEach(() => {
        resolveMock(StaticInjector).prototypeof(StaticInjector.prototype);
    });

    it("Returns formatted value", () => {
        const number = 1;
        const string = "string value";
        const value = new Map([[number, string]]);

        const objectFormatter = new Mock<ObjectFormatter>()
            .setup(instance => instance.format(number))
            .returns("1")
            .setup(instance => instance.format(string))
            .returns("2")
            .object();
        resolveMock(StaticInjector)
            .setup(instance => instance.get(ObjectFormatter))
            .returns(objectFormatter);

        const matcher = resolve2(MapFormatter);
        const actual = matcher.format(value);

        expect(actual).toBe("Map([[1,2]])");
    });

    it("Returns undefined for unsupported types", () => {
        const provider = resolve2(MapFormatter);
        const actual = provider.format(undefined);

        expect(actual).toBe(undefined);
    });
});
