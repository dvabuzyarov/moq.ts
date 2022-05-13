import { NewOperatorExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";

export class NewOperatorExpressionValidator {
    validate({args}: NewOperatorExpression) {
        return args.filter(arg => arg instanceof It).length === 0;
    }
}
