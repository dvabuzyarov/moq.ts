import { Interaction } from "../interactions";
import { It } from "../reflector/expression-predicates";

/**
 * @hidden
 */
export class ItMatcher {
    public matched(left: Interaction, right: It<any>): boolean {
        return (right as It<any>).test(left);
    }
}
