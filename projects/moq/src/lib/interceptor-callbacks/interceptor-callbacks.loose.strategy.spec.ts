import { Interactions } from "../interactions";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { InterceptorCallbacksLooseStrategy } from "./interceptor-callbacks.loose.strategy";
import { Tracker } from "../tracker";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";

describe("Interceptor callbacks loose strategy", () => {
    it("Tracks intercepted calls", () => {
        const expression = <Interactions>{};

        const tracker = jasmine.createSpyObj<Tracker>(["add"]);

        const strategy = new InterceptorCallbacksLooseStrategy(tracker, null, null);
        strategy.intercepted(expression);

        expect(tracker.add).toHaveBeenCalledWith(expression);
    });

    it("Returns preset play result", () => {
        const value = "value";
        const expression = <Interactions>{};

        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>(["play"]);
        interactionPlayer.play.withArgs(expression).and.returnValue(value);

        const strategy = new InterceptorCallbacksLooseStrategy(null, null, interactionPlayer);
        const actual = strategy.invoke(expression);

        expect(actual).toBe(value);
    });

    it("Returns reverted has property explorer result", () => {
        const propertyKey = <PropertyKey>"key";

        const explorer = jasmine.createSpyObj<HasPropertyExplorer>(["has"]);
        explorer.has.withArgs(propertyKey).and.returnValue(true);

        const strategy = new InterceptorCallbacksLooseStrategy(null, explorer, null);
        const actual = strategy.hasNamedMethod(propertyKey, undefined);

        expect(actual).toBe(false);
    });
});
