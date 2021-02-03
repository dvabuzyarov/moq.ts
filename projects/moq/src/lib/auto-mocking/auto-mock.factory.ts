import { Expressions } from "../reflector/expressions";
import { AutoMockOptionsBuilder } from "./auto-mock-options.builder";
import { TypeofInjectionToken } from "../injector/typeof-injection-token";
import { MOCK_CONSTRUCTOR } from "../injector/mock-constructor.injection-token";

/**
 * This service is used to create an instance of a Mock for auto mocking feature
 */
export class AutoMockFactory {
    constructor(
        private readonly ctor: TypeofInjectionToken<typeof MOCK_CONSTRUCTOR>,
        private readonly optionsBuilder: AutoMockOptionsBuilder) {
    }

    public create<T>(expression: Expressions<T>) {
        const options = this.optionsBuilder.create(expression);
        return this.ctor(options);
    }
}

