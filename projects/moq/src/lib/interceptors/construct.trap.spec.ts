import { Tracker } from "../tracker/tracker";
import { NewOperatorExpression } from "../reflector/expressions";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { ConstructTrap } from "./construct.trap";

describe("Construct trap", () => {
    beforeEach(() => {
        createInjector(ConstructTrap, [
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
            .verify(instance => instance.add(new NewOperatorExpression(args)));
    });

    it("Returns interaction play value", () => {
        const args = [];
        const expected = {};

        resolveMock(InteractionPlayer)
            .setup(instance => instance.play(new NewOperatorExpression(args)))
            .returns(expected);

        const trap = resolve2(ConstructTrap);
        const actual = trap.intercept(args);

        expect(actual).toBe(expected);
    });
});
