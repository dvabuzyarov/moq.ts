import { Tracker } from "../tracker";
import { NamedMethodInteraction } from "../interactions";
import { SpyFunctionProvider } from "./spy-function.provider";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Get trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        resolve = resolveBuilder([
            [Tracker, tracker],
            [InteractionPlayer, interactionPlayer],
            [SpyFunctionProvider, new SpyFunctionProvider(tracker, interactionPlayer)]
        ]);
    });

    it("Tracks method invocation", () => {
        const propertyName = "property name";
        const arg = {};

        const provider = resolve(SpyFunctionProvider);
        const spy = provider.get(propertyName);
        spy(arg);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new NamedMethodInteraction(propertyName, [arg]));
    });

    it("Returns result of interaction", () => {
        const propertyName = "property name";
        const arg = {};
        const value = {};

        resolve(InteractionPlayer)
            .play.withArgs(new NamedMethodInteraction(propertyName, [arg])).and.returnValue(value);

        const provider = resolve(SpyFunctionProvider);
        const spy = provider.get(propertyName);
        const actual = spy(arg);

        expect(actual).toBe(value);
    });

    it("Returns the same function for the same name", () => {
        const propertyName = "property name";

        const provider = resolve(SpyFunctionProvider);
        const spy1 = provider.get(propertyName);
        const spy2 = provider.get(propertyName);

        expect(spy1).toBe(spy2);
    });

    it("Returns the different functions for different names", () => {
        const propertyName1 = "property name 1";
        const propertyName2 = "property name 2";

        const provider = resolve(SpyFunctionProvider);
        const spy1 = provider.get(propertyName1);
        const spy2 = provider.get(propertyName2);

        expect(spy1).not.toBe(spy2);
    });
});
