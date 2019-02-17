import { Tracker } from "../tracker";
import { InterceptorCallbacksStrictStrategy } from "./interceptor-callbacks.strict.strategy";
import { Expressions } from "../expressions";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";

describe("Interceptor callbacks strict strategy", () => {

    it("Tracks intercepted calls", () => {
        const expression = <Expressions>{};

        const tracker = jasmine.createSpyObj<Tracker>(["add"]);

        const strategy = new InterceptorCallbacksStrictStrategy(tracker, null, null);
        strategy.intercepted(expression);

        expect(tracker.add).toHaveBeenCalledWith(expression);
    });

    it("Returns preset play result", () => {
        const value = "value";
        const expression = <Expressions>{};

        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>(["play"]);
        interactionPlayer.play.withArgs(expression).and.returnValue(value);

        const strategy = new InterceptorCallbacksStrictStrategy(null, null, interactionPlayer);
        const actual = strategy.invoke(expression);

        expect(actual).toBe(value);
    });

    it("Returns true when there is a named method", () => {
        const propertyKey = <PropertyKey>"key";

        const explorer = jasmine.createSpyObj<HasMethodExplorer>(["has"]);
        explorer.has.withArgs(propertyKey).and.returnValue(true);

        const strategy = new InterceptorCallbacksStrictStrategy(null, explorer, null);
        const actual = strategy.hasNamedMethod(propertyKey, undefined);

        expect(actual).toBe(true);
    });

    it("Returns true when there is no a named method but prototype has it", () => {
        const methodName = <PropertyKey>"key";
        const prototype = {};
        prototype[methodName] = () => undefined;

        const explorer = jasmine.createSpyObj<HasMethodExplorer>(["has"]);
        explorer.has.withArgs(methodName).and.returnValue(false);

        const strategy = new InterceptorCallbacksStrictStrategy(null, explorer, null);
        const actual = strategy.hasNamedMethod(methodName, prototype);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no named method and prototype does not have it", () => {
        const methodName = <PropertyKey>"key";

        const explorer = jasmine.createSpyObj<HasMethodExplorer>(["has"]);
        explorer.has.withArgs(methodName).and.returnValue(false);

        const strategy = new InterceptorCallbacksStrictStrategy(null, explorer, null);
        const actual = strategy.hasNamedMethod(methodName, {});

        expect(actual).toBe(false);
    });

    it("Returns false when there is no named method and prototype has a property that holds anything else but not a function", () => {
        const methodName = <PropertyKey>"key";
        const prototype = {};
        prototype[methodName] = "not a function";

        const explorer = jasmine.createSpyObj<HasMethodExplorer>(["has"]);
        explorer.has.withArgs(methodName).and.returnValue(false);

        const strategy = new InterceptorCallbacksStrictStrategy(null, explorer, null);
        const actual = strategy.hasNamedMethod(methodName, prototype);

        expect(actual).toBe(false);
    });

    it("Returns false when there is no named method and prototype is null", () => {
        const methodName = <PropertyKey>"key";

        const explorer = jasmine.createSpyObj<HasMethodExplorer>(["has"]);
        explorer.has.withArgs(methodName).and.returnValue(false);

        const strategy = new InterceptorCallbacksStrictStrategy(null, explorer, null);
        const actual = strategy.hasNamedMethod(methodName, null);

        expect(actual).toBe(false);
    });
});
