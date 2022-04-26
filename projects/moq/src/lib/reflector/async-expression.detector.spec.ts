import { It } from "./expression-predicates";
import { createInjector, resolve2 } from "../../tests.components/resolve.builder";
import { AsyncExpressionDetector } from "./async-expression.detector";

describe("Async expression detector", () => {

    beforeEach(() => {
        createInjector(AsyncExpressionDetector, []);
    });

    it("Returns false for It.IsAny", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<any>(It.IsAny);

        expect(actual).toBe(false);
    });

    it("Returns false for It.IsAny()", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<any>(It.IsAny());

        expect(actual).toBe(false);
    });

    it("Returns false for property reading", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ prop: number }>(instance => instance.prop);

        expect(actual).toBe(false);
    });

    it("Returns false for property writing", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ prop: number }>(instance => instance.prop = 1);

        expect(actual).toBe(false);
    });

    it("Returns false for method invocation", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ prop: () => number }>(instance => instance.prop());

        expect(actual).toBe(false);
    });

    it("Returns false for function invocation", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<() => number>(instance => instance());

        expect(actual).toBe(false);
    });

    it("Returns false for constructor", () => {
        class Target {
        }

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<typeof Target>(instance => new instance());

        expect(actual).toBe(false);
    });

    it("Returns false for in operator", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ prop: number }>(instance => "prop" in instance);

        expect(actual).toBe(false);
    });

    it("Returns false for sub property reading", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ prop: { prop: number } }>(instance => instance.prop.prop);

        expect(actual).toBe(false);
    });

    it("Returns false for sub method invocation", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ prop: () => { prop: () => number } }>(instance => instance.prop().prop());

        expect(actual).toBe(false);
    });

    it("Returns false for sub function invocation", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<() => () => undefined>(instance => instance()());

        expect(actual).toBe(false);
    });

    it("Returns false for sub in operator", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ prop: { prop: any } }>(instance => "prop" in instance.prop.prop);

        expect(actual).toBe(false);
    });

    it("Returns true for async instance => instance.getAsync()", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ getAsync: () => undefined }>(async instance => instance.getAsync());

        expect(actual).toBe(true);
    });

    it("Returns true for async instance => await instance.getAsync()", async () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ getAsync: () => undefined }>(async instance => await instance.getAsync());

        expect(actual).toBe(true);
    });

    it("Returns expressions for async instance => instance.getAsync().then(value => value + 1)", async () => {

        const detector = resolve2(AsyncExpressionDetector);
        const onfulfilled = value => value + 1;
        const actual = detector.isAsync<{ getAsync: () => Promise<any> }>(async instance => instance.getAsync().then(onfulfilled));

        expect(actual).toBe(true);
    });

    it("Returns true for async instance => await (await instance.getAsyncOfAsync()).getAsync())", async () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ getAsyncOfAsync(): Promise<{ getAsync: () => Promise<any> }> }>(
            async instance => await (await instance.getAsyncOfAsync()).getAsync());

        expect(actual).toBe(true);
    });

    it("Returns true for async instance => (await instance.getAsync()).valueOf()", async () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ getAsync: () => Promise<number> }>(
            async instance => (await instance.getAsync()).valueOf());

        expect(actual).toBe(true);
    });

    it("Returns true for async () => await It.IsAny()", async () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<any>(async () => await It.IsAny());

        expect(actual).toBe(true);
    });

    it("Returns true for async () => It.IsAny()", async () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<any>(async () => It.IsAny());

        expect(actual).toBe(true);
    });

    it("Returns true for async instance => instance.promise", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ promise: any }>(async instance => instance.promise);

        expect(actual).toBe(true);
    });

    it("Returns expressions for async instance => await instance.promise", () => {

        const detector = resolve2(AsyncExpressionDetector);
        const actual = detector.isAsync<{ promise: any }>(async instance => await instance.promise);

        expect(actual).toBe(true);
    });
});
