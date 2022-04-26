import { Mock } from "../lib/mock";
import { It } from "../lib/reflector/expression-predicates";
import { Times } from "../lib/times";
import { nameof } from "../tests.components/nameof";
import { PlayTimes } from "../lib/playables/play-times";
import { MoqAPI } from "../lib/moq";

interface ITestObject {
    property: string;

    method(): void;
}

class TestObject implements ITestObject {
    property: string;

    method(): void {
        return undefined;
    }
}

describe("Mock: In operator", () => {

    it("Returns true when mentioned in setup", () => {
        const value = "value";
        const object = new Mock<ITestObject>()
            .setup(instance => instance.property)
            .returns(value)
            .setup(instance => instance.method())
            .returns(undefined)
            .object();

        expect(nameof<ITestObject>("property") in object).toBe(true);
        expect(nameof<ITestObject>("method") in object).toBe(true);
    });

    it("Returns false for MoqAPI", () => {
        const object = new Mock<ITestObject>()
            .object();

        expect(MoqAPI in object).toBe(false);
    });

    it("Returns true for MoqAPI when it is mentioned in setup", () => {
        const mock = new Mock<ITestObject>();
        const object = mock
            .setup(instance => instance[MoqAPI])
            .returns(undefined)
            .object();

        expect(MoqAPI in object).toBe(true);
        expect(object[MoqAPI]).toBe(mock);
    });

    it("Returns false when does not mentioned in setup", () => {
        const object = new Mock<ITestObject>()
            .object();

        expect(nameof<ITestObject>("property") in object).toBe(false);
        expect(nameof<ITestObject>("method") in object).toBe(false);
    });

    it("Returns true when present in prototype", () => {
        const object = new Mock<ITestObject>()
            .prototypeof(TestObject.prototype)
            .object();

        // because nameof<ITestObject>("property") in new TestObject() === false
        expect(nameof<ITestObject>("property") in object).toBe(false);
        expect(nameof<ITestObject>("method") in object).toBe(true);
    });

    it("Returns false when does not present in prototype", () => {
        const object = new Mock<ITestObject>()
            .prototypeof({})
            .object();

        expect(nameof<ITestObject>("property") in object).toBe(false);
        expect(nameof<ITestObject>("method") in object).toBe(false);
    });

    it("Returns true when present in mimic", () => {
        const object = new Mock<ITestObject>()
            .setup(() => It.IsAny())
            .mimics(new TestObject())
            .object();

        expect(nameof<ITestObject>("property") in object).toBe(false);
        expect(nameof<ITestObject>("method") in object).toBe(true);
    });

    it("Returns false when does not present in mimic", () => {
        const object = new Mock<ITestObject>()
            .setup(() => It.IsAny())
            .mimics({} as any)
            .object();

        expect(nameof<ITestObject>("property") in object).toBe(false);
        expect(nameof<ITestObject>("method") in object).toBe(false);
    });

    it("Returns true when has returns setup", () => {
        const name = "arbitrary name";
        const object = new Mock<ITestObject>()
            .setup(instance => name in instance)
            .returns(true)
            .object();

        expect(name in object).toBe(true);
    });

    it("Returns sequence values", () => {
        const name = "arbitrary name";
        const object = new Mock<ITestObject>()
            .setup(instance => name in instance)
            .play(PlayTimes.Sequence([true, false, true]))
            .returns(true)
            .object();

        expect(name in object).toBe(true);
        expect(name in object).toBe(false);
        expect(name in object).toBe(true);
        expect(name in object).toBe(false);
    });

    it("Returns value for case when property has mentioned in the setup and has a dedicated setup", () => {
        const object = new Mock<ITestObject>()
            .prototypeof(TestObject.prototype)
            .setup(instance => nameof<ITestObject>("method") in instance)
            .play(PlayTimes.Once())
            .returns(false)
            .object();

        expect(nameof<ITestObject>("method") in object).toBe(false);
        expect(nameof<ITestObject>("method") in object).toBe(true);
    });

    it("Returns result of callback", () => {
        const object = new Mock<ITestObject>()
            .setup(instance => nameof<ITestObject>("property") in instance)
            .callback(() => true)
            .object();

        expect(nameof<ITestObject>("property") in object).toBe(true);
        expect(nameof<ITestObject>("method") in object).toBe(false);
    });

    it("Returns true when property has been written", () => {
        const value = "value";
        const object = new Mock<ITestObject>()
            .object();

        object.property = value;
        object.method = () => undefined;

        expect(nameof<ITestObject>("property") in object).toBe(true);
        expect(nameof<ITestObject>("method") in object).toBe(true);
    });

    it("Returns false for an arbitrary property for setup with It notation", () => {
        const object = new Mock<ITestObject>()
            // HasTrap converts it to '[object Object]' string
            .setup(instance => It.IsAny() in instance)
            .returns(true)
            .object();

        expect("method" in object).toBe(false);
        expect("anything else" in object).toBe(false);
    });

    it("Verifies", () => {

        const mock = new Mock<ITestObject>();
        const object = mock.object();

        const actual1 = nameof<ITestObject>("property") in object;
        const actual2 = nameof<ITestObject>("method") in object;

        mock.verify(instance => nameof<ITestObject>("property") in instance, Times.Once());
        mock.verify(instance => nameof<ITestObject>("method") in instance, Times.Once());
    });
});
