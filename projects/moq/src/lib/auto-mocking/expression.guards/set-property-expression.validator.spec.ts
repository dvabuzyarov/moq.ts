import { createInjector, resolve2 } from "../../../tests.components/resolve.builder";
import { SetPropertyExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";
import { SetPropertyExpressionValidator } from "./set-property-expression.validator";

describe("Set property expression validator", () => {

    beforeEach(() => {
        createInjector(SetPropertyExpressionValidator, []);
    });

    it("Returns true if there is no It", () => {
        const expression = new SetPropertyExpression("name", []);

        const validator = resolve2(SetPropertyExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(true);
    });

    it("Returns false if name is It", () => {
        const expression = new SetPropertyExpression(It.IsAny(), []);

        const validator = resolve2(SetPropertyExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(false);
    });

    it("Returns false if there is It in args", () => {
        const expression = new SetPropertyExpression("name", It.IsAny());

        const validator = resolve2(SetPropertyExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(false);
    });
});
