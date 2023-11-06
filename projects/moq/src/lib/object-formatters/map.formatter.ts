import { Injector } from "../static.injector/injector";
import { ObjectFormatter } from "./object.formatter";

/**
 * @hidden
 */
export class MapFormatter {

    constructor(private readonly injector: Injector) {
    }

    public format<T>(instance: T | null | undefined): string {
        if (instance instanceof Map) {
            const formatter = this.injector.get(ObjectFormatter);
            const description = [];
            for (const [key, value] of instance) {
                description.push([`[${formatter.format(key)},${formatter.format(value)}]`]);
            }

            return `Map([${description}])`;
        }
    }
}

