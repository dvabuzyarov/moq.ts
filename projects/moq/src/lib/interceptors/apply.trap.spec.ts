import { Tracker } from "../tracker/tracker";
import { FunctionExpression } from "../reflector/expressions";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { ApplyTrap } from "./apply.trap";
import { createInjectorFromProviders, resolve } from "../../tests.components/resolve.builder";

describe("Apply trap", () => {
    beforeEach(() => {
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        createInjectorFromProviders([
            {provide: Tracker, useValue: tracker, deps: []},
            {provide: InteractionPlayer, useValue: interactionPlayer, deps: []},
            {provide: ApplyTrap, useClass: ApplyTrap, deps: [Tracker, InteractionPlayer]},
        ]);
    });

    it("Tracks method invocation", () => {
        const args = [];

        const trap = resolve(ApplyTrap);
        trap.intercept(undefined, undefined, args);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new FunctionExpression(args));
    });

    it("Returns interaction result", () => {
        const args = [];
        const result = {};

        const trap = resolve(ApplyTrap);
        resolve(InteractionPlayer)
            .play.withArgs(new FunctionExpression(args)).and.returnValue(result);

        const actual = trap.intercept(undefined, undefined, args);

        expect(actual).toBe(result);
    });
});
