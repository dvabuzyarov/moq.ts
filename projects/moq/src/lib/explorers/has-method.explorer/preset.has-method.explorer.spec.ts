import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { IPreset } from "../../presets/presets/preset";
import { ExpectedExpressions } from "../../expected-expressions/expected-expressions";
import { ExpressionHasMethodExplorer } from "./expression.has-method.explorer";
import { ObjectHasMethodExplorer } from "./object.has-method.explorer";
import { MimicsPreset } from "../../presets/presets/mimics.preset";

describe("Preset has instance method explorer", () => {

    it("Returns true when preset expression has instance method", () => {
        const name = "name";
        const target = <ExpectedExpressions<unknown>>{};
        const preset = <IPreset<unknown>>{target};

        const expressionExplorer = jasmine.createSpyObj<ExpressionHasMethodExplorer>("", ["has"]);
        expressionExplorer.has.withArgs(name, target).and.returnValue(true);

        const objectExplorer = jasmine.createSpyObj<ObjectHasMethodExplorer>("", ["has"]);
        objectExplorer.has.and.returnValue(false);

        const explorer = new PresetHasMethodExplorer(expressionExplorer, objectExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns true when mimic preset origin has instance method", () => {
        const name = "name";
        const target = {};
        const preset = new MimicsPreset(undefined, undefined, target);

        const expressionExplorer = jasmine.createSpyObj<ExpressionHasMethodExplorer>("", ["has"]);
        expressionExplorer.has.and.returnValue(false);

        const objectExplorer = jasmine.createSpyObj<ObjectHasMethodExplorer>("", ["has"]);
        objectExplorer.has.withArgs(name, target).and.returnValue(true);

        const explorer = new PresetHasMethodExplorer(expressionExplorer, objectExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when preset does not have instance method", () => {
        const name = "name";
        const preset = new MimicsPreset(undefined, undefined, undefined);

        const expressionExplorer = jasmine.createSpyObj<ExpressionHasMethodExplorer>("", ["has"]);
        expressionExplorer.has.and.returnValue(false);

        const objectExplorer = jasmine.createSpyObj<ObjectHasMethodExplorer>("", ["has"]);
        objectExplorer.has.and.returnValue(false);

        const explorer = new PresetHasMethodExplorer(expressionExplorer, objectExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });
});
