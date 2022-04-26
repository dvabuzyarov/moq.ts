import { SetPropertyExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";

export class SetPropertyExpressionValidator {
    validate({name, value}: SetPropertyExpression) {
        return (name as any instanceof It || value instanceof It) === false;
    }
}
