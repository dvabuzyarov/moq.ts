import {Tracker} from '../../lib/tracker';
import {getName} from '../getName';
import {DefinedSetups} from '../../lib/defined-setups';
import {IInterceptorCallbacks} from '../../lib/interceptor';
import {InterceptorCallbacksStrictStrategy} from '../../lib/interceptor-callbacks/interceptor-callbacks.strict.strategy';
import {GetPropertyExpression, NamedMethodExpression} from '../../lib/expressions';
import {ISetupInvoke} from '../../lib/moq';
import set = Reflect.set;

describe('Interceptor callbacks strict strategy', () => {
    let definedSetups: DefinedSetups<any>;
    let tracker: Tracker;

    function trackerFactory(): Tracker {
        return <Tracker>jasmine.createSpyObj('tracker', [
            getName<Tracker>(instance => instance.add),
            getName<Tracker>(instance => instance.get),
            getName<Tracker>(instance => instance.addNamedMethod)
        ]);
    }

    function definedSetupsFactory(): DefinedSetups<any> {
        return <DefinedSetups<any>>jasmine.createSpyObj('definedSetups', [
            getName<DefinedSetups<any>>(instance => instance.add),
            getName<DefinedSetups<any>>(instance => instance.get),
            getName<DefinedSetups<any>>(instance => instance.hasNamedMethod)
        ]);
    }

    function StrategyFactory(): IInterceptorCallbacks {
        return new InterceptorCallbacksStrictStrategy(definedSetups, tracker);
    }

    beforeEach(() => {
        definedSetups = definedSetupsFactory();
        tracker = trackerFactory();
    });

    it('Tracks intercepted calls', () => {
        const expression = new GetPropertyExpression('property name');

        const strategy = StrategyFactory();
        strategy.intercepted(expression);

        expect(tracker.add).toHaveBeenCalledWith(expression);
    });

    it('Returns a set value of an intercepted call', () => {
        const expected = 'some value';
        const expression = new GetPropertyExpression('property name');
        const setup = jasmine.createSpyObj('setup', [getName<ISetupInvoke<any>>(instance => instance.invoke)]);
        (<jasmine.Spy>setup.invoke).and.returnValue(expected);

        (<jasmine.Spy>definedSetups.get).and.returnValue(setup);

        const strategy = StrategyFactory();
        const actual = strategy.intercepted(expression);

        expect(actual).toBe(expected);
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
        expect(setup.invoke).toHaveBeenCalledWith();
    });

    it('Returns undefined for an intercepted call of anything that does not have a corresponding setup', () => {
        const expression = new GetPropertyExpression('property name');

        (<jasmine.Spy>definedSetups.get).and.returnValue(undefined);

        const strategy = StrategyFactory();
        const actual = strategy.intercepted(expression);

        expect(actual).toBeUndefined();
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
    });

    it('Tracks interceptedNamedMethod calls', () => {
        const getPropertyExpression = new GetPropertyExpression('property name');
        const namedMethodExpression = new NamedMethodExpression('method name', []);

        const strategy = StrategyFactory();
        strategy.interceptedNamedMethod(namedMethodExpression, getPropertyExpression);

        expect(tracker.addNamedMethod).toHaveBeenCalledWith(namedMethodExpression, getPropertyExpression);
    });

    it('Returns a set value of an intercepted call', () => {
        const expected = 'some value';
        const args = [];
        const getPropertyExpression = new GetPropertyExpression('property name');
        const namedMethodExpression = new NamedMethodExpression('method name', args);

        const setup = jasmine.createSpyObj('setup', [getName<ISetupInvoke<any>>(instance => instance.invoke)]);
        (<jasmine.Spy>setup.invoke).and.returnValue(expected);

        (<jasmine.Spy>definedSetups.get).and.returnValue(setup);

        const strategy = StrategyFactory();
        const actual = strategy.interceptedNamedMethod(namedMethodExpression, getPropertyExpression);

        expect(actual).toBe(expected);
        expect(definedSetups.get).toHaveBeenCalledWith(namedMethodExpression);
        expect(setup.invoke).toHaveBeenCalledWith(args);
    });

    it('Returns undefined for an intercepted call of anything that does not have a corresponding setup', () => {
        const getPropertyExpression = new GetPropertyExpression('property name');
        const namedMethodExpression = new NamedMethodExpression('method name', []);

        (<jasmine.Spy>definedSetups.get).and.returnValue(undefined);

        const strategy = StrategyFactory();
        const actual = strategy.interceptedNamedMethod(namedMethodExpression, getPropertyExpression);

        expect(actual).toBeUndefined();
        expect(definedSetups.get).toHaveBeenCalledWith(namedMethodExpression);
    });

    it('Returns true when there is a named method', () => {
        const methodName = 'a method name';

        (<jasmine.Spy>definedSetups.hasNamedMethod).and.returnValue(true);
        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName);

        expect(actual).toBe(true);
        expect(definedSetups.hasNamedMethod).toHaveBeenCalledWith(methodName);
    });

    it('Returns false when there is no named method', () => {
        const methodName = 'a method name';

        (<jasmine.Spy>definedSetups.hasNamedMethod).and.returnValue(false);
        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName);

        expect(actual).toBe(false);
        expect(definedSetups.hasNamedMethod).toHaveBeenCalledWith(methodName);
    });
});