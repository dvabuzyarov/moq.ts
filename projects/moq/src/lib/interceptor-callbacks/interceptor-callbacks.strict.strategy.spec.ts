import { Tracker } from "../tracker";
import { Preset } from "../preset/preset";
import { InterceptorCallbacksStrictStrategy } from "./interceptor-callbacks.strict.strategy";
import { GetPropertyExpression } from "../expressions";
import { ISetupInvocation } from "../moq";
import { IInterceptorCallbacksStrategy } from "./interceptor-callbacks";
import { nameof } from "../nameof";

describe("Interceptor callbacks strict strategy", () => {
    let definedSetups: Preset<any>;
    let tracker: Tracker;

    function trackerFactory(): Tracker {
        return <Tracker>jasmine.createSpyObj("tracker", [
            nameof<Tracker>("add"),
            nameof<Tracker>("get")
        ]);
    }

    function definedSetupsFactory(): Preset<any> {
        return <Preset<any>>jasmine.createSpyObj("definedSetups", [
            nameof<Preset<any>>("add"),
            nameof<Preset<any>>("get"),
            nameof<Preset<any>>("hasNamedMethod")
        ]);
    }

    function StrategyFactory(): IInterceptorCallbacksStrategy {
        return new InterceptorCallbacksStrictStrategy(definedSetups, tracker);
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

    it("Returns setup invocation result", () => {
        const expected = "some value";
        const expression = new GetPropertyExpression("property name");
        const setup = jasmine.createSpyObj("setup", [nameof<ISetupInvocation<any>>("invoke")]);
        (<jasmine.Spy>setup.invoke).withArgs(expression).and.returnValue(expected);

        (<jasmine.Spy>definedSetups.get).withArgs(expression).and.returnValue(setup);

        const strategy = StrategyFactory();
        const actual = strategy.invoke(expression);

        expect(actual).toBe(expected);
    });

    it("Returns undefined for an intercepted call of anything that does not have a corresponding setup", () => {
        const expression = new GetPropertyExpression("property name");

        (<jasmine.Spy>definedSetups.get).and.returnValue(undefined);

        const strategy = StrategyFactory();
        const actual = strategy.invoke(expression);

        expect(actual).toBeUndefined();
        expect(definedSetups.get).toHaveBeenCalledWith(expression);
    });

    it("Returns true when there is a named method", () => {
        const methodName = "a method name";

        (<jasmine.Spy>definedSetups.hasNamedMethod).and.returnValue(true);
        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName, {});

        expect(actual).toBe(true);
        expect(definedSetups.hasNamedMethod).toHaveBeenCalledWith(methodName);
    });

    it("Returns true when there is no a named method but prototype has it", () => {
        const methodName = "a method name";
        const prototype = {};
        prototype[methodName] = () => undefined;

        (<jasmine.Spy>definedSetups.hasNamedMethod).and.returnValue(false);
        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName, prototype);

        expect(actual).toBe(true);
        expect(definedSetups.hasNamedMethod).toHaveBeenCalledWith(methodName);
    });

    it("Returns false when there is no named method and prototype does not have it", () => {
        const methodName = "a method name";

        (<jasmine.Spy>definedSetups.hasNamedMethod).and.returnValue(false);
        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName, {});

        expect(actual).toBe(false);
        expect(definedSetups.hasNamedMethod).toHaveBeenCalledWith(methodName);
    });

    it("Returns false when there is no named method and prototype has a property that holds anything else but not a function", () => {
        const methodName = "a method name";
        const prototype = {};
        prototype[methodName] = "non function value";

        (<jasmine.Spy>definedSetups.hasNamedMethod).and.returnValue(false);
        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName, prototype);

        expect(actual).toBe(false);
        expect(definedSetups.hasNamedMethod).toHaveBeenCalledWith(methodName);
    });

    it("Returns false when there is no named method and prototype is null", () => {
        const methodName = "a method name";

        (<jasmine.Spy>definedSetups.hasNamedMethod).and.returnValue(false);
        const strategy = StrategyFactory();
        const actual = strategy.hasNamedMethod(methodName, null);

        expect(actual).toBe(false);
        expect(definedSetups.hasNamedMethod).toHaveBeenCalledWith(methodName);
    });
});
