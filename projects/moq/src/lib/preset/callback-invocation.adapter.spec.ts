import { GetPropertyExpression, MethodExpression, NamedMethodExpression, SetPropertyExpression } from "../expressions";
import { callbackInvocationAdapter } from "./callback-invocation.adapter";

describe("Callback invocation adapter", () => {

    it("Returns value from callback for GetPropertyExpression", () => {
        const value = [];
        const callback = jasmine.createSpy("callback").withArgs().and.returnValue(value);
        const actual = callbackInvocationAdapter(new GetPropertyExpression("propertyName"), callback);

        expect(actual).toBe(value);
    });

    it("Returns value from callback for SetPropertyExpression", () => {
        const value = [];
        const arg = "argument 1";
        const callback = jasmine.createSpy("callback").withArgs(arg).and.returnValue(value);
        const actual = callbackInvocationAdapter(new SetPropertyExpression("propertyName", arg), callback);

        expect(actual).toBe(value);
    });

    it("Returns value from callback for MethodExpression", () => {
        const value = [];
        const arg1 = "argument 1";
        const arg2 = "argument 2";
        const callback = jasmine.createSpy("callback").withArgs(arg1, arg2).and.returnValue(value);
        const actual = callbackInvocationAdapter(new MethodExpression([arg1, arg2]), callback);

        expect(actual).toBe(value);
    });

    it("Returns value from callback for NamedMethodExpression", () => {
        const value = [];
        const arg = "argument 1";
        const callback = jasmine.createSpy("callback").withArgs(arg).and.returnValue(value);

        const actual = callbackInvocationAdapter(new NamedMethodExpression("propertyName", [arg]), callback);

        expect(actual).toBe(value);
    });
});
