import { Mock } from "../lib/mock";
import { It } from "../lib/reflector/expression-predicates";

type ITestFunction = (value: number) => number;

describe("#2 Could not mock apply function: func.apply(null, arg)", () => {
    it("the bug", () => {
        const mock = new Mock<ITestFunction>();
        mock
            .setup(instance => instance.apply(null, It.Is(value => value === 2)))
            .returns(1);

        const actual = mock.object().apply(null, 2);

        expect(actual).toBe(1);
    });
});
