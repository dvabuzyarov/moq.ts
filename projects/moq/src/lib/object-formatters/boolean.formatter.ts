/**
 * @hidden
 */
export class BooleanFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (typeof instance === "boolean") {
            return `${instance}`;
        }
    }
}

