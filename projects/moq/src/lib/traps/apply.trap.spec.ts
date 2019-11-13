import { Tracker } from "../tracker";
import { MethodInteraction } from "../interactions";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { ApplyTrap } from "./apply.trap";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Apply trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        resolve = resolveBuilder([
            [Tracker, tracker],
            [InteractionPlayer, interactionPlayer],
            [ApplyTrap, new ApplyTrap(tracker, interactionPlayer)]
        ]);
    });

    it("Tracks method invocation", () => {
        const args = [];

        const trap = resolve(ApplyTrap);
        trap.intercept(undefined, undefined, args);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new MethodInteraction(args));
    });

    it("Returns interaction result", () => {
        const args = [];
        const result = {};

        const trap = resolve(ApplyTrap);
        resolve(InteractionPlayer)
            .play.withArgs(new MethodInteraction(args)).and.returnValue(result);

        const actual = trap.intercept(undefined, undefined, args);

        expect(actual).toBe(result);
    });
});
