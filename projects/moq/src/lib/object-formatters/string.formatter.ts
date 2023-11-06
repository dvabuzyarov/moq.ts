/**
 * @hidden
 */
export class StringFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (typeof instance === "string") {
            return instance;
        }
    }
}

