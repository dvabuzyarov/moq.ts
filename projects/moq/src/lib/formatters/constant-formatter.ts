import { It } from "../expected-expressions/expression-predicates";

/**
 * @hidden
 */
export class ConstantFormatter {

    public format(object: any | It<any>): string {
        if (object instanceof It) return `It.Is(${(object as It<any>).predicate})`;
        if (object instanceof String || typeof object === "string") return `\'${object}\'`;
        if (object instanceof Array) {
            const description = [];
            for (const index of Object.keys(object)) {
                description.push(new ConstantFormatter().format(object[index]));
            }

            return `[${description}]`;
        }
        return `${object}`;
    }
}

