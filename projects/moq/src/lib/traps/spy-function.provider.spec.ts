import { Tracker } from "../tracker";
import { NamedMethodExpression } from "../expressions";
import { SpyFunctionProvider } from "./spy-function.provider";
import { Type } from "../type";
import { IJasmineSpy } from "../jasmine-spy";
import { InteractionPlayer } from "../interaction-players/interaction.player";

describe("Get trap", () => {
    let resolve: <T>(token: Type<T>) => IJasmineSpy<T>;

    function get(): SpyFunctionProvider {
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        resolve = <T>(token: Type<T | any>): T => {
            if (token === Tracker) {
                return tracker as any as T;
            }
            if (token === InteractionPlayer) {
                return interactionPlayer as any as T;
            }
        };
        return new SpyFunctionProvider(tracker, interactionPlayer);
    }

    it("Tracks method invocation", () => {
        const propertyName = "property name";
        const arg = {};

        const provider = get();
        const spy = provider.get(propertyName);
        spy(arg);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new NamedMethodExpression(propertyName, [arg]));
    });

    it("Returns result of interaction", () => {
        const propertyName = "property name";
        const arg = {};
        const value = {};

        const provider = get();
        resolve(InteractionPlayer)
            .play.withArgs(new NamedMethodExpression(propertyName, [arg])).and.returnValue(value);

        const spy = provider.get(propertyName);
        const actual = spy(arg);

        expect(actual).toBe(value);
    });
});
