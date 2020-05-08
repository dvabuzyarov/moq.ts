import { Tracker } from "../tracker/tracker";
import { MethodInteraction } from "../interactions";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { ApplyTrap } from "./apply.trap";
import { createInjector, resolve } from "../../tests.components/resolve.builder";

describe("Apply trap", () => {
    beforeEach(() => {
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        createInjector([
            {provide: Tracker, useValue: tracker, deps: []},
            {provide: InteractionPlayer, useValue: interactionPlayer, deps: []},
            {provide: ApplyTrap, useClass: ApplyTrap, deps: [Tracker, InteractionPlayer]},
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
