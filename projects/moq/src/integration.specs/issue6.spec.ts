import { It } from "../lib/reflector/expression-predicates";
import { Mock } from "../lib/mock";
import { GetPropertyExpression } from "../lib/reflector/expressions";

export interface IDummy {
    property: string;

    method(value: number): string;
}

describe("the latest more specific setup does not override the previous one", () => {
    it("the bug", () => {
        const mock = new Mock<IDummy>();
        mock
            .setup(() => It.Is((expression: GetPropertyExpression) => true))
            .throws(new Error("The generic setup has been invoked"))
            .setup(instance => instance.method(It.IsAny()))
            .returns(undefined);

        const actual = mock.object().method(1);
        expect(actual).toBeUndefined();
    });
});
