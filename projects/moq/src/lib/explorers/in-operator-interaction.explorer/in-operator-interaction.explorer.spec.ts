import { InOperatorInteractionExplorer } from "./in-operator-interaction.explorer";
import { PresetHasInOperatorExplorer } from "./preset.has-in-operator.explorer";
import { IPreset } from "../../presets/presets/preset";
import { Presets } from "../../presets/presets";
import { createInjector, resolve } from "../../../tests.components/resolve.builder";

describe("In operator interaction explorer", () => {
    beforeEach(() => {
        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        const presetExplorer = jasmine.createSpyObj<PresetHasInOperatorExplorer>("", ["has"]);
        createInjector([
            {provide: Presets, useValue: presets, deps: []},
            {provide: PresetHasInOperatorExplorer, useValue: presetExplorer, deps: []},
            {
                provide: InOperatorInteractionExplorer,
                useClass: InOperatorInteractionExplorer,
                deps: [Presets, PresetHasInOperatorExplorer]
            },
        ]);
    });

    it("Returns true when there is a playable preset", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        resolve(Presets)
            .get.and.returnValue([preset]);

        resolve(PresetHasInOperatorExplorer)
            .has.withArgs(name, preset).and.returnValue(true);

        const explorer = resolve(InOperatorInteractionExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no playable preset", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        resolve(Presets)
            .get.and.returnValue([preset]);

        resolve(PresetHasInOperatorExplorer)
            .has.withArgs(name, preset).and.returnValue(false);

        const explorer = resolve(InOperatorInteractionExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(false);
    });
});
