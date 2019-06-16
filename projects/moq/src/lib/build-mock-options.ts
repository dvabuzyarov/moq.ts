import { IMockOptions } from "./moq";

/**
 * @hidden
 */
export function buildMockOptions(options: IMockOptions): IMockOptions {
    return {...{target: () => undefined}, ...options};
}
