import { Mock } from "../lib/mock";
import { It } from "../lib/expected-expressions/expression-predicates";

describe("Read only properties", () => {

    it("Throws error for accessor descriptor of a class with prototype API", () => {
        class TestObject {
            get name() {
                return undefined;
            }
        }

        const object = new Mock<TestObject>()
            .prototypeof(TestObject.prototype)
            .setup(instance => (instance as any).name = It.IsAny())
            .returns(true as any)
            .object();

        expect(() => (object as any).name = "").toThrowMatching(error => error instanceof TypeError);
    });

    it("Throws error for accessor descriptor of a class with target", () => {
        class TestObject {
            get name() {
                return undefined;
            }
        }

        const object = new Mock<TestObject>({target: new TestObject()})
            .setup(instance => (instance as any).name = It.IsAny())
            .returns(true as any)
            .object();

        expect(() => (object as any).name = "").toThrowMatching(error => error instanceof TypeError);
    });

    it("Throws error for frozen object with prototype API", () => {
        const testObject = Object.freeze({name: ""});

        const object = new Mock<typeof testObject>()
            .prototypeof(testObject)
            .setup(instance => (instance as any).name = It.IsAny())
            .returns(true as any)
            .object();

        expect(() => (object as any).name = "").toThrowMatching(error => error instanceof TypeError);
    });

    it("Throws error for frozen object with target", () => {
        const testObject = Object.freeze({name: ""});

        const object = new Mock<typeof testObject>({target: testObject})
            .setup(instance => (instance as any).name = It.IsAny())
            .returns(true as any)
            .object();

        expect(() => (object as any).name = "").toThrowMatching(error => error instanceof TypeError);
    });

    it("Throws error for object with overwritten property description with target", () => {
        class TestObject {
            name: string;
        }

        const test = new TestObject();
        Object.defineProperty(test, "name", {value: "", writable: false, configurable: true});

        const object = new Mock<typeof test>({target: test})
            .setup(instance => (instance as any).name = It.IsAny())
            .returns(true as any)
            .object();

        expect(() => (object as any).name = "").toThrowMatching(error => error instanceof TypeError);
    });

    it("Throws error for object with overwritten property description with prototype API", () => {
        class TestObject {
            name: string;
        }

        const test = new TestObject();
        Object.defineProperty(test, "name", {value: "", writable: false, configurable: true});

        const object = new Mock<typeof test>()
            .prototypeof(test)
            .setup(instance => (instance as any).name = It.IsAny())
            .returns(true as any)
            .object();

        expect(() => (object as any).name = "").toThrowMatching(error => error instanceof TypeError);
    });
});
