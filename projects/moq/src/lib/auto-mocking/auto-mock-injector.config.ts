import { IInjectorConfig, IMock, IMockOptions } from "../moq";
import { StaticProvider } from "../static.injector/interface/provider";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { ROOT_MOCK } from "../injector/root-mock.injection-token";

/**
 * Provides configuration for an angular based injector that would be used internally for auto mocking feature
 */
export class AutoMockInjectorConfig implements IInjectorConfig {
    constructor(private readonly options: TypeofInjectionToken<typeof MOCK_OPTIONS>,
                private readonly mock: IMock<unknown>,
                private readonly root: IMock<unknown>) {

    }

    get(options: IMockOptions<unknown>, providers: StaticProvider[]): StaticProvider[] {
        if (this.root) {
            return this.options.injectorConfig.get(options, providers);
        }
        return [
            ...this.options.injectorConfig.get(options, providers),
            {provide: ROOT_MOCK, useValue: this.mock, deps: []},
        ];
    }
}
