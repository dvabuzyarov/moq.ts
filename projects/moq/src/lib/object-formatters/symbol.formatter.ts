/**
 * @hidden
 */
export class SymbolFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (typeof instance === "symbol") {
            return String(instance);
        }
    }
}

