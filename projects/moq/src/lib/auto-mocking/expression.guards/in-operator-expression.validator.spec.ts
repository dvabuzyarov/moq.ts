import { createInjector, resolve2 } from "../../../tests.components/resolve.builder";
import { InOperatorExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";
import { InOperatorExpressionValidator } from "./in-operator-expression.validator";

describe("In operator expression validator", () => {

    beforeEach(() => {
        createInjector(InOperatorExpressionValidator, []);
    });

    it("Returns true if there is no It", () => {
        const expression = new InOperatorExpression("name");

        const validator = resolve2(InOperatorExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(true);
    });

    it("Returns false if there is It", () => {
        const expression = new InOperatorExpression(It.IsAny());

        const validator = resolve2(InOperatorExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(false);
    });
});
