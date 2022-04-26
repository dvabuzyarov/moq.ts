import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { ComplexExpressionValidator } from "./complex-expression.validator";
import { Expressions } from "../../reflector/expressions";
import { ExpressionValidator } from "./expression.validator";
import { Mock } from "moq.ts";

describe("Complex expression validator", () => {

    beforeEach(() => {
        createInjector(ComplexExpressionValidator, [ExpressionValidator]);
    });

    it("Returns valid status with no errors when there is only one expression", () => {
        const expression = {} as Expressions<unknown>;
        const expressions = [expression];

        resolveMock(ExpressionValidator)
            .setup(instance => instance.validate(expression))
            .returns(true);

        const validator = resolve2(ComplexExpressionValidator);
        const actual = validator.validate(expressions);

        expect(actual).toEqual({valid: true, errors: []});
    });

    it("Returns valid status with no errors when there all expressions are valid", () => {
        const fist = new Mock<Expressions<unknown>>().object();
        const second = new Mock<Expressions<unknown>>().object();
        const last = new Mock<Expressions<unknown>>().object();
        const expressions = [fist, second, last];

        resolveMock(ExpressionValidator)
            .setup(instance => instance.validate(fist))
            .returns(true)
            .setup(instance => instance.validate(second))
            .returns(true);

        const validator = resolve2(ComplexExpressionValidator);
        const actual = validator.validate(expressions);

        expect(actual).toEqual({valid: true, errors: []});
    });

    it("Returns invalid status with errors when some expressions are invalid", () => {
        const fist = new Mock<Expressions<unknown>>().object();
        const second = new Mock<Expressions<unknown>>().object();
        const last = new Mock<Expressions<unknown>>().object();
        const expressions = [fist, second, last];

        resolveMock(ExpressionValidator)
            .setup(instance => instance.validate(fist))
            .returns(true)
            .setup(instance => instance.validate(second))
            .returns(false);

        const validator = resolve2(ComplexExpressionValidator);
        const actual = validator.validate(expressions);

        expect(actual).toEqual({valid: false, errors: [[fist, true], [second, false], [last, true]]});
    });

    it("Returns invalid status with errors when all expressions are invalid", () => {
        const fist = new Mock<Expressions<unknown>>().object();
        const second = new Mock<Expressions<unknown>>().object();
        const last = new Mock<Expressions<unknown>>().object();
        const expressions = [fist, second, last];

        resolveMock(ExpressionValidator)
            .setup(instance => instance.validate(fist))
            .returns(false)
            .setup(instance => instance.validate(second))
            .returns(false);

        const validator = resolve2(ComplexExpressionValidator);
        const actual = validator.validate(expressions);

        expect(actual).toEqual({valid: false, errors: [[fist, false], [second, false], [last, true]]});
    });

});
