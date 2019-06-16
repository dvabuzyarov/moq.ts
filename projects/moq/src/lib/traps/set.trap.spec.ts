import { Tracker } from "../tracker";
import { SetPropertyExpression } from "../expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { SetTrap } from "./set.trap";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Set trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    function get(): SetTrap {
        const storage = jasmine.createSpyObj<PropertiesValueStorage>("", ["has", "set"]);
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        resolve = resolveBuilder([
            [PropertiesValueStorage, storage],
            [Tracker, tracker],
            [InteractionPlayer, interactionPlayer],
        ]);
        return new SetTrap(tracker, storage, interactionPlayer);
    }

    it("Tracks set property call", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        trap.intercept(undefined, propertyName, value);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new SetPropertyExpression(propertyName, value));
    });

    it("Assigns new value to property when interaction returns true", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyExpression(propertyName, value)).and.returnValue(true);

        trap.intercept(undefined, propertyName, value);

        expect(resolve(PropertiesValueStorage).set).toHaveBeenCalledWith(propertyName, value);
    });

    it("Assigns new value to property when interaction returns undefined", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyExpression(propertyName, value)).and.returnValue(undefined);

        trap.intercept(undefined, propertyName, value);

        expect(resolve(PropertiesValueStorage).set).toHaveBeenCalledWith(propertyName, value);
    });

    it("Does not assign the value to property when interaction returns false", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyExpression(propertyName, value)).and.returnValue(false);

        trap.intercept(undefined, propertyName, value);

        expect(resolve(PropertiesValueStorage).set).not.toHaveBeenCalledWith(propertyName, value);
    });

    it("Returns true when interaction returns undefined", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyExpression(propertyName, value)).and.returnValue(undefined);

        const actual = trap.intercept(undefined, propertyName, value);

        expect(actual).toBe(true);
    });

    it("Returns true when interaction returns true", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyExpression(propertyName, value)).and.returnValue(true);

        const actual = trap.intercept(undefined, propertyName, value);

        expect(actual).toBe(true);
    });

    it("Returns false when interaction returns false", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyExpression(propertyName, value)).and.returnValue(false);

        const actual = trap.intercept(undefined, propertyName, value);

        expect(actual).toBe(false);
    });
});
