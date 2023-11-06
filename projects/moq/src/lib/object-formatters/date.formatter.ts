/**
 * @hidden
 */
export class DateFormatter {

    public format<T>(instance: T | null | undefined): string {
        if (instance instanceof Date) {
            return instance.toString();
        }
    }
}

