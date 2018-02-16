import { It } from "../lib/expected-expressions/expression-predicates";
import { Mock } from "../lib/mock";

interface ITestFunction {
    (value: number): number;
}

describe("Play setup", () => {
    it("Plays once", () => {
        let played = false;

        const mock = new Mock<ITestFunction>();
        mock
            .setup(instance => instance(2))
            .play(() => {
                if (played) return false;
                played = true;
                return true;
            })
            .returns(1);

        const actual = mock.object()(2);
        expect(actual).toBe(1);

        const actual2 = mock.object()(2);
        expect(actual2).toBeUndefined();
    });
});
