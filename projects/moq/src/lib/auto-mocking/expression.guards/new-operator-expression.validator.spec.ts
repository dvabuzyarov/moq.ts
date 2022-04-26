import { createInjector, resolve2 } from "../../../tests.components/resolve.builder";
import { NewOperatorExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";
import { NewOperatorExpressionValidator } from "./new-operator-expression.validator";

describe("New operator expression validator", () => {

    beforeEach(() => {
        createInjector(NewOperatorExpressionValidator, []);
    });

    it("Returns true if there is no It", () => {
        const expression = new NewOperatorExpression([]);

        const validator = resolve2(NewOperatorExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(true);
    });

    it("Returns false if there is It in args", () => {
        const expression = new NewOperatorExpression([It.IsAny()]);

        const validator = resolve2(NewOperatorExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(false);
    });
});
