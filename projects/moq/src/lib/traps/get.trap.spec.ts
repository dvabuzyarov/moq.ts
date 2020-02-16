import { Tracker } from "../tracker";
import { GetTrap } from "./get.trap";
import { GetPropertyInteraction } from "../interactions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { SpyFunctionProvider } from "./spy-function.provider";
import { resolveBuilder } from "../../tests.components/resolve.builder";

describe("Get trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const storage = jasmine.createSpyObj<PropertiesValueStorage>("", ["has", "get"]);
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        const hasPropertyExplorer = jasmine.createSpyObj<HasPropertyExplorer>("", ["has"]);
        const hasMethodExplorer = jasmine.createSpyObj<HasMethodExplorer>("", ["has"]);
        const spyFunctionProvider = jasmine.createSpyObj<SpyFunctionProvider>("", ["get"]);
        resolve = resolveBuilder([
            [PropertiesValueStorage, storage],
            [Tracker, tracker],
            [InteractionPlayer, interactionPlayer],
            [HasPropertyExplorer, hasPropertyExplorer],
            [HasMethodExplorer, hasMethodExplorer],
            [SpyFunctionProvider, spyFunctionProvider],
            [GetTrap, new GetTrap(tracker, storage, interactionPlayer,
                hasPropertyExplorer,
                hasMethodExplorer,
                spyFunctionProvider)]
        ]);
    });

    it("Tracks get property call", () => {
        const propertyName = "property name";

        const trap = resolve(GetTrap);
        trap.intercept(propertyName);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new GetPropertyInteraction(propertyName));
    });

    it("Returns value from property values storage", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(true);
        resolve(PropertiesValueStorage)
            .get.withArgs(propertyName).and.returnValue(value);

        const trap = resolve(GetTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(value);
    });

    it("Returns value of interaction when property is available", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(true);
        resolve(InteractionPlayer)
            .play.withArgs(new GetPropertyInteraction(propertyName)).and.returnValue(value);

        const trap = resolve(GetTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(value);
    });

    it("Returns spy function from invoke method preset", () => {
        const spy = () => undefined;
        const propertyName = "property name";

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasMethodExplorer)
            .has.withArgs(propertyName).and.returnValue(true);
        resolve(SpyFunctionProvider)
            .get.withArgs(propertyName).and.returnValue(spy);

        const trap = resolve(GetTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(spy);
    });

    it("Returns value of interaction", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(InteractionPlayer)
            .play.withArgs(new GetPropertyInteraction(propertyName)).and.returnValue(value);

        const trap = resolve(GetTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(value);
    });
});
