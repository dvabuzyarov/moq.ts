import { Tracker } from "../tracker";
import { NamedMethodInteraction } from "../interactions";
import { SpyFunctionProvider } from "./spy-function.provider";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Get trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    function get(): SpyFunctionProvider {
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        resolve = resolveBuilder([
            [Tracker, tracker],
            [InteractionPlayer, interactionPlayer]
        ]);
        return new SpyFunctionProvider(tracker, interactionPlayer);
    }

    it("Tracks method invocation", () => {
        const propertyName = "property name";
        const arg = {};

        const provider = get();
        const spy = provider.get(propertyName);
        spy(arg);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new NamedMethodInteraction(propertyName, [arg]));
    });

    it("Returns result of interaction", () => {
        const propertyName = "property name";
        const arg = {};
        const value = {};

        const provider = get();
        resolve(InteractionPlayer)
            .play.withArgs(new NamedMethodInteraction(propertyName, [arg])).and.returnValue(value);

        const spy = provider.get(propertyName);
        const actual = spy(arg);

        expect(actual).toBe(value);
    });
});
