/**
 * @hidden
 */
export class NumberFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (typeof instance === "number") {
            return `${instance}`;
        }
    }
}

