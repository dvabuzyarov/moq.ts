import { IMock } from "./moq";
import { Setup } from "./setup";

describe("Setup", () => {


    function MockFactory(): IMock<any> {
        return <IMock<any>>(<any>{});
    }

    it("Returns mock object from returns", () => {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.returns([]);


        expect(actual).toBe(mock);
    });

    it("Returns mock object from throws", () => {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.throws([]);


        expect(actual).toBe(mock);
    });

    it("Returns mock object from callback", () => {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.callback(() => undefined);


        expect(actual).toBe(mock);
    });

    it("Returns the current setup object from play function", () => {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.play(() => undefined);


        expect(actual).toBe(setup);
    });

    it("Returns true as playable result when playUntil has not been setup", () => {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.playable();

        expect(actual).toBe(true);
    });

    it("Returns true as playable result when playUntil returns true", () => {
        const callback = jasmine.createSpy("callback").and.returnValue(true);
        const mock = MockFactory();
        const setup = new Setup(mock);
        setup.play(callback);

        const actual = setup.playable();

        expect(actual).toBe(true);
    });

    it("Returns false as playable result when playUntil returns false", () => {
        const callback = jasmine.createSpy("callback").and.returnValue(false);
        const mock = MockFactory();
        const setup = new Setup(mock);
        setup.play(callback);

        const actual = setup.playable();

        expect(actual).toBe(false);
    });

    it("Returns value", () => {
        const value = [];

        const mock = MockFactory();
        const setup = new Setup(mock);
        setup.returns(value);

        const actual = setup.invoke();

        expect(actual).toBe(value);
    });

    it("Throws error", () => {
        const error = new Error("test message");
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.throws(error);


        expect(() => setup.invoke()).toThrow(error);
    });

    it("Returns value from callback", () => {
        const value = [];
        const arg = "argument 1";
        const callback = jasmine.createSpy("callback").and.returnValue(value);
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.callback(callback);
        const actual = setup.invoke([arg]);


        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalledWith(arg);
    });

    it("Returns value from callback without arguments", () => {
        const value = [];
        const callback = jasmine.createSpy("callback").and.returnValue(value);
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.callback(callback);
        const actual = setup.invoke();


        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalledWith();
    });

});
