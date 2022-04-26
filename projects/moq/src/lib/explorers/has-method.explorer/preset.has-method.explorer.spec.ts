import { PresetHasMethodExplorer } from "./preset.has-method.explorer";
import { IPreset } from "../../presets/presets/preset";
import { Expressions } from "../../reflector/expressions";
import { ExpressionHasMethodExplorer } from "./expression.has-method.explorer";
import { ObjectHasMethodExplorer } from "./object.has-method.explorer";
import { MimicsPreset } from "../../presets/presets/mimics.preset";
import { createInjector, resolve2, resolveMock } from "../../../tests.components/resolve.builder";
import { It } from "moq.ts";

describe("Preset has instance method explorer", () => {

    beforeEach(() => {
        createInjector(PresetHasMethodExplorer, [ExpressionHasMethodExplorer, ObjectHasMethodExplorer]);
    });

    it("Returns true when preset expression has instance method", () => {
        const name = "name";
        const target = {} as Expressions<unknown>;
        const preset = {target} as IPreset<unknown>;

        resolveMock(ExpressionHasMethodExplorer)
            .setup(instance => instance.has(name, target))
            .returns(true);
        resolveMock(ObjectHasMethodExplorer)
            .setup(instance => instance.has(It.IsAny(), It.IsAny()))
            .returns(false);

        const explorer = resolve2(PresetHasMethodExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns true when mimic preset origin has instance method", () => {
        const name = "name";
        const target = {};
        const preset = new MimicsPreset(undefined, undefined, target);

        resolveMock(ExpressionHasMethodExplorer)
            .setup(instance => instance.has(It.IsAny(), It.IsAny()))
            .returns(false);
        resolveMock(ObjectHasMethodExplorer)
            .setup(instance => instance.has(name, target))
            .returns(true);

        const explorer = resolve2(PresetHasMethodExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(true);
    });

    it("Returns false when preset does not have instance method", () => {
        const name = "name";
        const preset = new MimicsPreset(undefined, undefined, undefined);

        resolveMock(ExpressionHasMethodExplorer)
            .setup(instance => instance.has(It.IsAny(), It.IsAny()))
            .returns(false);
        resolveMock(ObjectHasMethodExplorer)
            .setup(instance => instance.has(It.IsAny(), It.IsAny()))
            .returns(false);

        const explorer = resolve2(PresetHasMethodExplorer);
        const actual = explorer.has(name, preset);

        expect(actual).toBe(false);
    });
});
