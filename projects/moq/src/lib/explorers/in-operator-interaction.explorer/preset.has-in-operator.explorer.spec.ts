import { PresetHasInOperatorExplorer } from "./preset.has-in-operator.explorer";
import { IPreset } from "../../presets/preset";
import { ExpectedExpressions, ExpectedInOperatorExpression } from "../../expected-expressions/expected-expressions";
import { MimicsPreset } from "../../presets/mimics.preset";
import { It } from "../../expected-expressions/expression-predicates";

describe("Preset has in operator explorer", () => {

    it("Returns false when preset is not invocable", () => {
        const name = "name";
        const target = <ExpectedExpressions<unknown>>{};
        const preset = <IPreset<unknown>>{target, invocable: () => false};

        const explorer = new PresetHasInOperatorExplorer();
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });

    it("Returns true when target of preset is ExpectedInOperatorExpression and has the same name", () => {
        const name = "name";
        const origin = {};
        const preset = new MimicsPreset(() => true, new ExpectedInOperatorExpression(name), origin);

        const explorer = new PresetHasInOperatorExplorer();
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when target of preset is ExpectedInOperatorExpression and has different name", () => {
        const name = "name";
        const origin = {};
        const preset = new MimicsPreset(() => true, new ExpectedInOperatorExpression("other name"), origin);

        const explorer = new PresetHasInOperatorExplorer();
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });

    it("Returns true when target of preset is It and test returns true", () => {
        const name = "name";
        const origin = {};
        const preset = new MimicsPreset(() => true, It.IsAny(), origin);

        const explorer = new PresetHasInOperatorExplorer();
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when target of preset is is It and test returns false", () => {
        const name = "name";
        const origin = {};
        const preset = new MimicsPreset(() => true, It.Is(() => false), origin);

        const explorer = new PresetHasInOperatorExplorer();
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });
});
