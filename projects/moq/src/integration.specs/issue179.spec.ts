import { Mock } from "../lib/mock";

describe("#179 cannot mock toString method", () => {
    it("the bug", () => {
        class Foo {
            public toString(): string {
                throw new Error("Not Implemented");
            }
        }

        const f = new Mock<Foo>()
            .setup(instance => instance.toString())
            .returns("test")
            .object();

        expect(f.toString()).toEqual("test");
    });
});
