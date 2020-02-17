import { Mock } from "../lib/mock";

describe("#222 type discovering does not respect the full prototype chain", () => {
    it("the bug", () => {
        class Foo {
            get value(): string {
                throw new Error("Not Implemented");
            }
        }

        class Boo extends Foo {

        }

        const f = new Mock<Boo>({target: new Boo()})
            .setup(instance => instance.value)
            .returns("test")
            .object();

        expect(f.value).toEqual("test");
    });
});
