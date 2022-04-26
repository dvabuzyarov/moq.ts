import { It } from "./expression-predicates";
import { Expressions } from "./expressions";
import { ReflectingProxyInjectorFactory } from "./reflecting-proxy.injector-factory";
import { ExpressionReflector, EXPRESSIONS, IExpression } from "./expression-reflector";
import { ReflectingProxyFactory } from "./reflecting-proxy.factory";

/**
 * This class reflects an expression to an expression tree representation.
 * async/await is not supported.
 *
 * For more examples check
 * [unit tests for this class]
 * (https://github.com/dvabuzyarov/moq.ts/blob/master/projects/moq/src/lib/reflector/full.expression-reflector.spec.ts)
 */
export class SyncExpressionReflector implements ExpressionReflector {
    constructor(private readonly injectorFactory: ReflectingProxyInjectorFactory) {
    }

    /**
     * Reflects the provided code as an expression tree.
     */
    public reflect<T>(expression: IExpression<T>): Expressions<T>[] {
        if (expression instanceof It) {
            return [expression];
        }

        const injector = this.injectorFactory.create();

        const proxyFactory = injector.get(ReflectingProxyFactory);
        const proxy = proxyFactory.create();

        const predicate = expression(proxy);

        const expressions = injector.get(EXPRESSIONS);

        return predicate instanceof It && expressions.length === 0
            ? [predicate] : expressions;
    }

    public async reflectAsync<T>(expression: IExpression<T>): Promise<Expressions<T>[]> {
        if (expression instanceof It) {
            return [expression];
        }

        const injector = this.injectorFactory.create();

        const proxyFactory = injector.get(ReflectingProxyFactory);
        const proxy = proxyFactory.create();

        const predicate = await expression(proxy);

        const expressions = injector.get(EXPRESSIONS);
        return predicate instanceof It && expressions.length === 0
            ? [predicate] : expressions;
    }
}
