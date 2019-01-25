import { Mock } from "../lib/mock";

describe("does not support Symbols as property names", () => {
    it("the bug", () => {
        const value = 12;
        const propertyName = Symbol("foo");

        const mock = new Mock<any>()
            .setup(instance => instance[propertyName])
            .returns(value);

        try {
            mock.verify(instance => instance[propertyName]);
        } catch (e) {
            expect(e.message).toContain("Getter of 'Symbol(foo)' should be called once, but was called 0 time(s)");
        }
    });
});
