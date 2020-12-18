import { HasPropertyExplorer } from "./has-property.explorer";
import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { IPreset } from "../../presets/presets/preset";
import { Presets } from "../../presets/presets";
import { createInjector2, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { MembersPropertyExplorer } from "../members.explorer/members-property.explorer";

describe("Has property explorer", () => {
    beforeEach(() => {
        createInjector2(HasPropertyExplorer, [Presets, MembersPropertyExplorer, PresetHasPropertyExplorer]);
    });

    it("Returns true when there is a member", () => {
        const name = "name";

        resolveMock(MembersPropertyExplorer)
            .setup(instance => instance.hasProperty(name))
            .returns(true);

        const explorer = resolve2(HasPropertyExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns true when there is a property", () => {
        const name = "name";
        const preset = {} as IPreset<unknown>;

        resolveMock(MembersPropertyExplorer)
            .setup(instance => instance.hasProperty(name))
            .returns(false);
        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);
        resolveMock(PresetHasPropertyExplorer)
            .setup(instance => instance.has(name, preset))
            .returns(true);

        const explorer = resolve2(HasPropertyExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no property", () => {
        const name = "name";
        const preset = {} as IPreset<unknown>;

        resolveMock(MembersPropertyExplorer)
            .setup(instance => instance.hasProperty(name))
            .returns(false);
        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);
        resolveMock(PresetHasPropertyExplorer)
            .setup(instance => instance.has(name, preset))
            .returns(false);

        const explorer = resolve2(HasPropertyExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(false);
    });
});
