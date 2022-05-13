import { Tracker } from "../tracker/tracker";
import { InOperatorExpression } from "../reflector/expressions";
import { PropertiesValueStorage } from "./properties-value.storage";
import { InteractionPlayer } from "../interaction-players/interaction.player";
import { HasPropertyExplorer } from "../explorers/has-property.explorer/has-property.explorer";
import { HasMethodExplorer } from "../explorers/has-method.explorer/has-method.explorer";
import { createInjector, resolve2, resolveMock } from "../../tests.components/resolve.builder";
import { HasTrap } from "./has.trap";
import { InOperatorInteractionExplorer } from "../explorers/in-operator-interaction.explorer/in-operator-interaction.explorer";
import { PresetPlayablesUpdater } from "../playables/preset-playables.updater";

describe("Has trap", () => {
    beforeEach(() => {
        createInjector(HasTrap, [
            Tracker,
            PropertiesValueStorage,
            InteractionPlayer,
            InOperatorInteractionExplorer,
            HasPropertyExplorer,
            HasMethodExplorer,
            PresetPlayablesUpdater
        ]);
    });

    beforeEach(() => {
        resolveMock(Tracker).prototypeof(Tracker.prototype);
        resolveMock(PropertiesValueStorage).prototypeof(PropertiesValueStorage.prototype);
        resolveMock(InOperatorInteractionExplorer).prototypeof(InOperatorInteractionExplorer.prototype);
        resolveMock(PresetPlayablesUpdater).prototypeof(PresetPlayablesUpdater.prototype);
        resolveMock(HasPropertyExplorer).prototypeof(HasPropertyExplorer.prototype);
        resolveMock(HasMethodExplorer).prototypeof(HasMethodExplorer.prototype);
    });

    it("Tracks in operator call", () => {
        const propertyName = "property name";

        const trap = resolve2(HasTrap);
        trap.intercept(propertyName);

        resolveMock(Tracker)
            .verify(instance => instance.add(new InOperatorExpression(propertyName)));
    });

    it("Returns true if property exists in the values storage", () => {
        const propertyName = "property name";

        resolveMock(PropertiesValueStorage)
            .setup(instance => instance.has(propertyName))
            .returns(true);

        const trap = resolve2(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns interaction play value if in operator explorer sees it", () => {
        const propertyName = "property name";

        resolveMock(PropertiesValueStorage)
            .setup(instance => instance.has(propertyName))
            .returns(false);
        resolveMock(InOperatorInteractionExplorer)
            .setup(instance => instance.has(propertyName))
            .returns(true);
        resolveMock(InteractionPlayer)
            .setup(instance => instance.play(new InOperatorExpression(propertyName)))
            .returns(true);

        const trap = resolve2(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns true if property explorer sees it", () => {
        const propertyName = "property name";

        resolveMock(PropertiesValueStorage)
            .setup(instance => instance.has(propertyName))
            .returns(false);
        resolveMock(InteractionPlayer)
            .setup(instance => instance.play(new InOperatorExpression(propertyName)))
            .returns(false);
        resolveMock(HasPropertyExplorer)
            .setup(instance => instance.has(propertyName))
            .returns(true);

        const trap = resolve2(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(true);
    });

    it("Updates in operators playables states", () => {
        const propertyName = "property name";

        resolveMock(PropertiesValueStorage)
            .setup(instance => instance.has(propertyName))
            .returns(false);
        resolveMock(InteractionPlayer)
            .setup(instance => instance.play(new InOperatorExpression(propertyName)))
            .returns(false);

        const trap = resolve2(HasTrap);
        trap.intercept(propertyName);

        resolveMock(PresetPlayablesUpdater)
            .verify(instance => instance.update(new InOperatorExpression(propertyName), undefined));
    });

    it("Returns true if method explorer sees it", () => {
        const propertyName = "property name";

        resolveMock(PropertiesValueStorage)
            .setup(instance => instance.has(propertyName))
            .returns(false);
        resolveMock(InteractionPlayer)
            .setup(instance => instance.play(new InOperatorExpression(propertyName)))
            .returns(false);
        resolveMock(HasPropertyExplorer)
            .setup(instance => instance.has(propertyName))
            .returns(false);
        resolveMock(HasMethodExplorer)
            .setup(instance => instance.has(propertyName))
            .returns(true);

        const trap = resolve2(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(true);
    });

    it("Returns false", () => {
        const propertyName = "property name";

        resolveMock(PropertiesValueStorage)
            .setup(instance => instance.has(propertyName))
            .returns(false);
        resolveMock(InteractionPlayer)
            .setup(instance => instance.play(new InOperatorExpression(propertyName)))
            .returns(false);
        resolveMock(HasPropertyExplorer)
            .setup(instance => instance.has(propertyName))
            .returns(false);
        resolveMock(HasMethodExplorer)
            .setup(instance => instance.has(propertyName))
            .returns(false);

        const trap = resolve2(HasTrap);
        const actual = trap.intercept(propertyName);

        expect(actual).toBe(false);
    });
});
