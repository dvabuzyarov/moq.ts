/**
 * @hidden
 */
export class NullFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (instance === null) {
            return "null";
        }
    }
}

