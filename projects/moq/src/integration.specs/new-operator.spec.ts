import { Mock } from "../lib/mock";
import { PlayTimes } from "../lib/playables/play-times";

class TestObject {
    constructor(public readonly arg) {
    }
}

describe("Mock: new operator", () => {

    it("Returns new object with callback", () => {
        const value = "value";
        const mock = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance(value))
            .callback(({args: [name]}) => new TestObject(name));
        const object = mock.object();

        const actual = new object(value);
        expect(actual).toEqual(new TestObject(value));
        mock.verify(instance => new instance(value));
    });

    it("Returns new object with returns", () => {
        const value = "value";
        const expected = new TestObject(value);
        const mock = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance(value))
            .returns(expected);
        const object = mock.object();

        const actual = new object(value);
        expect(actual).toBe(expected);
        mock.verify(instance => new instance(value));
    });

    it("Returns new object with mimics", () => {
        const value = "value";

        const mock = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance(value))
            .mimics(TestObject);
        const object = mock.object();

        const actual = new object(value);
        expect(actual).toEqual(new TestObject(value));
        mock.verify(instance => new instance(value));
    });

    it("Throws an exception", () => {
        const value = "value";
        const message = "test error";

        const object = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance(value))
            .throws(new Error(message))
            .object();

        expect(() => new object(value))
            .toThrowError(message);
    });

    it("Respects play times", () => {
        const value = "value";

        const mock = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance(value))
            .play(PlayTimes.Once())
            .mimics(TestObject);
        const object = mock.object();

        new object(value);
        expect(() => new object(value))
            .toThrowError("'construct' on proxy: trap returned non-object ('undefined')");
    });

    it("Tracks Reflect.construct()", () => {
        const value = "value";

        const mock = new Mock<typeof TestObject>({target: TestObject})
            .setup(instance => new instance(value))
            .mimics(TestObject);
        const object = mock.object();

        const actual = Reflect.construct(object, [value]);
        expect(actual).toEqual(new TestObject(value));
        mock.verify(instance => new instance(value));
    });

    it("Formats verification error", () => {
        const value = "value";

        const mock = new Mock<typeof TestObject>({target: TestObject});

        expect(() => mock.verify(instance => new instance(value)))
            .toThrowError(
                "new constructor(['value']) should be called once, but was called 0 time(s)\n" +
                "-------------------------------------\n" +
                "Tracked calls:\n" +
                "\n" +
                "-------------------------------------\n");
    });

});
