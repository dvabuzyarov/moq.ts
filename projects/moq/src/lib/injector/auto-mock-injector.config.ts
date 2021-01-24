import { IInjectorConfig, IMock, IMockOptions } from "../moq";
import { StaticProvider } from "../static.injector/interface/provider";
import { ROOT_MOCK } from "./root-mock.injection-token";

/**
 * Provides the default configuration for an angular based injector that would be used internally by {@link Mock} instance.
 */
// todo: doc
export class AutoMockInjectorConfig implements IInjectorConfig {
    constructor(private readonly parentConfig: IInjectorConfig,
                private readonly root: IMock<unknown>) {

    }

    get(options: IMockOptions<unknown>, providers: StaticProvider[]): StaticProvider[] {
        return [
            ...this.parentConfig.get(options, providers),
            {provide: ROOT_MOCK, useValue: this.root, deps: []},
        ];
    }
}
