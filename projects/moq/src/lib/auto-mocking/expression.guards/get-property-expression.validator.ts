import { GetPropertyExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";

export class GetPropertyExpressionValidator {
    validate({name}: GetPropertyExpression) {
        return (name as any instanceof It) === false;
    }
}
