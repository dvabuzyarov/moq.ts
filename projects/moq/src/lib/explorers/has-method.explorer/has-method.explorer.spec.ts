import { HasMethodExplorer } from "./has-method.explorer";
import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { IPreset } from "../../presets/presets/preset";
import { Presets } from "../../presets/presets";
import { createInjector, resolve } from "../../../tests.components/resolve.builder";
import { MembersMethodExplorer } from "../members.explorer/members-method.explorer";

describe("Has instance method explorer", () => {

    beforeEach(() => {
        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        const presetExplorer = jasmine.createSpyObj<PresetHasMethodExplorer>("", ["has"]);
        const membersExplorer = jasmine.createSpyObj<MembersMethodExplorer>("", ["hasMethod"]);
        createInjector([
            {
                provide: HasMethodExplorer,
                useClass: HasMethodExplorer,
                deps: [Presets, MembersMethodExplorer, PresetHasMethodExplorer]
            },
            {provide: Presets, useValue: presets, deps: []},
            {provide: PresetHasMethodExplorer, useValue: presetExplorer, deps: []},
            {provide: MembersMethodExplorer, useValue: membersExplorer, deps: []},
        ]);
    });

    it("Returns true when there is a member", () => {
        const name = "name";

        resolve(MembersMethodExplorer)
            .hasMethod.withArgs(name).and.returnValue(true);

        const explorer = resolve(HasMethodExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns true when there is an instance method", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};
        resolve(MembersMethodExplorer)
            .hasMethod.and.returnValue(false);

        resolve(Presets)
            .get.and.returnValue([preset]);

        resolve(PresetHasMethodExplorer)
            .has.withArgs(name, preset).and.returnValue(true);

        const explorer = resolve(HasMethodExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no instance method", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};

        resolve(MembersMethodExplorer)
            .hasMethod.and.returnValue(false);

        resolve(Presets)
            .get.and.returnValue([preset]);

        resolve(PresetHasMethodExplorer)
            .has.withArgs(name, preset).and.returnValue(false);

        const explorer = resolve(HasMethodExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(false);
    });
});
