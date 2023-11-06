/**
 * @hidden
 */
export class UndefinedFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (typeof instance === "undefined") {
            return "undefined";
        }
    }
}

