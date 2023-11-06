/**
 * @hidden
 */
export class BigIntFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (typeof instance === "bigint") {
            return `${instance}`;
        }
    }
}

