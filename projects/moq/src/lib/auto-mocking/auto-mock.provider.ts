import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { ExpressionsMatcher } from "./expressions.matcher";
import { AutoMockFactory } from "./auto-mock.factory";
import { Expressions } from "../reflector/expressions";
import { AutoMockedStorage } from "./auto-mock.storage";

/**
 * @hidden
 */
export class AutoMockProvider {
    constructor(
        private readonly map: TypeOfInjectionFactory<AutoMockedStorage>,
        private readonly matcher: ExpressionsMatcher,
        private readonly autoMockFactory: AutoMockFactory) {
    }

    public getOrCreate<T>(expression: Expressions<T>) {
        for (const [key, value] of this.map) {
            if (this.matcher.matched(expression, key) === true) {
                return value;
            }
        }
        const mock = this.autoMockFactory.create(expression);
        this.map.set(expression, mock);
        return mock;
    }
}
