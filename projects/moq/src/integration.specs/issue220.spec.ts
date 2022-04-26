import { Mock } from "../lib/mock";

describe("#220 type discovering invokes get property", () => {
    it("The bug", () => {
        class Foo {
            get value(): string {
                throw new Error("Not Implemented");
            }
        }

        const f = new Mock<Foo>({target: new Foo()})
            .setup(instance => instance.value)
            .returns("test")
            .object();

        expect(f.value).toEqual("test");
    });
});
