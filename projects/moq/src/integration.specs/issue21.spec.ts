import { Mock } from "../lib/mock";

class Dummy {
    public method(value: number): string {
        throw new Error("Not Implemented");
    }
}

describe("#21 Prototype & setup do not work in certain cases", () => {
    it("the bug", () => {
        const spy = jasmine.createSpy("callback");
        const mock = new Mock<Dummy>()
            .prototypeof(Dummy.prototype)
            .setup(instance => instance.method)
            .returns(spy);

        mock.object().method(1);
        expect(spy).toHaveBeenCalledWith(1);
    });
});
