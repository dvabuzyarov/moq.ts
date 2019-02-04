import { HasPropertyExplorer } from "./has-property.explorer";
import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { IPreset } from "../presets/preset";

describe("Has property explorer", () => {

    it("Returns true when there is a property", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        const presetExplorer = jasmine.createSpyObj<PresetHasPropertyExplorer>("", ["has"]);
        presetExplorer.has.withArgs(name, preset).and.returnValue(true);

        const explorer = new HasPropertyExplorer(presetExplorer);
        const actual = explorer.has(name, [preset]);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no property", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        const presetExplorer = jasmine.createSpyObj<PresetHasPropertyExplorer>("", ["has"]);
        presetExplorer.has.withArgs(name, preset).and.returnValue(false);

        const explorer = new HasPropertyExplorer(presetExplorer);
        const actual = explorer.has(name, [preset]);

        expect(actual).toBe(false);
    });
});
