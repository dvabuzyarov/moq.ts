import { InOperatorInteractionExplorer } from "./in-operator-interaction.explorer";
import { PresetHasInOperatorExplorer } from "./preset.has-in-operator.explorer";
import { IPreset } from "../../presets/presets/preset";
import { Presets } from "../../presets/presets";
import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";

describe("In operator interaction explorer", () => {
    beforeEach(() => {
        createInjector(InOperatorInteractionExplorer, [Presets, PresetHasInOperatorExplorer]);
    });

    it("Returns true when there is a playable preset", () => {
        const name = "name";
        const preset = {} as IPreset<unknown>;

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);
        resolveMock(PresetHasInOperatorExplorer)
            .setup(instance => instance.has(name, preset))
            .returns(true);

        const explorer = resolve2(InOperatorInteractionExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no playable preset", () => {
        const name = "name";
        const preset = {} as IPreset<unknown>;

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);
        resolveMock(PresetHasInOperatorExplorer)
            .setup(instance => instance.has(name, preset))
            .returns(false);

        const explorer = resolve2(InOperatorInteractionExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(false);
    });
});
