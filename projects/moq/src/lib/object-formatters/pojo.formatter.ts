import { Injector } from "../static.injector/injector";
import { ObjectFormatter } from "./object.formatter";

/**
 * @hidden
 */
export class PojoFormatter {

    constructor(private readonly injector: Injector) {
    }

    public format<T>(instance: T | null | undefined): string {
        if (instance instanceof Object) {
            const keys = [...Object.getOwnPropertyNames(instance), ...Object.getOwnPropertySymbols(instance)];
            const formatter = this.injector.get(ObjectFormatter);
            const description = [];
            for (const key of keys) {
                description.push(`"${formatter.format(key)}":"${formatter.format(instance[key])}"`);
            }

            return `{${description}}`;
        }
    }
}

