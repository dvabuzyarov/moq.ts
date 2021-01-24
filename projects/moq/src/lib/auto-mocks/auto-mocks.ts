import { Expressions } from "../reflector/expressions";
import { IMock } from "../moq";
import { ExpressionsMatcher } from "./expressions.matcher";
import { AutoMockFactory } from "./auto-mock.factory";

export class AutoMocks<T> {
    private readonly map = new Map<Expressions<T>, IMock<unknown>>();

    constructor(
        private readonly matcher: ExpressionsMatcher,
        private readonly autoMockFactory: AutoMockFactory) {
    }

    public add(expression: Expressions<T>, mock: IMock<unknown>) {
        if (this.has(expression) === false) {
            this.map.set(expression, mock);
        }
    }

    public get(expression: Expressions<T>) {
        for (const [key, value] of this.map) {
            if (this.matcher.matched(expression, key) === true)
                return value;
        }
        const mock = this.autoMockFactory.create(expression);
        this.map.set(expression, mock);
        return mock;
    }

    public has(expression: Expressions<T>) {
        for (const key of this.map.keys()) {
            if (this.matcher.matched(expression, key) === true)
                return true;
        }
        return false;
    }
}
