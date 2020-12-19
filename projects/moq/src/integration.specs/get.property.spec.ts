import { It } from "../lib/reflector/expression-predicates";
import { GetPropertyExpression } from "../lib/reflector/expressions";
import { Times } from "../lib/times";
import { Mock } from "../lib/mock";

interface ITestObject {
    property: string;
}

describe("Mock: Get property", () => {

    it("Returns value with a simple setup", () => {
        const value = "value";
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .returns(value)
            .object();

        const actual = object.property;

        expect(actual).toBe(value);
    });

    it("Returns value with a predicated setup", () => {
        const value = "value";

        const object = new Mock<ITestObject>()
            .setup(() => It.Is((expression: GetPropertyExpression) => expression.name === "property"))
            .returns(value)
            .object();

        expect(object.property).toBe(value);
    });

    it("Returns undefined for unset property", () => {
        const object = new Mock<ITestObject>()
            .object();

        const actual = object.property;

        expect(actual).toBeUndefined();
    });

    it("Returns last written value", () => {
        const value = "value";
        const newValue = "new value";

        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .returns(value)
            .object();

        object.property = newValue;
        const actual = object.property;

        expect(actual).toBe(newValue);
    });

    it("Returns the initial value", () => {
        const value = "value";
        const newValue = "new value";

        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .returns(value)
            // let's deny any write operation on the property
            .setup(instance => {
                instance.property = It.IsAny();
            })
            .returns(false as any)
            .object();

        try {
            object.property = newValue;
        } catch (e) {
            const actual = object.property;
            expect(actual).toBe(value);
        }
    });

    it("Calls callback", () => {
        const value = "value";
        const callback = jasmine.createSpy("callback").and.returnValue(value);
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .callback(callback)
            .object();

        const actual = object.property;

        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalled();
    });

    it("Throws an exception", () => {
        const error = new Error("exception");
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .throws(error)
            .object();

        expect(() => object.property).toThrow(error);
    });

    it("Verifies", () => {

        const name = "mock name";
        const mock = new Mock<ITestObject>({name});
        const object = mock.object();

        const value = object.property;

        const action = () => mock.verify(instance => instance.property, Times.AtLeast(2));

        expect(action).toThrow();
    });
});
