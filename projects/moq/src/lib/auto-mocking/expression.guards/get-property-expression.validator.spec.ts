import { createInjector, resolve2 } from "../../../tests.components/resolve.builder";
import { GetPropertyExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";
import { GetPropertyExpressionValidator } from "./get-property-expression.validator";

describe("Get property expression validator", () => {

    beforeEach(() => {
        createInjector(GetPropertyExpressionValidator, []);
    });

    it("Returns true if there is no It", () => {
        const expression = new GetPropertyExpression("name");

        const validator = resolve2(GetPropertyExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(true);
    });

    it("Returns false if there is It", () => {
        const expression = new GetPropertyExpression(It.IsAny());

        const validator = resolve2(GetPropertyExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(false);
    });
});
