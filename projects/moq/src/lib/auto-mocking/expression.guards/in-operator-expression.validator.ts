import { InOperatorExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";

export class InOperatorExpressionValidator {

    validate({name}: InOperatorExpression) {
        return (name as any instanceof It) === false;
    }
}
