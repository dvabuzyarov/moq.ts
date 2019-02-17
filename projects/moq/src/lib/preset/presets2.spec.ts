import { Presets2 } from "./presets2";
import { IPreset } from "../presets/preset";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";

describe("List of defined presets", () => {
    it("Returns a copy of presets list", () => {
        const presets = new Presets2<any>();
        const actual1 = presets.get();
        const actual2 = presets.get();

        expect(actual1).not.toBe(actual2);
    });

    it("Returns defined presets in LIFO order", () => {
        class Preset implements IPreset<unknown>{
            readonly invocable: () => boolean;
            readonly target: ExpectedExpressions<unknown>;
        }

        const preset1 = new Preset();
        const preset2 = new Preset();

        const presets = new Presets2<any>();
        presets.add(preset2);
        presets.add(preset1);
        const actual = presets.get();

        expect(actual).toEqual([preset1, preset2]);
    });
});
