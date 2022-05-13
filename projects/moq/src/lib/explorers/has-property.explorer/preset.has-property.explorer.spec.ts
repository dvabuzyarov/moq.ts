import { PresetHasPropertyExplorer } from "./preset-has-property.explorer";
import { IPreset } from "../../presets/presets/preset";
import { Expressions } from "../../reflector/expressions";
import { ExpressionHasPropertyExplorer } from "./expression-has-property.explorer";
import { ObjectHasPropertyExplorer } from "./object-has-property.explorer";
import { MimicsPreset } from "../../presets/presets/mimics.preset";
import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { It } from "moq.ts";

describe("Preset has property explorer", () => {

    beforeEach(() => {
        createInjector(PresetHasPropertyExplorer, [ExpressionHasPropertyExplorer, ObjectHasPropertyExplorer]);
    });

    it("Returns true when preset expression has property", () => {
        const name = "name";
        const target = {} as Expressions<unknown>;
        const preset = {target} as IPreset<unknown>;

        resolveMock(ExpressionHasPropertyExplorer)
            .setup(instance => instance.has(name, target))
            .returns(true);
        resolveMock(ObjectHasPropertyExplorer)
            .setup(instance => instance.has(It.IsAny(), It.IsAny()))
            .returns(false);

        const explorer = resolve2(PresetHasPropertyExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns true when mimic preset origin has property", () => {
        const name = "name";
        const target = {};
        const preset = new MimicsPreset(undefined, undefined, target);

        resolveMock(ExpressionHasPropertyExplorer)
            .setup(instance => instance.has(It.IsAny(), It.IsAny()))
            .returns(false);
        resolveMock(ObjectHasPropertyExplorer)
            .setup(instance => instance.has(name, target))
            .returns(true);

        const explorer = resolve2(PresetHasPropertyExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when preset does not have property", () => {
        const name = "name";
        const preset = new MimicsPreset(undefined, undefined, undefined);

        resolveMock(ExpressionHasPropertyExplorer)
            .setup(instance => instance.has(It.IsAny(), It.IsAny()))
            .returns(false);
        resolveMock(ObjectHasPropertyExplorer)
            .setup(instance => instance.has(It.IsAny(), It.IsAny()))
            .returns(false);

        const explorer = resolve2(PresetHasPropertyExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });
});
