import { Tracker } from "../tracker";
import { DefinedSetups } from "../defined-setups";
import { GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";
import { ISetupInvoke } from "../moq";
import { InterceptorCallbacksLooseStrategy } from "./interceptor-callbacks.loose.strategy";
import { IInterceptorCallbacksStrategy } from "./interceptor-callbacks";
import { nameof } from "../nameof";

describe("Interceptor callbacks loose strategy", () => {
    let definedSetups: DefinedSetups<any>;
    let tracker: Tracker;

    function trackerFactory(): Tracker {
        return <Tracker>jasmine.createSpyObj("tracker", [
            nameof<Tracker>("add"),
            nameof<Tracker>("get")
        ]);
    }

    function definedSetupsFactory(): DefinedSetups<any> {
        return <DefinedSetups<any>>jasmine.createSpyObj("definedSetups", [
            nameof<DefinedSetups<any>>("add"),
            nameof<DefinedSetups<any>>("get"),
            nameof<DefinedSetups<any>>("hasNamedMethod")
        ]);
    }

    function StrategyFactory(): IInterceptorCallbacksStrategy {
        return new InterceptorCallbacksLooseStrategy(definedSetups, tracker);
    }

    beforeEach(() => {
        definedSetups = definedSetupsFactory();
        tracker = trackerFactory();
    });

    it("Tracks intercepted calls", () => {
        const expression = new GetPropertyExpression("property name");

        const strategy = StrategyFactory();
        strategy.intercepted(expression);

        expect(tracker.add).toHaveBeenCalledWith(expression);
    });

    it("Returns a set value of an intercepted call of get property", () => {
        const expected = "some value";
        const expression = new GetPropertyExpression("property name");
        const setup = jasmine.createSpyObj("setup", [nameof<ISetupInvoke<any>>("invoke")]);
        (<jasmine.Spy>setup.invoke).and.returnValue(expected);

        (<jasmine.Spy>definedSetups.get).and.returnValue(setup);

        const strategy = StrategyFactory();
        const actual = strategy.invoke(expression);

        expect(actual).toBe(expected);
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
        expect(setup.invoke).toHaveBeenCalledWith();
    });

    it("Returns a set value of an intercepted call of set property", () => {
        const expected = true;
        const newValue = {};
        const expression = new SetPropertyExpression("property name", newValue);
        const setup = jasmine.createSpyObj("setup", [nameof<ISetupInvoke<any>>("invoke")]);
        (<jasmine.Spy>setup.invoke).and.returnValue(expected);

        (<jasmine.Spy>definedSetups.get).and.returnValue(setup);

        const strategy = StrategyFactory();
        const actual = strategy.invoke(expression);

        expect(actual).toBe(expected);
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
        expect(setup.invoke).toHaveBeenCalledWith([newValue]);
    });

    it("Returns a set value of an intercepted call of named method call", () => {
        const expected = {};
        const arg = {};
        const expression = new NamedMethodExpression("method name", [arg]);
        const setup = jasmine.createSpyObj("setup", [nameof<ISetupInvoke<any>>("invoke")]);
        (<jasmine.Spy>setup.invoke).and.returnValue(expected);

        (<jasmine.Spy>definedSetups.get).and.returnValue(setup);

        const strategy = StrategyFactory();
        const actual = strategy.invoke(expression);

        expect(actual).toBe(expected);
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
        expect(setup.invoke).toHaveBeenCalledWith([arg]);
    });

    it("Returns a set value of an intercepted call of method call", () => {
        const expected = {};
        const arg = {};
        const expression = new MethodExpression([arg]);
        const setup = jasmine.createSpyObj("setup", [nameof<ISetupInvoke<any>>("invoke")]);
        (<jasmine.Spy>setup.invoke).and.returnValue(expected);

        (<jasmine.Spy>definedSetups.get).and.returnValue(setup);

        const strategy = StrategyFactory();
        const actual = strategy.invoke(expression);

        expect(actual).toBe(expected);
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
        expect(setup.invoke).toHaveBeenCalledWith([arg]);
    });

    it("Returns undefined for an intercepted call of anything that does not have a corresponding setup", () => {
        const expression = new GetPropertyExpression("property name");

        (<jasmine.Spy>definedSetups.get).and.returnValue(undefined);

        const strategy = StrategyFactory();
        const actual = strategy.invoke(expression);

        expect(actual).toBeUndefined();
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
    });

    it("Returns true when there is no setup for a get property", () => {
        const methodName = "a method name";
        (<jasmine.Spy>definedSetups.get).and.returnValue(undefined);

        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName, {});

        const expression = new GetPropertyExpression(methodName);
        expect(actual).toBe(true);
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
    });

    it("Returns false when there is setup for a get property", () => {
        const methodName = "a method name";
        const setup = jasmine.createSpyObj("setup", [nameof<ISetupInvoke<any>>("invoke")]);
        (<jasmine.Spy>definedSetups.get).and.returnValue(setup);

        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName, {});

        const expression = new GetPropertyExpression(methodName);
        expect(actual).toBe(false);
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
    });
});
