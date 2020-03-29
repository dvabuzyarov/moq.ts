import { Tracker } from "../tracker";
import { InOperatorInteraction } from "../interactions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { resolveBuilder } from "../../tests.components/resolve.builder";
import { HasTrap } from "./has.trap";

xdescribe("Has trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const storage = jasmine.createSpyObj<PropertiesValueStorage>("", ["has", "get"]);
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        const hasPropertyExplorer = jasmine.createSpyObj<HasPropertyExplorer>("", ["has"]);
        const hasMethodExplorer = jasmine.createSpyObj<HasMethodExplorer>("", ["has"]);
        resolve = resolveBuilder([
            [PropertiesValueStorage, storage],
            [Tracker, tracker],
            [InteractionPlayer, interactionPlayer],
            [HasPropertyExplorer, hasPropertyExplorer],
            [HasMethodExplorer, hasMethodExplorer],
            [HasTrap, new HasTrap(tracker, storage, interactionPlayer,
                hasPropertyExplorer,
                hasMethodExplorer)]
        ]);
    });

    it("Tracks in operator call", () => {
        const propertyName = "property name";

        const trap = resolve(HasTrap);
        trap.intercept(propertyName);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new InOperatorInteraction(propertyName));
    });

    it("Returns true if property exists in the values storage", () => {
        const propertyName = "property name";

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(true);

        const trap = resolve(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns true if property explorer sees it", () => {
        const propertyName = "property name";

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(true);

        const trap = resolve(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns true if method explorer sees it", () => {
        const propertyName = "property name";

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasMethodExplorer)
            .has.withArgs(propertyName).and.returnValue(true);

        const trap = resolve(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns false", () => {
        const propertyName = "property name";

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasMethodExplorer)
            .has.withArgs(propertyName).and.returnValue(false);

        const trap = resolve(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(false);
    });
});
