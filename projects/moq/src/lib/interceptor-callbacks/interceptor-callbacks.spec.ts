import { InterceptorCallbacksStrictStrategy } from "./interceptor-callbacks.strict.strategy";
import { InterceptorCallbacksLooseStrategy } from "./interceptor-callbacks.loose.strategy";
import { InterceptorCallbacks, MockBehavior } from "./interceptor-callbacks";
import { GetPropertyExpression } from "../expressions";
import { nameof } from "../nameof";

describe("Interceptor callbacks", () => {

    let strictStrategy: InterceptorCallbacksStrictStrategy<any>;
    let looseStrategy: InterceptorCallbacksLooseStrategy<any>;

    function strictStrategyFactory(): InterceptorCallbacksStrictStrategy<any> {
        return <InterceptorCallbacksStrictStrategy<any>>jasmine.createSpyObj("strict strategy", [
            nameof<InterceptorCallbacksStrictStrategy<any>>("intercepted"),
            nameof<InterceptorCallbacksStrictStrategy<any>>("hasNamedMethod"),
        ]);
    }

    function looseStrategyFactory(): InterceptorCallbacksLooseStrategy<any> {
        return <InterceptorCallbacksLooseStrategy<any>>jasmine.createSpyObj("loose strategy", [
            nameof<InterceptorCallbacksLooseStrategy<any>>("intercepted"),
            nameof<InterceptorCallbacksLooseStrategy<any>>("hasNamedMethod"),
        ]);
    }

    function InterceptorCallbacksFactory(): InterceptorCallbacks<any> {
        return new InterceptorCallbacks<any>(strictStrategy, looseStrategy);
    }

    beforeEach(() => {
        strictStrategy = strictStrategyFactory();
        looseStrategy = looseStrategyFactory();
    });

    it("Wraps strict strategy by default", () => {

        const expected = {};
        const propertyName = "property";
        const expression = new GetPropertyExpression(propertyName);
        const prototype = {};
        (<jasmine.Spy>strictStrategy.intercepted).and.returnValue(expected);

        const callbacks = InterceptorCallbacksFactory();
        const actual = callbacks.intercepted(expression);
        callbacks.hasNamedMethod(propertyName, prototype);

        expect(strictStrategy.intercepted).toHaveBeenCalledWith(expression);
        expect(strictStrategy.hasNamedMethod).toHaveBeenCalledWith(propertyName, prototype);
        expect(actual).toBe(expected as any);
    });

    it("Wraps loose strategy", () => {

        const expected = {};
        const propertyName = "property";
        const expression = new GetPropertyExpression(propertyName);
        const prototype = {};
        (<jasmine.Spy>looseStrategy.intercepted).and.returnValue(expected);

        const callbacks = InterceptorCallbacksFactory();
        callbacks.setBehaviorStrategy(MockBehavior.Loose);
        const actual = callbacks.intercepted(expression);
        callbacks.hasNamedMethod(propertyName, prototype);

        expect(looseStrategy.intercepted).toHaveBeenCalledWith(expression);
        expect(looseStrategy.hasNamedMethod).toHaveBeenCalledWith(propertyName, prototype);
        expect(actual).toBe(expected as any);
    });

    it("Wraps strict strategy", () => {

        const expected = {};
        const propertyName = "property";
        const expression = new GetPropertyExpression(propertyName);
        const prototype = {};

        (<jasmine.Spy>strictStrategy.intercepted).and.returnValue(expected);
        const callbacks = InterceptorCallbacksFactory();
        callbacks.setBehaviorStrategy(MockBehavior.Loose);
        callbacks.setBehaviorStrategy(MockBehavior.Strict);
        const actual = callbacks.intercepted(expression);
        callbacks.hasNamedMethod(propertyName, prototype);

        expect(strictStrategy.intercepted).toHaveBeenCalledWith(expression);
        expect(strictStrategy.hasNamedMethod).toHaveBeenCalledWith(propertyName, prototype);
        expect(actual).toBe(expected as any);
    });
});
