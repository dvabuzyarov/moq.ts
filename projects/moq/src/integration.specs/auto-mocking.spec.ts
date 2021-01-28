/*eslint-disable max-classes-per-file*/
import { Mock } from "../lib/mock";
import { MoqAPI } from "../lib/moq";
import { AutoMockInjectorConfig } from "../lib/auto-mocking/auto-mock-injector.config";

describe("Auto mocking", () => {

    it("Returns auto mock for instance.property.property", () => {
        const object = new Mock<{ shallow: { deep: string } }>()
            .setup(instance => instance.shallow.deep)
            .returns(undefined)
            .object();

        const actual = object.shallow;
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for instance.property.method()", () => {
        const object = new Mock<{ shallow: { deep(): string } }>()
            .setup(instance => instance.shallow.deep())
            .returns(undefined)
            .object();

        const actual = object.shallow;
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for instance.method().property", () => {
        const object = new Mock<{ shallow(): { deep: string } }>()
            .setup(instance => instance.shallow().deep)
            .returns(undefined)
            .object();

        const actual = object.shallow();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for instance.method().method()", () => {
        const object = new Mock<{ shallow(): { deep(): string } }>()
            .setup(instance => instance.shallow().deep())
            .returns(undefined)
            .object();

        const actual = object.shallow();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for method().property", () => {
        const object = new Mock<() => { deep: string }>()
            .setup(instance => instance().deep)
            .returns(undefined)
            .object();

        const actual = object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for method().method()", () => {
        const object = new Mock<() => { deep(): string }>()
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

        const object = new Mock<typeof TestObject>({target: TestObject})
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

        const object = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance().deep())
            .returns(undefined)
            .object();

        const actual = new object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns auto mock for instance.method()method()", () => {

        const object = new Mock<{ shallow(): { deep(): () => { deep2(): string } } }>()
            .setup(instance => instance.shallow().deep()())
            .returns(undefined)
            .object();

        const actual = object.shallow().deep();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Returns properly configured auto mock", () => {

        const object = new Mock<{ shallow: { deep: string } }>()
            .setup(instance => instance.shallow.deep)
            .returns(undefined)
            .object();

        const actual = object.shallow;

        expect(actual[MoqAPI].options.injectorConfig).toEqual(jasmine.any(AutoMockInjectorConfig));
        expect(actual[MoqAPI].name).toEqual("instance.shallow");
    });

    it("Verifies auto mock for instance.property.property", () => {
        const mock = new Mock<{ shallow: { deep: string } }>()
            .setup(instance => instance.shallow.deep)
            .returns(undefined);

        const action = () => mock.verify(instance => instance.shallow.deep);
        expect(action).toThrow();

        const actual = mock.object().shallow.deep;
        mock.verify(instance => instance.shallow.deep);
    });

    it("Verifies auto mock for instance.property.method()", () => {
        const object = new Mock<{ shallow: { deep(): string } }>()
            .setup(instance => instance.shallow.deep())
            .returns(undefined)
            .object();

        const actual = object.shallow;
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Verifies auto mock for instance.method().property", () => {
        const object = new Mock<{ shallow(): { deep: string } }>()
            .setup(instance => instance.shallow().deep)
            .returns(undefined)
            .object();

        const actual = object.shallow();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Verifies auto mock for instance.method().method()", () => {
        const object = new Mock<{ shallow(): { deep(): string } }>()
            .setup(instance => instance.shallow().deep())
            .returns(undefined)
            .object();

        const actual = object.shallow();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Verifies auto mock for method().property", () => {
        const object = new Mock<() => { deep: string }>()
            .setup(instance => instance().deep)
            .returns(undefined)
            .object();

        const actual = object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Verifies auto mock for method().method()", () => {
        const object = new Mock<() => { deep(): string }>()
            .setup(instance => instance().deep())
            .returns(undefined)
            .object();

        const actual = object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Verifies auto mock for new instance().property", () => {
        class TestObject {
            public deep: string;
        }

        const object = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance().deep)
            .returns(undefined)
            .object();

        const actual = new object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Verifies auto mock for new instance().method()", () => {
        class TestObject {
            public deep = () => undefined;
        }

        const object = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance().deep())
            .returns(undefined)
            .object();

        const actual = new object();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });

    it("Verifies auto mock for instance.method()method()", () => {

        const object = new Mock<{ shallow(): { deep(): () => { deep2(): string } } }>()
            .setup(instance => instance.shallow().deep()())
            .returns(undefined)
            .object();

        const actual = object.shallow().deep();
        expect(actual[MoqAPI]).toEqual(jasmine.any(Mock));
    });
});
