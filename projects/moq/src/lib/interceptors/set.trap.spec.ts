import { Tracker } from "../tracker/tracker";
import { SetPropertyInteraction } from "../interactions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { SetTrap } from "./set.trap";
import { createInjector, resolve } from "../../tests.components/resolve.builder";
import { MoqAPI } from "../moq";
import { PropertyIsReadOnlyTester } from "../explorers/has-property.explorer/property-is-read-only.tester";

describe("Set trap", () => {
    beforeEach(() => {
        const storage = jasmine.createSpyObj<PropertiesValueStorage>("", ["has", "set"]);
        const tracker = jasmine.createSpyObj<Tracker>("", ["add"]);
        const interactionPlayer = jasmine.createSpyObj<InteractionPlayer>("", ["play"]);
        const propertyIsReadOnlyTester = jasmine.createSpyObj<PropertyIsReadOnlyTester>("", ["isReadOnly"]);
        createInjector([
            {provide: PropertiesValueStorage, useValue: storage, deps: []},
            {provide: Tracker, useValue: tracker, deps: []},
            {provide: InteractionPlayer, useValue: interactionPlayer, deps: []},
            {provide: PropertyIsReadOnlyTester, useValue: propertyIsReadOnlyTester, deps: []},
            {provide: SetTrap, useClass: SetTrap, deps: [Tracker, PropertiesValueStorage, InteractionPlayer, PropertyIsReadOnlyTester]},
        ]);
    });

    it("Tracks set property call", () => {
        const value = "value";
        const propertyName = "property name";

        const trap = resolve(SetTrap);
        trap.intercept(undefined, propertyName, value);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new SetPropertyInteraction(propertyName, value));
    });

    it("Tracks set MoqAPI call", () => {
        const value = "value";

        const trap = resolve(SetTrap);
        trap.intercept(undefined, MoqAPI, value);

        expect(resolve(Tracker).add).toHaveBeenCalledWith(new SetPropertyInteraction(MoqAPI, value));
    });

    it("Assigns new value to property when interaction returns true", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyInteraction(propertyName, value)).and.returnValue(true);

        const trap = resolve(SetTrap);
        trap.intercept(undefined, propertyName, value);

        expect(resolve(PropertiesValueStorage).set).toHaveBeenCalledWith(propertyName, value);
    });

    it("Assigns new value to property when interaction returns undefined", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyInteraction(propertyName, value)).and.returnValue(undefined);

        const trap = resolve(SetTrap);
        trap.intercept(undefined, propertyName, value);

        expect(resolve(PropertiesValueStorage).set).toHaveBeenCalledWith(propertyName, value);
    });

    it("Does not assign the value to property when interaction returns false", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyInteraction(propertyName, value)).and.returnValue(false);

        const trap = resolve(SetTrap);
        trap.intercept(undefined, propertyName, value);

        expect(resolve(PropertiesValueStorage).set).not.toHaveBeenCalledWith(propertyName, value);
    });

    it("Does not assign the value to MoqAPI property", () => {
        const value = "value";

        const trap = resolve(SetTrap);
        trap.intercept(undefined, MoqAPI, value);

        expect(resolve(PropertiesValueStorage).set).not.toHaveBeenCalledWith(MoqAPI, value);
    });

    it("Returns true when interaction returns undefined", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyInteraction(propertyName, value)).and.returnValue(undefined);

        const trap = resolve(SetTrap);
        const actual = trap.intercept(undefined, propertyName, value);

        expect(actual).toBe(true);
    });

    it("Returns true when interaction returns true", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyInteraction(propertyName, value)).and.returnValue(true);

        const trap = resolve(SetTrap);
        const actual = trap.intercept(undefined, propertyName, value);

        expect(actual).toBe(true);
    });

    it("Returns false when interaction returns false", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(InteractionPlayer)
            .play.withArgs(new SetPropertyInteraction(propertyName, value)).and.returnValue(false);

        const trap = resolve(SetTrap);
        const actual = trap.intercept(undefined, propertyName, value);

        expect(actual).toBe(false);
    });

    it("Returns false when property is MoqAPI", () => {
        const value = "value";

        const trap = resolve(SetTrap);
        const actual = trap.intercept(undefined, MoqAPI, value);

        expect(actual).toBe(false);
    });

    it("Returns false when property is read only", () => {
        const value = "value";
        const propertyName = "property name";

        resolve(PropertyIsReadOnlyTester)
            .isReadOnly.withArgs(propertyName).and.returnValue(true);

        const trap = resolve(SetTrap);
        const actual = trap.intercept(undefined, propertyName, value);

        expect(actual).toBe(false);
    });
});
