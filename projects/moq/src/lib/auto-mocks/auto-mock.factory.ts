import { Mock } from "../mock";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { Expressions } from "../reflector/expressions";
import { AutoMockInjectorConfig } from "../injector/auto-mock-injector.config";
import { RootProvider } from "./root.provider";

export class AutoMockFactory {
    constructor(
        private readonly options: TypeofInjectionToken<typeof MOCK_OPTIONS>,
        private readonly rootProvider: RootProvider) {
    }

    public create<T>(expression: Expressions<T>): Mock<unknown> {
        const options = {
            name: this.options.name + expression,
            target: this.options.target,
            injectorConfig: new AutoMockInjectorConfig(this.options.injectorConfig, this.rootProvider.get())
        }

        return new Mock(options);
    }
}
