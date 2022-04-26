import { MethodExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";

export class InstanceMethodExpressionValidator {
    validate({name, args}: MethodExpression) {
        return (name as any instanceof It || args.filter(arg => arg instanceof It).length > 0) === false;
    }
}
