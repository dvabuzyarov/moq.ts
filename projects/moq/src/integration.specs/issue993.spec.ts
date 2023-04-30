import { Mock } from "../lib/mock.js";
import { Times } from "../lib/times.js";

describe("#993 How does mimics work? ", () => {

    class A {
        constructor(private readonly dep: A) {
        }
        public b() {
            console.log("Real b called");

            // here method "b" calls method "c" which we'd like to intercept with our mock
            // rather than calling the real "c" below.
            this.dep.c();
        }

        public c() {
            console.log("Real c called");
        }
    }

    it("the issue", async () => {
        const mock = new Mock<A>();
        const a = new A(mock.object());

        const aMimic = mock
            // mock the call to method "c"
            .setup((i) => i.c())
            .returns(void 0)
            // allow the call to "b" to invoke the real method
            .setup((i) => i.b())
            .mimics(a);

        const wrappedA = aMimic.object();

        // invoke method "b"
        wrappedA.b();

        // verify that the call to the real method "b" resulted in a call to
        // our mock of method "c".
        aMimic.verify((i) => i.c(), Times.Once());
    });
});
