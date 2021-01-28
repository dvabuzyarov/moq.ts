import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { AutoMockNameFormatter } from "./name-formatters/auto-mock-name.formatter";
import { Expressions } from "../reflector/expressions";
import { IMockOptions } from "../moq";
import { AutoMockInjectorConfig } from "./auto-mock-injector.config";

/**
 * This class provides configuration for auto mocking mocks
 */
export class AutoMockOptionsBuilder {
    constructor(
        private readonly options: TypeofInjectionToken<typeof MOCK_OPTIONS>,
        private readonly autoMockNameFormatter: AutoMockNameFormatter,
        private readonly autoMockInjectorConfig: AutoMockInjectorConfig) {
    }

    public create<T>(expression: Expressions<T>): IMockOptions<T> {
        return {
            name: this.autoMockNameFormatter.format(this.options.name, expression),
            target: this.options.target,
            injectorConfig: this.autoMockInjectorConfig
        };
    }
}
