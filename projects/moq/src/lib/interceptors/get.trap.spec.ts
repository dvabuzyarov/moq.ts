import { Tracker } from "../tracker/tracker";
import { GetTrap } from "./get.trap";
import { GetPropertyExpression } from "../reflector/expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { SpyFunctionProvider } from "./spy-function.provider";
import { createInjectorFromProviders, resolve } from "../../tests.components/resolve.builder";
import { MoqAPI } from "../moq";
import { MOCK } from "../injector/mock.injection-token";
import { Mock } from "../mock";

describe("Get trap", () => {
    beforeEach(() => {
        const mock = jasmine.createSpyObj<Mock<unknown>>("", ["name"]);
        const storage = jasmine.createSpyObj<PropertiesValueStorage>("", ["has", "get"]);
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        const hasPropertyExplorer = jasmine.createSpyObj<HasPropertyExplorer>("", ["has"]);
        const hasMethodExplorer = jasmine.createSpyObj<HasMethodExplorer>("", ["has"]);
        const spyFunctionProvider = jasmine.createSpyObj<SpyFunctionProvider>("", ["get"]);
        createInjectorFromProviders([
            {provide: MOCK, useValue: mock, deps: []},
            {provide: PropertiesValueStorage, useValue: storage, deps: []},
            {provide: Tracker, useValue: tracker, deps: []},
            {provide: InteractionPlayer, useValue: interactionPlayer, deps: []},
            {provide: HasPropertyExplorer, useValue: hasPropertyExplorer, deps: []},
            {provide: HasMethodExplorer, useValue: hasMethodExplorer, deps: []},
            {provide: SpyFunctionProvider, useValue: spyFunctionProvider, deps: []},
            {
                provide: GetTrap, useClass: GetTrap, deps: [
                    MOCK,
                    Tracker, PropertiesValueStorage,
                    InteractionPlayer,
                    HasPropertyExplorer,
                    HasMethodExplorer,
                    SpyFunctionProvider
                ]
            },
        ]);
    });

    it("Tracks get property call", () => {
        const propertyName = "property name";

        const trap = resolve(GetTrap);
        trap.intercept(propertyName);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new GetPropertyExpression(propertyName));
    });

    it("Tracks get property call for MoqAPI", () => {
        const trap = resolve(GetTrap);
        trap.intercept(MoqAPI);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new GetPropertyExpression(MoqAPI));
    });

    it("Returns MoqAPI", () => {
        const trap = resolve(GetTrap);
        const actual = trap.intercept(MoqAPI);

        expect(actual).toBe(resolve(MOCK));
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
            .play.withArgs(new GetPropertyExpression(propertyName)).and.returnValue(value);

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
            .play.withArgs(new GetPropertyExpression(propertyName)).and.returnValue(value);

        const trap = resolve(GetTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(value);
    });
});
