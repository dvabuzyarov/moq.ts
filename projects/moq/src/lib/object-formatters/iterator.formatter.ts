import { Injector } from "../static.injector/injector";
import { ObjectFormatter } from "./object.formatter";
import { IteratorTester } from "./iterator.tester";

/**
 * @hidden
 */
export class IteratorFormatter {

    constructor(private readonly injector: Injector,
                private readonly iteratorTester: IteratorTester) {
    }

    public format<T>(instance: T | null | undefined): string {
        if (this.iteratorTester.verify(instance)) {
            const formatter = this.injector.get(ObjectFormatter);
            const description = [];
            for (const value of (instance as unknown as Iterable<T>)) {
                description.push(formatter.format(value));
            }

            return `Iterable([${description}])`;
        }
    }
}

