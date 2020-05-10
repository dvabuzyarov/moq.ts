import { IMockOptions } from "../moq";

/**
 * @hidden
 */
export class MockOptionsBuilder {
    build<T>(options: IMockOptions<T>) {
        const target = (() => undefined) as unknown as T;
        return {target, ...options};
    }
}

