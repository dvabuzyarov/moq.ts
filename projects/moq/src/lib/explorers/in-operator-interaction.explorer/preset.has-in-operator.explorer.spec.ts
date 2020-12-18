import { PresetHasInOperatorExplorer } from "./preset.has-in-operator.explorer";
import { IPreset } from "../../presets/presets/preset";
import { ExpectedExpressions, ExpectedInOperatorExpression } from "../../expected-expressions/expected-expressions";
import { It } from "../../expected-expressions/expression-predicates";
import { IPlayable } from "../../moq";
import { createInjector2, resolve2 } from "../../../tests.components/resolve.builder";

describe("Preset has in operator explorer", () => {

    beforeEach(() => {
        createInjector2(PresetHasInOperatorExplorer, []);
    });

    class Preset implements IPreset<unknown> {
        constructor(
            public readonly playable: IPlayable,
            public readonly target: ExpectedExpressions<unknown>) {
        }
    }

    it("Returns false when preset is not playable", () => {
        const name = "name";
        const target = {} as ExpectedExpressions<unknown>;
        const preset = {target, playable: {isPlayable: () => false}} as IPreset<unknown>;

        const explorer = resolve2(PresetHasInOperatorExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });

    it("Returns true when target of preset is ExpectedInOperatorExpression and has the same name", () => {
        const name = "name";
        const expression = new ExpectedInOperatorExpression(name);
        const preset = new Preset({isPlayable: () => true, update: undefined}, expression);

        const explorer = resolve2(PresetHasInOperatorExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when target of preset is ExpectedInOperatorExpression and has different name", () => {
        const name = "name";
        const expression = new ExpectedInOperatorExpression("other name");
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
