import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ObjectFormatter } from "./object.formatter";
import { It, Mock, MoqAPI } from "moq.ts";
import { OBJECT_FORMATTERS } from "./object-formatters.injection-token";
import { IObjectFormatter } from "./object-formatter.type";

describe("Object formatter", () => {

    beforeEach(() => {
        createInjector(ObjectFormatter, [OBJECT_FORMATTERS]);
    });

    it("Returns default representation when all formatters return undefined", () => {
        const value = {};

        const firstMatcher = new Mock<IObjectFormatter>()
            .setup(instance => instance.format(value))
            .returns(undefined)
            .object();
        const secondMatcher = new Mock<IObjectFormatter>()
            .setup(instance => instance.format(value))
            .returns(undefined)
            .object();
        resolveMock(OBJECT_FORMATTERS)
            .setup(It.IsAny())
            .mimics([firstMatcher, secondMatcher]);

        const provider = resolve2(ObjectFormatter);
        const actual = provider.format(value);

        expect(actual).toEqual(`${value}`);
    });

    it("Returns formatted value", () => {
        const value = {};
        const expected = "expected";

        const firstMatcher = new Mock<IObjectFormatter>()
            .setup(instance => instance.format(value))
            .returns(expected)
            .object();
        const secondMatcher = new Mock<IObjectFormatter>()
            .setup(instance => instance.format(value))
            .returns(undefined)
            .object();
        resolveMock(OBJECT_FORMATTERS)
            .setup(It.IsAny())
            .mimics([firstMatcher, secondMatcher]);

        const provider = resolve2(ObjectFormatter);
        const actual = provider.format(value);

        expect(actual).toBe(expected);
    });

    it("Skips undefined value", () => {
        const value = {};
        const expected = "expected";

        const firstMatcher = new Mock<IObjectFormatter>()
            .setup(instance => instance.format(value))
            .returns(undefined)
            .object();
        const secondMatcher = new Mock<IObjectFormatter>()
            .setup(instance => instance.format(value))
            .returns(expected)
            .object();
        resolveMock(OBJECT_FORMATTERS)
            .setup(It.IsAny())
            .mimics([firstMatcher, secondMatcher]);

        const provider = resolve2(ObjectFormatter);
        const actual = provider.format(value);

        expect(actual).toBe(expected);
        (firstMatcher[MoqAPI] as Mock<IObjectFormatter>).verify(instance => instance.format(value));
    });

});
