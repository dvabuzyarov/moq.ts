import { IMock } from "./moq";
import { Setup } from "./setup";
import { GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "./expressions";

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
        const actual = setup.execute(() => undefined);

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
        setup.execute(callback);
        const actual = setup.invoke(expression);

        expect(actual).toBe(value);
        expect(callback).toHaveBeenCalledWith(expression);
    });

    it("Returns value from callback for GetPropertyExpression", () => {
        const value = [];
        const callback = jasmine.createSpy("callback").withArgs().and.returnValue(value);
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.callback(callback);
        const actual = setup.invoke(new GetPropertyExpression("propertyName"));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for SetPropertyExpression", () => {
        const value = [];
        const arg = "argument 1";
        const callback = jasmine.createSpy("callback").withArgs(arg).and.returnValue(value);
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.callback(callback);
        const actual = setup.invoke(new SetPropertyExpression("propertyName", arg));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for MethodExpression", () => {
        const value = [];
        const arg1 = "argument 1";
        const arg2 = "argument 2";
        const callback = jasmine.createSpy("callback").withArgs(arg1, arg2).and.returnValue(value);
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.callback(callback);
        const actual = setup.invoke(new MethodExpression([arg1, arg2]));

        expect(actual).toBe(value);
    });

    it("Returns value from callback for NamedMethodExpression", () => {
        const value = [];
        const arg = "argument 1";
        const callback = jasmine.createSpy("callback").withArgs(arg).and.returnValue(value);
        const mock = MockFactory();

        const setup = new Setup(mock);
        setup.callback(callback);
        const actual = setup.invoke(new NamedMethodExpression("propertyName", [arg]));

        expect(actual).toBe(value);
    });
});
