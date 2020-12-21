import { Tracker } from "../tracker/tracker";
import { NewOperatorInteraction } from "../interactions";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { createInjector2, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ConstructTrap } from "./construct.trap";

describe("Construct trap", () => {
    beforeEach(() => {
        createInjector2(ConstructTrap, [
            Tracker,
            InteractionPlayer
        ]);
    });

    beforeEach(() => {
        resolveMock(Tracker).prototypeof(Tracker.prototype);
        resolveMock(InteractionPlayer).prototypeof(InteractionPlayer.prototype);
    });

    it("Tracks new operator call", () => {
        const args = ["property name"];

        const trap = resolve2(ConstructTrap);
        trap.intercept(args);

        resolveMock(Tracker)
            .verify(instance => instance.add(new NewOperatorInteraction(args)));
    });

    it("Returns interaction play value", () => {
        const args = [];
        const expected = {};

        resolveMock(InteractionPlayer)
            .setup(instance => instance.play(new NewOperatorInteraction(args)))
            .returns(expected);

        const trap = resolve2(ConstructTrap);
        const actual = trap.intercept(args);

        expect(actual).toBe(expected);
    });
});
