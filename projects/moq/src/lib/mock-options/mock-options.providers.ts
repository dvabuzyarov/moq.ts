import { IMockOptions } from "../moq";
import { MOCK_OPTIONS } from "./mock-options.injection-token";

/**
 * @hidden
 */
export function mockOptionsProviders<T>(options: IMockOptions<T>) {
    return [
        {provide: MOCK_OPTIONS, useValue: options, deps: []},
    ];
}
