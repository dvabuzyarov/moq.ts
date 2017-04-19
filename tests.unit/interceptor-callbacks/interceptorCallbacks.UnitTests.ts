import {getName} from '../getName';
import {InterceptorCallbacksStrictStrategy} from '../../lib/interceptor-callbacks/interceptor-callbacks.strict.strategy';
import {InterceptorCallbacksLooseStrategy} from '../../lib/interceptor-callbacks/interceptor-callbacks.loose.strategy';
import {InterceptorCallbacks, MockBehavior} from '../../lib/interceptor-callbacks/interceptor-callbacks';
import {GetPropertyExpression} from '../../lib/expressions';

describe('Interceptor callbacks', () => {

    let strictStrategy: InterceptorCallbacksStrictStrategy<any>;
    let looseStrategy: InterceptorCallbacksLooseStrategy<any>;

    function strictStrategyFactory(): InterceptorCallbacksStrictStrategy<any> {
        return <InterceptorCallbacksStrictStrategy<any>>jasmine.createSpyObj('strict strategy', [
            getName<InterceptorCallbacksStrictStrategy<any>>(instance => instance.intercepted),
            getName<InterceptorCallbacksStrictStrategy<any>>(instance => instance.hasNamedMethod),
        ]);
    }

    function looseStrategyFactory(): InterceptorCallbacksLooseStrategy<any> {
        return <InterceptorCallbacksLooseStrategy<any>>jasmine.createSpyObj('loose strategy', [
            getName<InterceptorCallbacksLooseStrategy<any>>(instance => instance.intercepted),
            getName<InterceptorCallbacksLooseStrategy<any>>(instance => instance.hasNamedMethod),
        ]);
    }

    function InterceptorCallbacksFactory(): InterceptorCallbacks<any> {
        return new InterceptorCallbacks<any>(strictStrategy, looseStrategy);
    }

    beforeEach(() => {
        strictStrategy = strictStrategyFactory();
        looseStrategy = looseStrategyFactory();
    });

    it('Wraps strict strategy by default', () => {

        const expected = {};
        const propertyName = 'property';
        const expression = new GetPropertyExpression(propertyName);
        (<jasmine.Spy>strictStrategy.intercepted).and.returnValue(expected);

        const callbacks = InterceptorCallbacksFactory();
        const actual = callbacks.intercepted(expression);
        callbacks.hasNamedMethod(propertyName);

        expect(strictStrategy.intercepted).toHaveBeenCalledWith(expression);
        expect(strictStrategy.hasNamedMethod).toHaveBeenCalledWith(propertyName);
        expect(actual).toBe(expected);
    });

    it('Wraps loose strategy', () => {

        const expected = {};
        const propertyName = 'property';
        const expression = new GetPropertyExpression(propertyName);
        (<jasmine.Spy>looseStrategy.intercepted).and.returnValue(expected);

        const callbacks = InterceptorCallbacksFactory();
        callbacks.setBehaviorStrategy(MockBehavior.Loose);
        const actual = callbacks.intercepted(expression);
        callbacks.hasNamedMethod(propertyName);

        expect(looseStrategy.intercepted).toHaveBeenCalledWith(expression);
        expect(looseStrategy.hasNamedMethod).toHaveBeenCalledWith(propertyName);
        expect(actual).toBe(expected);
    });

    it('Wraps strict strategy', () => {

        const expected = {};
        const propertyName = 'property';
        const expression = new GetPropertyExpression(propertyName);
        (<jasmine.Spy>strictStrategy.intercepted).and.returnValue(expected);

        const callbacks = InterceptorCallbacksFactory();
        callbacks.setBehaviorStrategy(MockBehavior.Loose);
        callbacks.setBehaviorStrategy(MockBehavior.Strict);
        const actual = callbacks.intercepted(expression);
        callbacks.hasNamedMethod(propertyName);

        expect(strictStrategy.intercepted).toHaveBeenCalledWith(expression);
        expect(strictStrategy.hasNamedMethod).toHaveBeenCalledWith(propertyName);
        expect(actual).toBe(expected);
    });
});