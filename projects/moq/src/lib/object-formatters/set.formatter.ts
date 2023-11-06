import { Injector } from "../static.injector/injector";
import { ObjectFormatter } from "./object.formatter";

/**
 * @hidden
 */
export class SetFormatter {

    constructor(private readonly injector: Injector) {
    }

    public format<T>(instance: T | null | undefined): string {
        if (instance instanceof Set) {
            const formatter = this.injector.get(ObjectFormatter);
            const description = [];
            for (const value of instance) {
                description.push(formatter.format(value));
            }

            return `Set([${description}])`;
        }
    }
}

