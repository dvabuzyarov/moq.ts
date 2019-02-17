import { GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";
import { ReplicatesPresetPlayer } from "./replicates-preset.player";

describe("Replicates preset player", () => {

    it("Plays property read interaction", () => {
        const propertyName = "property_name";
        const value = "value";

        const target = {};
        target[propertyName] = value;

        const player = new ReplicatesPresetPlayer();
        const actual = player.play(target, new GetPropertyExpression(propertyName));

        expect(actual).toBe(value);
    });

    it("Plays property write interaction", () => {
        const propertyName = "property_name";
        const value = "value";

        const target = {};

        const player = new ReplicatesPresetPlayer();
        const actual = player.play(target, new SetPropertyExpression(propertyName, value));

        expect(actual).toBe(true);
        expect(target[propertyName]).toBe(value);
    });

    it("Plays instance method invoke", () => {
        const propertyName = "property_name";
        const arg = "value";
        const result = "result";

        const target = jasmine.createSpy();
        const method = jasmine.createSpy();
        target[propertyName] = method;

        const reflectApply = jasmine.createSpy();
        reflectApply.withArgs(method, target, [arg]).and.returnValue(result);

        const player = new ReplicatesPresetPlayer(reflectApply);
        const actual = player.play(target, new NamedMethodExpression(propertyName, [arg]));

        expect(actual).toBe(result);
    });

    it("Plays method invoke", () => {
        const arg = "value";
        const result = "result";

        const target = jasmine.createSpy();

        const reflectApply = jasmine.createSpy();
        reflectApply.withArgs(target, undefined, [arg]).and.returnValue(result);

        const player = new ReplicatesPresetPlayer(reflectApply);
        const actual = player.play(target, new MethodExpression([arg]));

        expect(actual).toBe(result);
    });
});
