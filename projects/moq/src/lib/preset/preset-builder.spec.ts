import { IMock } from "../moq";
import { PresetBuilder } from "./preset-builder";
import { ExpectedExpressions } from "../expected-expressions/expected-expressions";
import { InvocableFactory } from "./invocable.factory";
import { MimicsPreset } from "../presets/mimics.preset";
import { ReturnsPreset } from "../presets/returns.preset";
import { ThrowsPreset } from "../presets/throws.preset";
import { CallbacksPreset } from "../presets/callbacks.preset";

describe("Preset bilder", () => {

    function resolve() {
        const mock = <IMock<any>>{};
        const define = jasmine.createSpy("define");
        const target = <ExpectedExpressions<any>>{};
        const invocableFactory = jasmine.createSpyObj<InvocableFactory>("", ["set", "get"]);
        return {
            mock,
            define,
            target,
            invocableFactory
        };
    }

    function create<T>(options = resolve()): PresetBuilder<T> {
        return new PresetBuilder(
            options.mock,
            options.define,
            options.target,
            options.invocableFactory
        );
    }

    it("Defines a mimics preset", () => {
        const origin = {};
        const invocable = () => true;
        const mocks = resolve();
        const {mock, invocableFactory, define, target} = mocks;
        invocableFactory.get.and.returnValue(invocable);

        const setup = create(mocks);
        const actual = setup.mimics(origin);

        const expected = new MimicsPreset(invocable, target, origin);
        expect(define).toHaveBeenCalledWith(expected);
        expect(actual).toBe(mock);
    });

    it("Defines a returns preset", () => {
        const value = "value";
        const invocable = () => true;
        const mocks = resolve();
        const {mock, target, invocableFactory, define} = mocks;
        invocableFactory.get.and.returnValue(invocable);

        const setup = create(mocks);
        const actual = setup.returns(value);

        const expected = new ReturnsPreset(invocable, target, value);
        expect(define).toHaveBeenCalledWith(expected);
        expect(actual).toBe(mock);
    });

    it("Defines a throws preset", () => {
        const exception = new Error();
        const invocable = () => true;
        const mocks = resolve();
        const {mock, target, invocableFactory, define} = mocks;
        invocableFactory.get.and.returnValue(invocable);

        const setup = create(mocks);
        const actual = setup.throws(exception);

        const expected = new ThrowsPreset(invocable, target, exception);
        expect(define).toHaveBeenCalledWith(expected);
        expect(actual).toBe(mock);
    });

    it("Defines a callbacks preset", () => {
        const callback = () => undefined;
        const invocable = () => true;
        const mocks = resolve();
        const {mock, target, invocableFactory, define} = mocks;
        invocableFactory.get.and.returnValue(invocable);

        const setup = create(mocks);
        const actual = setup.callback(callback);

        const expected = new CallbacksPreset(invocable, target, callback);
        expect(define).toHaveBeenCalledWith(expected);
        expect(actual).toBe(mock);
    });

    it("Sets a predicate on invocableFactory", () => {
        const value = () => undefined;
        const mocks = resolve();
        const {invocableFactory} = mocks;

        const setup = create(mocks);
        const actual = setup.play(value);

        expect(invocableFactory.set).toHaveBeenCalledWith(value);
        expect(actual).toBe(setup);
    });
});
