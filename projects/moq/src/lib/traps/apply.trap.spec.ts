import { Tracker } from "../tracker";
import { MethodExpression } from "../expressions";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { Type } from "../../tests.components/type";
import { ApplyTrap } from "./apply.trap";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Apply trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    function get(): ApplyTrap {
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        resolve = resolveBuilder([
            [Tracker, tracker],
            [InteractionPlayer, interactionPlayer]
        ]);
        resolve = <T>(token: Type<T | any>): T => {
            if (token === Tracker) {
                return tracker as any as T;
            }
            if (token === InteractionPlayer) {
                return interactionPlayer as any as T;
            }
        };
        return new ApplyTrap(tracker, interactionPlayer);
    }

    it("Tracks method invocation", () => {
        const args = [];

        const trap = get();
        trap.intercept(undefined, undefined, args);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new MethodExpression(args));
    });

    it("Returns interaction result", () => {
        const args = [];
        const result = {};

        const trap = get();
        resolve(InteractionPlayer)
            .play.withArgs(new MethodExpression(args)).and.returnValue(result);

        const actual = trap.intercept(undefined, undefined, args);

        expect(actual).toBe(result);
    });
});
