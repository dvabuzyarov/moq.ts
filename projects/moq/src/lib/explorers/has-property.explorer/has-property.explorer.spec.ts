import { HasPropertyExplorer } from "./has-property.explorer";
import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { IPreset } from "../../presets/preset";
import { Presets } from "../../preset/presets";

describe("Has property explorer", () => {

    it("Returns true when there is a property", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const presetExplorer = jasmine.createSpyObj<PresetHasPropertyExplorer>("", ["has"]);
        presetExplorer.has.withArgs(name, preset).and.returnValue(true);

        const explorer = new HasPropertyExplorer(presets, presetExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no property", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const presetExplorer = jasmine.createSpyObj<PresetHasPropertyExplorer>("", ["has"]);
        presetExplorer.has.withArgs(name, preset).and.returnValue(false);

        const explorer = new HasPropertyExplorer(presets, presetExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(false);
    });
});
