import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { OBJECT_FORMATTERS } from "./object-formatters.injection-token";

/**
 * @hidden
 */
export class ObjectFormatter {

    constructor(
        private readonly formatters: TypeofInjectionToken<typeof OBJECT_FORMATTERS>) {
    }

    public format<T>(instance: T | null | undefined): string {
        for (const formatter of this.formatters) {
            const value = formatter.format(instance);
            if (value === undefined) {
                continue;
            }
            return value;
        }

        return `${instance}`;
    }
}

