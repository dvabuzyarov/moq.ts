import { HasMethodExplorer } from "./has-method.explorer";
import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { IPreset } from "../../presets/preset";

describe("Has instance method explorer", () => {

    it("Returns true when there is an instance method", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        const presetExplorer = jasmine.createSpyObj<PresetHasMethodExplorer>("", ["has"]);
        presetExplorer.has.withArgs(name, preset).and.returnValue(true);

        const explorer = new HasMethodExplorer(presetExplorer);
        const actual = explorer.has(name, [preset]);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no instance method", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        const presetExplorer = jasmine.createSpyObj<PresetHasMethodExplorer>("", ["has"]);
        presetExplorer.has.withArgs(name, preset).and.returnValue(false);

        const explorer = new HasMethodExplorer(presetExplorer);
        const actual = explorer.has(name, [preset]);

        expect(actual).toBe(false);
    });
});
