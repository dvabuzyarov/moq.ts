import { HasMethodExplorer } from "./has-method.explorer";
import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { IPreset } from "../../presets/presets/preset";
import { Presets } from "../../presets/presets";
import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { MembersMethodExplorer } from "../members.explorer/members-method.explorer";

describe("Has instance method explorer", () => {

    beforeEach(() => {
        createInjector(HasMethodExplorer, [Presets, MembersMethodExplorer, PresetHasMethodExplorer]);
    });

    it("Returns true when there is a member", () => {
        const name = "name";

        resolveMock(MembersMethodExplorer)
            .setup(instance => instance.hasMethod(name))
            .returns(true);

        const explorer = resolve2(HasMethodExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns true when there is an instance method", () => {
        const name = "name";
        const preset = {} as IPreset<unknown>;
        resolveMock(MembersMethodExplorer)
            .setup(instance => instance.hasMethod(name))
            .returns(false);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        resolveMock(PresetHasMethodExplorer)
            .setup(instance => instance.has(name, preset))
            .returns(true);

        const explorer = resolve2(HasMethodExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(true);
    });

    it("Returns false when there is no instance method", () => {
        const name = "name";
        const preset = {} as IPreset<unknown>;

        resolveMock(MembersMethodExplorer)
            .setup(instance => instance.hasMethod(name))
            .returns(false);

        resolveMock(Presets)
            .setup(instance => instance.get())
            .returns([preset]);

        resolveMock(PresetHasMethodExplorer)
            .setup(instance => instance.has(name, preset))
            .returns(false);

        const explorer = resolve2(HasMethodExplorer);
        const actual = explorer.has(name);

        expect(actual).toBe(false);
    });
});
