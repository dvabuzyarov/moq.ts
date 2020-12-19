import { PresetHasInOperatorExplorer } from "./preset.has-in-operator.explorer";
import { IPreset } from "../../presets/presets/preset";
import { Expressions, InOperatorExpression } from "../../reflector/expressions";
import { It } from "../../reflector/expression-predicates";
import { IPlayable } from "../../moq";
import { createInjector2, resolve2 } from "../../../tests.components/resolve.builder";

describe("Preset has in operator explorer", () => {

    beforeEach(() => {
        createInjector2(PresetHasInOperatorExplorer, []);
    });

    class Preset implements IPreset<unknown> {
        constructor(
            public readonly playable: IPlayable,
            public readonly target: Expressions<unknown>) {
        }
    }

    it("Returns false when preset is not playable", () => {
        const name = "name";
        const target = {} as Expressions<unknown>;
        const preset = {target, playable: {isPlayable: () => false}} as IPreset<unknown>;

        const explorer = resolve2(PresetHasInOperatorExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });

    it("Returns true when target of preset is InOperatorExpression and has the same name", () => {
        const name = "name";
        const expression = new InOperatorExpression(name);
        const preset = new Preset({isPlayable: () => true, update: undefined}, expression);

        const explorer = resolve2(PresetHasInOperatorExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when target of preset is InOperatorExpression and has different name", () => {
        const name = "name";
        const expression = new InOperatorExpression("other name");
        const preset = new Preset({isPlayable: () => true, update: undefined}, expression);

        const explorer = resolve2(PresetHasInOperatorExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });

    it("Returns true when target of preset is It and test returns true", () => {
        const name = "name";
        const preset = new Preset({isPlayable: () => true, update: undefined}, It.IsAny());

        const explorer = resolve2(PresetHasInOperatorExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when target of preset is is It and test returns false", () => {
        const name = "name";
        const preset = new Preset({isPlayable: () => true, update: undefined}, It.Is(() => false));

        const explorer = resolve2(PresetHasInOperatorExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });
});
