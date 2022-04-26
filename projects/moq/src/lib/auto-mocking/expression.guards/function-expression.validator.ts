import { FunctionExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";

export class FunctionExpressionValidator {
    validate({args}: FunctionExpression) {
        return args.filter(arg => arg instanceof It).length === 0;
    }
}
