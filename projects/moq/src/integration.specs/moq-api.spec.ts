import { Mock } from "../lib/mock";
import { Times } from "../lib/times";
import { MoqAPI } from "../lib/moq";

describe("MoqAPI", () => {

    it("Returns moq API", () => {
        const mock = new Mock<unknown>();
        const object = mock.object();

        const actual = object[MoqAPI];

        expect(actual).toBe(mock);
    });


    it("Raises an exception on set interaction", () => {

        const object = new Mock<unknown>()
            .object();

        expect(() => object[MoqAPI] = undefined).toThrow();
    });

    it("Does not affect with a setup", () => {
        const value = "value";

        const mock = new Mock<unknown>();
        const object = mock
            .setup(instance => instance[MoqAPI])
            .returns(value)
            .object();

        const actual = object[MoqAPI];

        expect(actual).toBe(mock);
    });

    it("Verifies", () => {
        const mock = new Mock<unknown>();
        const object = mock.object();

        const value = object[MoqAPI];

        mock.verify(instance => instance[MoqAPI], Times.Exactly(1));
    });
});
