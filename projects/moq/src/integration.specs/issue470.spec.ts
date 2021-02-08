import { Mock } from "../lib/mock";
import { It } from "../lib/reflector/expression-predicates";

describe("#470 respect .setup(It.IsAny()) form", () => {

    it("the feature", () => {
        type IAdd = (a: number, b: number) => number;

        const app = (a: number, b: number) => a + b;

        const mock = new Mock<IAdd>()
            .setup(It.IsAny())
            .mimics(app)
            .object();

        expect(mock(1, 2)).toBe(3);
    });
});
