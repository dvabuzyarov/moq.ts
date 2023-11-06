import { It } from "../reflector/expression-predicates";

/**
 * @hidden
 */
export class ItFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (instance instanceof It) {
            return `It.Is(${(instance as It<any>).predicate})`;
        }
    }
}

