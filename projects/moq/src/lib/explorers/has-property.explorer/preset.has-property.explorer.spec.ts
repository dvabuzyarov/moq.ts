import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { IPreset } from "../../presets/presets/preset";
import { ExpectedExpressions } from "../../expected-expressions/expected-expressions";
import { ExpressionHasPropertyExplorer } from "./expression-has-property.explorer";
import { ObjectHasPropertyExplorer } from "./object-has-property.explorer";
import { MimicsPreset } from "../../presets/presets/mimics.preset";

describe("Preset has property explorer", () => {

    it("Returns true when preset expression has property", () => {
        const name = "name";
        const target = <ExpectedExpressions<unknown>>{};
        const preset = <IPreset<unknown>>{target};

        const expressionExplorer = jasmine.createSpyObj<ExpressionHasPropertyExplorer>("", ["has"]);
        expressionExplorer.has.withArgs(name, target).and.returnValue(true);

        const objectExplorer = jasmine.createSpyObj<ObjectHasPropertyExplorer>("", ["has"]);
        objectExplorer.has.and.returnValue(false);

        const explorer = new PresetHasPropertyExplorer(expressionExplorer, objectExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns true when mimic preset origin has property", () => {
        const name = "name";
        const target = {};
        const preset = new MimicsPreset(undefined, undefined, target);

        const expressionExplorer = jasmine.createSpyObj<ExpressionHasPropertyExplorer>("", ["has"]);
        expressionExplorer.has.and.returnValue(false);

        const objectExplorer = jasmine.createSpyObj<ObjectHasPropertyExplorer>("", ["has"]);
        objectExplorer.has.withArgs(name, target).and.returnValue(true);

        const explorer = new PresetHasPropertyExplorer(expressionExplorer, objectExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when preset does not have property", () => {
        const name = "name";
        const preset = new MimicsPreset(undefined, undefined, undefined);

        const expressionExplorer = jasmine.createSpyObj<ExpressionHasPropertyExplorer>("", ["has"]);
        expressionExplorer.has.and.returnValue(false);

        const objectExplorer = jasmine.createSpyObj<ObjectHasPropertyExplorer>("", ["has"]);
        objectExplorer.has.and.returnValue(false);

        const explorer = new PresetHasPropertyExplorer(expressionExplorer, objectExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });
});
