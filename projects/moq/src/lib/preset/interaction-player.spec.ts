import { GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";
import { InteractionPlayer } from "./interaction-player";

describe("Interaction player", () => {

    it("Plays property read interaction", () => {
        const propertyName = "property_name";
        const value = "value";

        const target = {};
        target[propertyName] = value;

        const player = new InteractionPlayer();
        const actual = player.play(new GetPropertyExpression(propertyName), target);

        expect(actual).toBe(value);
    });

    it("Plays property write interaction", () => {
        const propertyName = "property_name";
        const value = "value";

        const target = {};

        const player = new InteractionPlayer();
        const actual = player.play(new SetPropertyExpression(propertyName, value), target);

        expect(actual).toBe(value);
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

        const player = new InteractionPlayer(reflectApply);
        const actual = player.play(new NamedMethodExpression(propertyName, [arg]), target);

        expect(actual).toBe(result);
    });

    it("Plays method invoke", () => {
        const arg = "value";
        const result = "result";

        const target = jasmine.createSpy();

        const reflectApply = jasmine.createSpy();
        reflectApply.withArgs(target, undefined, [arg]).and.returnValue(result);

        const player = new InteractionPlayer(reflectApply);
        const actual = player.play(new MethodExpression([arg]), target);

        expect(actual).toBe(result);
    });
});
