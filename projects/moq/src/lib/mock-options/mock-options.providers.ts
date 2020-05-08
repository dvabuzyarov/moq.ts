import { MockOptionsBuilder } from "./mock-options.builder";
import { IMockOptions } from "../moq";
import { MOCK_OPTIONS } from "./mock-options.injection-token";

/**
 * @hidden
 */
export function mockOptionsProviders<T>(options: IMockOptions<T>) {
    return [
        {provide: MockOptionsBuilder, useClass: MockOptionsBuilder, deps: []},
        {provide: MOCK_OPTIONS, useFactory: builder => builder.build(options), deps: [MockOptionsBuilder]},
    ];
}
