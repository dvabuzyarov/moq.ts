import { Mock } from "../mock";
import { Expressions } from "../reflector/expressions";
import { AutoMockOptionsBuilder } from "./auto-mock-options.builder";

/**
 * This service is used to create an instance of a Mock for auto mocking feature
 */
export class AutoMockFactory {
    constructor(
        private readonly optionsBuilder: AutoMockOptionsBuilder) {
    }

    public create<T>(expression: Expressions<T>): Mock<unknown> {
        const options = this.optionsBuilder.create(expression);
        return new Mock(options);
    }
}

