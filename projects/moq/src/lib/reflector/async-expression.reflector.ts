import { Expressions } from "./expressions";
import { ExpressionReflector, EXPRESSIONS, IExpression } from "./expression-reflector";
import { ReflectingProxyFactory } from "./reflecting-proxy.factory";
import { AsyncReflectingProxyInjectorFactory } from "./async-reflecting-proxy.injector-factory";

/**
 * This class reflects an async expression to an expression tree representation.
 * For more examples check
 * [unit tests for this class]
 * (https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/lib/reflector/async.expression-reflector.spec.ts)
 */
export class AsyncExpressionReflector implements ExpressionReflector {
    constructor(private readonly injectorFactory: AsyncReflectingProxyInjectorFactory) {
    }

    /**
     * Reflects the provided async code as an expression tree.
     */
    public reflect<T>(expression: IExpression<T>): Expressions<T>[] {

        const injector = this.injectorFactory.create();
        const proxyFactory = injector.get(ReflectingProxyFactory);
        const proxy = proxyFactory.create();
        expression(proxy);

        return injector.get(EXPRESSIONS);
    }
}
