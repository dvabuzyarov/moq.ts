import { IPresetBuilder, ISequenceVerifier } from "./moq";
import { InterceptorCallbacks, MockBehavior } from "./interceptor-callbacks/interceptor-callbacks";
import { Times } from "./times";
import { nameof } from "../tests.components/nameof";
import * as mockDependencies from "./mock-dependencies.factory";
import { IMockDependencies, mockDependenciesFactory } from "./mock-dependencies.factory";
import { ExpectedExpressionReflector } from "./expected-expressions/expected-expression-reflector";
import { Tracker } from "./tracker";
import { Interceptor } from "./interceptor";
import { Verifier } from "./verifier";
import { Mock } from "./mock";
import { ExpectedExpressions } from "./expected-expressions/expected-expressions";

describe("Mock", () => {

    type ISpyMockDependencies<T> = {
        [P in keyof T]?: jasmine.SpyObj<T[P]>;
    };

    let dependencies: ISpyMockDependencies<IMockDependencies<unknown>>;

    beforeEach(() => {
        const expressionReflector = jasmine.createSpyObj<ExpectedExpressionReflector>(["reflect"]);
        const tracker = jasmine.createSpyObj<Tracker>(["get"]);
        const interceptedCallbacks = jasmine.createSpyObj<InterceptorCallbacks<unknown>>(["setBehaviorStrategy"]);
        const interceptor = jasmine.createSpyObj<Interceptor<unknown>>(["object", "prototypeof"]);
        const setupFactory = jasmine.createSpy();
        const verifier = jasmine.createSpyObj<Verifier<unknown>>(["test"]);

        dependencies = {
            expressionReflector,
            interceptedCallbacks,
            verifier,
            interceptor,
            presetBuilderFactory: setupFactory,
            tracker
        };
        spyOn(mockDependencies, "mockDependenciesFactory").and.returnValue(dependencies as any);
    });

    it("Exposes mock name", () => {
        const name = "mock name";
        const mock = new Mock({name});
        const actual = mock.name;

        expect(actual).toBe(name);
    });

    it("Creates dependencies with mock options", () => {
        const name = "mock name";
        const target = () => undefined;
        const mock = new Mock({name, target});

        expect(mockDependencies.mockDependenciesFactory).toHaveBeenCalledWith({name, target});
    });

    it("Returns object", () => {
        const object = {};
        const {interceptor} = dependencies;
        interceptor.object.and.returnValue(object);

        const mock = new Mock();
        const actual = mock.object();

        expect(actual).toBe(object);
    });

    it("Sets mock behavior strategy", () => {
        const mock = new Mock();
        const actual = mock.setBehaviorStrategy(MockBehavior.Loose);

        const {interceptedCallbacks} = dependencies;
        expect(actual).toBe(mock);
        expect(interceptedCallbacks.setBehaviorStrategy).toHaveBeenCalledWith(MockBehavior.Loose);
    });

    it("Verifies an expression", () => {
        const {tracker, verifier} = dependencies;
        const expressions = [];
        tracker.get.and.returnValue(expressions);

        const mock = new Mock();
        const expression = instance => instance["property"];
        const actual = mock.verify(expression);

        expect(actual).toBe(mock);
        expect(verifier.test).toHaveBeenCalledWith(expression, Times.Once(), expressions, undefined);
    });

    it("Verifies an expression has been invoked provided times", () => {
        const {tracker, verifier} = dependencies;
        const expressions = [];
        tracker.get.and.returnValue(expressions);

        const mock = new Mock();
        const expression = instance => instance["property"];
        const actual = mock.verify(expression, Times.AtLeastOnce());

        expect(actual).toBe(mock);
        expect(verifier.test).toHaveBeenCalledWith(expression, Times.AtLeastOnce(), expressions, undefined);
    });

    it("Setups mock", () => {
        const {expressionReflector, presetBuilderFactory} = dependencies;
        const setup = <IPresetBuilder<any>>{};
        const expression = instance => instance["property"];
        const expectedExpression = {} as ExpectedExpressions<unknown>;
        expressionReflector.reflect.withArgs(expression).and.returnValue(expectedExpression);

        const mock = new Mock();
        (presetBuilderFactory as jasmine.Spy).withArgs(mock, expectedExpression).and.returnValue(setup);

        const actual = mock.setup(expression);

        expect(actual).toBe(setup);
    });

    it("Sets instance of object", () => {
        const {interceptor} = dependencies;
        const prototype = {};

        const mock = new Mock();
        mock.prototypeof(prototype);

        expect(interceptor.prototypeof).toHaveBeenCalledWith(prototype);
    });

    it("Returns the current instance of mock from prototypeof", () => {
        const mock = new Mock();
        const actual = mock.prototypeof();

        expect(actual).toBe(mock);
    });

    it("Adds verified expression into sequence verifier", () => {
        const sequenceVerifier = <ISequenceVerifier>jasmine.createSpyObj("sequence verifier", [
            nameof<ISequenceVerifier>("add")
        ]);
        const expression = instance => instance["property"];

        const mock = new Mock();
        const actual = mock.insequence(sequenceVerifier, expression);

        expect(actual).toBe(mock);
        expect(sequenceVerifier.add).toHaveBeenCalledWith(mock, expression);
    });
});
