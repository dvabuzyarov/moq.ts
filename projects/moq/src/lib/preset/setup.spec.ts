import { IMock } from "../moq";
import { Setup } from "./setup";
import { GetPropertyExpression } from "../expressions";

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

    it("Returns mock object from execute", () => {
        const mock = MockFactory();

        const setup = new Setup(mock);
        const actual = setup.replicates(() => undefined);

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

        const actual = setup.invoke(new GetPropertyExpression("propertyName"));

        expect(actual).toBe(value);
    });

    it("Throws error", () => {
        const error = new Error("test message");
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.throws(error);

        expect(() => setup.invoke(new GetPropertyExpression("propertyName"))).toThrow(error);
    });

    it("Returns value from execute", () => {
        const value = [];
        const expression = new GetPropertyExpression("propertyName");
        const callback = jasmine.createSpy("callback").and.returnValue(value);

        const mock = MockFactory();
        const setup = new Setup(mock);
        setup.replicates(callback);
        const actual = setup.invoke(expression);

        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalledWith(expression);
    });

    it("Throws an exception from execute", () => {
        const expression = new GetPropertyExpression("propertyName");
        const error = new Error("test message");

        const callback = jasmine.createSpy("callback").withArgs(expression).and.callFake(() => {
            throw error;
        });
        const mock = MockFactory();
        const setup = new Setup(mock);

        setup.replicates(callback);
        expect(() => setup.invoke(expression)).toThrow(error);
    });

    it("Returns value from callback", () => {
        const value = [];
        const expression = new GetPropertyExpression("propertyName");
        const callback = jasmine.createSpy("callback");
        const adapter = jasmine.createSpy("adapter").withArgs(expression, callback).and.returnValue(value);

        const mock = MockFactory();
        const setup = new Setup(mock, adapter);
        setup.callback(callback);
        const actual = setup.invoke(expression);

        expect(actual).toBe(value);
    });

    it("Throws an exception from callback", () => {
        const expression = new GetPropertyExpression("propertyName");
        const error = new Error("test message");
        const callback = jasmine.createSpy("callback");
        const adapter = jasmine.createSpy("adapter").withArgs(expression, callback).and.callFake(() => {
            throw error;
        });
        const mock = MockFactory();
        const setup = new Setup(mock, adapter);

        setup.callback(callback);
        expect(() => setup.invoke(expression)).toThrow(error);
    });
});
