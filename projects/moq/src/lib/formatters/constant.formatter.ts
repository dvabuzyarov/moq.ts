import { It } from "../reflector/expression-predicates";

/**
 * @hidden
 */
export class ConstantFormatter {
    public format(object: any | It<any>): string {
        if (object instanceof It) return `It.Is(${(object as It<any>).predicate})`;
        if (object instanceof String || typeof object === "string") return `\'${object}\'`;
        if (object instanceof Array) {
            const description = [];
            for (const value of object) {
                description.push(this.format(value));
            }

            return `[${description}]`;
        }
        if (typeof object === 'object' && object?.toString() === '[object Object]') {
            var description = [];

            for (const key in object) {
                const value = object[key];

                description.push(`'${key}': ${this.format(value)}`);
            }

            return `{${description.join(', ')}}`;
        }
        return `${object}`;
    }
}

