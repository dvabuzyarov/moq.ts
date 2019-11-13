import { HasMethodExplorer } from "./has-method.explorer";
import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { IPreset } from "../../presets/preset";
import { Presets } from "../../preset/presets";
import { resolveBuilder } from "../../../tests.components/resolve.builder";
import { MembersExplorer } from "../members.explorer/members.explorer";

describe("Has instance method explorer", () => {
    let resolve: ReturnType<typeof resolveBuilder>;

    beforeEach(() => {
        const presets = jasmine.createSpyObj<Presets<unknown>>(["get"]);
        const presetExplorer = jasmine.createSpyObj<PresetHasMethodExplorer>("", ["has"]);
        const membersExplorer = jasmine.createSpyObj<MembersExplorer>("", ["hasMethod"]);
        resolve = resolveBuilder([
            [Presets, presets],
            [PresetHasMethodExplorer, presetExplorer],
            [MembersExplorer, membersExplorer],
            [HasMethodExplorer, new HasMethodExplorer(presets, membersExplorer, presetExplorer)]
        ]);
    });

    it("Returns true when there is a member", () => {
        const name = "name";

        resolve(MembersExplorer)
            .hasMethod.withArgs(name).and.returnValue(true);

        const explorer = resolve(HasMethodExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns true when there is an instance method", () => {
        const name = "name";
        const preset = <IPreset<unknown>>{};
        resolve(MembersExplorer)
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

        resolve(MembersExplorer)
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
