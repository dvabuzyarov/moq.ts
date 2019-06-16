import { Tracker } from "../tracker";
import { nameof } from "../nameof";
import { GetTrap } from "./get.trap";
import { GetPropertyExpression } from "../expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { SpyFunctionProvider } from "./spy-function.provider";
import { IJasmineSpy } from "../jasmine-spy";
import { Type } from "../type";

describe("Get trap", () => {
    let resolve: <T>(token: Type<T>) => IJasmineSpy<T>;

    function get(): GetTrap {
        const storage = jasmine.createSpyObj<PropertiesValueStorage>("", ["has", "get"]);
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        const hasPropertyExplorer = jasmine.createSpyObj<HasPropertyExplorer>("", ["has"]);
        const hasMethodExplorer = jasmine.createSpyObj<HasMethodExplorer>("", ["has"]);
        const spyFunctionProvider = jasmine.createSpyObj<SpyFunctionProvider>("", ["get"]);
        resolve = <T>(token: Type<T | any>): T => {
            if (token === PropertiesValueStorage) {
                return storage as any as T;
            }
            if (token === Tracker) {
                return tracker as any as T;
            }
            if (token === InteractionPlayer) {
                return interactionPlayer as any as T;
            }
            if (token === HasPropertyExplorer) {
                return hasPropertyExplorer as any as T;
            }
            if (token === HasMethodExplorer) {
                return hasMethodExplorer as any as T;
            }
            if (token === SpyFunctionProvider) {
                return spyFunctionProvider as any as T;
            }
        };
        return new GetTrap(tracker, storage, interactionPlayer, hasPropertyExplorer, hasMethodExplorer, spyFunctionProvider);
    }

    it("Tracks get property call", () => {
        const propertyName = "property name";

        const trap = get();
        trap.intercept(propertyName);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new GetPropertyExpression(propertyName));
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

    it("Returns value from property read preset", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = get();
        resolve(PropertiesValueStorage)
            .has.withArgs(propertyName).and.returnValue(false);
        resolve(HasPropertyExplorer)
            .has.withArgs(propertyName).and.returnValue(true);
        resolve(InteractionPlayer)
            .play.withArgs(new GetPropertyExpression(propertyName)).and.returnValue(value);

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
        trap.prototypeof(Prototype.prototype);

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

        trap.prototypeof(Prototype.prototype);
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

        trap.prototypeof(Prototype.prototype);
        const actual = trap.intercept(propertyName);

        expect(actual).toBeUndefined();
    });
});
