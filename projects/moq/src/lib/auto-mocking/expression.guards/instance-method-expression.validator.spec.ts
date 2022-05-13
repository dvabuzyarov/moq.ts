import { createInjector, resolve2 } from "../../../tests.components/resolve.builder";
import { MethodExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";
import { InstanceMethodExpressionValidator } from "./instance-method-expression.validator";

describe("Instance method expression validator", () => {

    beforeEach(() => {
        createInjector(InstanceMethodExpressionValidator, []);
    });

    it("Returns true if there is no It", () => {
        const expression = new MethodExpression("name", []);

        const validator = resolve2(InstanceMethodExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(true);
    });

    it("Returns false if name is It", () => {
        const expression = new MethodExpression(It.IsAny(), []);

        const validator = resolve2(InstanceMethodExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(false);
    });

    it("Returns false if there is It in args", () => {
        const expression = new MethodExpression("name", [It.IsAny()]);

        const validator = resolve2(InstanceMethodExpressionValidator);
        const actual = validator.validate(expression);

        expect(actual).toBe(false);
    });
});
