import { TypeOfInjectionFactory } from "../injector/injection-factory";
import { AutoMockFactory } from "./auto-mock.factory";
import { Expressions } from "../reflector/expressions";
import { AutoMockedStorage } from "./auto-mock.storage";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";

/**
 * @hidden
 */
export class AutoMockProvider {
    constructor(
        private readonly map: TypeOfInjectionFactory<AutoMockedStorage>,
        private readonly comparer: ExpressionEqualityComparer,
        private readonly autoMockFactory: AutoMockFactory) {
    }

    public getOrCreate<T>(expression: Expressions<T>) {
        for (const [key, value] of this.map) {
            if (this.comparer.equals(expression, key) === true) {
                return value;
            }
        }
        const mock = this.autoMockFactory.create(expression);
        this.map.set(expression, mock);
        return mock;
    }
}
