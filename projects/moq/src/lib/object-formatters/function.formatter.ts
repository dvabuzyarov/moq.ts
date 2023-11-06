/**
 * @hidden
 */
export class FunctionFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (typeof instance === "function") {
            return `${instance}`;
        }
    }
}

