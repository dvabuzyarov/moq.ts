import { IMockOptions } from "./moq";

/**
 * @hidden
 */
export function buildMockOptions<T>(options: IMockOptions<T>): IMockOptions<T> {
    const target = (() => undefined) as unknown as T;
    return {target, ...options};
}
