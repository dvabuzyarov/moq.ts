import { Tracker } from "../tracker";
import { nameof } from "../../tests.components/nameof";
import { GetTrap } from "./get.trap";
import { GetPropertyInteraction } from "../interactions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { SpyFunctionProvider } from "./spy-function.provider";
import { PrototypeStorage } from "./prototype.storage";
import { resolveBuilder } from "../../tests.components/resolve.builder";
import { HasInteractionExplorer } from "../explorers/has-interaction.explorer/has-interaction.explorer";

describe("Get trap", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    function get(): GetTrap {
        const storage = jasmine.createSpyObj<PropertiesValueStorage>("", ["has", "get"]);
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        const hasPropertyExplorer = jasmine.createSpyObj<HasPropertyExplorer>("", ["has"]);
        const hasInteractionExplorer = jasmine.createSpyObj<HasInteractionExplorer>("", ["has"]);
        const hasMethodExplorer = jasmine.createSpyObj<HasMethodExplorer>("", ["has"]);
        const spyFunctionProvider = jasmine.createSpyObj<SpyFunctionProvider>("", ["get"]);
        const prototypeStorage = jasmine.createSpyObj<PrototypeStorage>("", ["get", "set"]);
        resolve = resolveBuilder([
            [PropertiesValueStorage, storage],
            [Tracker, tracker],
            [InteractionPlayer, interactionPlayer],
            [HasPropertyExplorer, hasPropertyExplorer],
            [HasInteractionExplorer, hasInteractionExplorer],
            [HasMethodExplorer, hasMethodExplorer],
            [SpyFunctionProvider, spyFunctionProvider],
            [PrototypeStorage, prototypeStorage],
        ]);
        return new GetTrap(tracker, storage, interactionPlayer,
            hasPropertyExplorer,
            hasInteractionExplorer,
            hasMethodExplorer,
            spyFunctionProvider, prototypeStorage);
    }

    it("Tracks get property call", () => {
        const propertyName = "property name";

        const trap = get();
        trap.intercept(propertyName);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new GetPropertyInteraction(propertyName));
    });

    it("Returns value from property values storage", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(true);
        resolve(PropertiesValueStorage)
            .get.withArgs(propertyName).and.returnValue(value);

        const actual = trap.intercept(propertyName);

        expect(actual).toBe(value);
    });

    it("Returns value of interaction when property is available", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(true);
        resolve(InteractionPlayer)
            .play.withArgs(new GetPropertyInteraction(propertyName)).and.returnValue(value);

        const actual = trap.intercept(propertyName);

        expect(actual).toBe(value);
    });

    it("Returns spy function from invoke method preset", () => {
        const spy = () => undefined;
        const propertyName = "property name";

        const trap = get();
        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasMethodExplorer)
            .has.withArgs(propertyName).and.returnValue(true);
        resolve(SpyFunctionProvider)
            .get.withArgs(propertyName).and.returnValue(spy);

        const actual = trap.intercept(propertyName);

        expect(actual).toBe(spy);
    });

    it("Returns spy function from prototype", () => {
        class Prototype {
            public method() {
                throw new Error("Not Implemented");
            }
        }

        const propertyName = nameof<Prototype>("method");
        const spy = () => undefined;

        const trap = get();
        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasMethodExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(SpyFunctionProvider)
            .get.withArgs(propertyName).and.returnValue(spy);
        resolve(PrototypeStorage)
            .get.and.returnValue(Prototype.prototype);

        const actual = trap.intercept(propertyName);

        expect(actual).toBe(spy);
    });

    it("Returns undefined when prototype has property with type other then Function", () => {
        class Prototype {
            public method = "value";
        }

        const propertyName = nameof<Prototype>("method");
        const spy = () => undefined;

        const trap = get();

        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasMethodExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(SpyFunctionProvider)
            .get.withArgs(propertyName).and.returnValue(spy);
        resolve(PrototypeStorage)
            .get.and.returnValue(Prototype.prototype);

        const actual = trap.intercept(propertyName);

        expect(actual).toBeUndefined();
    });

    it("Returns undefined when prototype does not have method", () => {
        class Prototype {
        }

        const propertyName = "property name";
        const spy = () => undefined;

        const trap = get();
        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasMethodExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(SpyFunctionProvider)
            .get.withArgs(propertyName).and.returnValue(spy);
        resolve(PrototypeStorage)
            .get.and.returnValue(Prototype.prototype);

        const actual = trap.intercept(propertyName);

        expect(actual).toBeUndefined();
    });

    it("Returns value of interaction when there is available interaction", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasInteractionExplorer)
            .has.withArgs(new GetPropertyInteraction(propertyName)).and.returnValue(true);
        resolve(InteractionPlayer)
            .play.withArgs(new GetPropertyInteraction(propertyName)).and.returnValue(value);

        const actual = trap.intercept(propertyName);

        expect(actual).toBe(value);
    });
});
