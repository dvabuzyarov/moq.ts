/*eslint-disable max-classes-per-file*/
import { Mock } from "../lib/mock";
import { MoqAPI } from "../lib/moq";
import { AutoMockInjectorConfig } from "../lib/auto-mocking/auto-mock-injector.config";
import { EqualMatchingInjectorConfig } from "../lib/injector/equal-matching-injector.config";
import { EXPRESSION_REFLECTOR } from "../lib/reflector/expression-reflector";
import { FullExpressionReflector } from "../lib/reflector/full.expression-reflector";

describe("Auto mocking", () => {
    const injectorConfig = new EqualMatchingInjectorConfig([], [
        {
            provide: EXPRESSION_REFLECTOR,
            useExisting: FullExpressionReflector,
            deps: []
        },
    ]);

    it("Returns auto mock for instance.property.property", () => {

        const object = new Mock<{ shallow: { deep: string } }>({injectorConfig})
            .setup(instance => instance.shallow.deep)
            .returns(undefined)
            .object();

        const actual = object.shallow;
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for instance.property.method()", () => {
        const object = new Mock<{ shallow: { deep(): string } }>({injectorConfig})
            .setup(instance => instance.shallow.deep())
            .returns(undefined)
            .object();

        const actual = object.shallow;
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for instance.method().property", () => {
        const object = new Mock<{ shallow(): { deep: string } }>({injectorConfig})
            .setup(instance => instance.shallow().deep)
            .returns(undefined)
            .object();

        const actual = object.shallow();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for instance.method().method()", () => {
        const object = new Mock<{ shallow(): { deep(): string } }>({injectorConfig})
            .setup(instance => instance.shallow().deep())
            .returns(undefined)
            .object();

        const actual = object.shallow();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for method().property", () => {
        const object = new Mock<() => { deep: string }>({injectorConfig})
            .setup(instance => instance().deep)
            .returns(undefined)
            .object();

        const actual = object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for method().method()", () => {
        const object = new Mock<() => { deep(): string }>({injectorConfig})
            .setup(instance => instance().deep())
            .returns(undefined)
            .object();

        const actual = object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for new instance().property", () => {
        class TestObject {
            public deep: string;
        }

        const object = new Mock<typeof TestObject>({target: TestObject, injectorConfig})
            .setup(instance => new instance().deep)
            .returns(undefined)
            .object();

        const actual = new object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for new instance().method()", () => {
        class TestObject {
            public deep = () => undefined;
        }

        const object = new Mock<typeof TestObject>({target: TestObject, injectorConfig})
            .setup(instance => new instance().deep())
            .returns(undefined)
            .object();

        const actual = new object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for instance.method()method()", () => {

        const object = new Mock<{ shallow(): { deep(): () => { deep2(): string } } }>({injectorConfig})
            .setup(instance => instance.shallow().deep()())
            .returns(undefined)
            .object();

        const actual = object.shallow().deep();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns properly configured auto mock", () => {

        const object = new Mock<{ shallow: { deep: string } }>({injectorConfig})
            .setup(instance => instance.shallow.deep)
            .returns(undefined)
            .object();

        const actual = object.shallow;

        expect(actual[MoqAPI].options.injectorConfig).toEqual(jasmine.any(AutoMockInjectorConfig));
        expect(actual[MoqAPI].name).toEqual("instance.shallow");
    });
});
