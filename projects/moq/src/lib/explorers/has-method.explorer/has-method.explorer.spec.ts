import { HasMethodExplorer } from "./has-method.explorer";
import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { IPreset } from "../../presets/preset";
import { Presets } from "../../preset/presets";

describe("Has instance method explorer", () => {

    it("Returns true when there is an instance method", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const presetExplorer = jasmine.createSpyObj<PresetHasMethodExplorer>("", ["has"]);
        presetExplorer.has.withArgs(name, preset).and.returnValue(true);

        const explorer = new HasMethodExplorer(presets, presetExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no instance method", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        presets.get.and.returnValue([preset]);

        const presetExplorer = jasmine.createSpyObj<PresetHasMethodExplorer>("", ["has"]);
        presetExplorer.has.withArgs(name, preset).and.returnValue(false);

        const explorer = new HasMethodExplorer(presets, presetExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(false);
    });
});
