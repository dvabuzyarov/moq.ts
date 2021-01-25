import { Mock } from "../lib/mock";
import { It } from "../lib/reflector/expression-predicates";
import { Times } from "../lib/times";
import { SetPropertyInteraction } from "../lib/interactions";
import { nameof } from "../tests.components/nameof";

interface ITestObject {
    property: string;
}

describe("Set property", () => {

    it("Allows write", () => {
        const value = "value";
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property = "a")
            .returns(true as any)
            .object();

        const action = () => object.property = "a";

        expect(action).not.toThrow();
    });


    it("Denies write", () => {
        const object = new Mock<ITestObject>()
            .setup(instance => {
                instance.property = "a";
            })
            .returns(false as any)
            .object();

        const action = () => object.property = "a";

        expect(action).toThrow();
    });


    it("Calls callback", () => {
        const value = "a";
        const callback = jasmine.createSpy("callback").and.returnValue(true);
        const object = new Mock<ITestObject>()
            .setup(instance => {
                instance.property = It.Is(val => val === value);
            })
            .callback(callback)
            .object();

        const action = () => object.property = value;

        expect(action).not.toThrow();
        expect(callback).toHaveBeenCalledWith(new SetPropertyInteraction(nameof<ITestObject>("property"), value));
    });

    it("Throws an exception", () => {
        const error = new Error("exception");
        const object = new Mock<ITestObject>()
            .setup(instance => {
                instance.property = "a";
            })
            .throws(error)
            .object();

        expect(() => object.property = "a").toThrow(error);
    });

    it("Verifies", () => {
        const mock = new Mock<ITestObject>()
            .setup(instance => instance.property = "a")
            .returns(false as any);

        const object = mock.object();
        const action = () => object.property = "a";

        const verify = () => mock.verify(instance => {
            instance.property = "a";
        }, Times.Once());

        expect(action).toThrow();
        expect(verify).not.toThrow();
    });
});
