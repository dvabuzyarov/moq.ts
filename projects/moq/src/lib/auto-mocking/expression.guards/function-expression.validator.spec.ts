import { createInjector, resolve2 } from "../../../tests.components/resolve.builder";
import { FunctionExpression } from "../../reflector/expressions";
import { FunctionExpressionValidator } from "./function-expression.validator";
import { It } from "../../reflector/expression-predicates";

describe("Function expression validator", () => {

    beforeEach(() => {
        createInjector(FunctionExpressionValidator, []);
    });

    it("Returns true if there is no It", () => {
        const expression = new FunctionExpression([]);

        const validator = resolve2(FunctionExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(true);
    });

    it("Returns false if there is It", () => {
        const expression = new FunctionExpression([It.IsAny()]);

        const validator = resolve2(FunctionExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(false);
    });
});
