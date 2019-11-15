import { IPresetBuilder, ISequenceVerifier } from "./moq";
import { Times } from "./times";
import { nameof } from "../tests.components/nameof";
import * as mockDependencies from "./mock-dependencies.factory";
import { IMockDependencies, mockDependenciesFactory } from "./mock-dependencies.factory";
import * as buildMockOptions from "./build-mock-options";
import { ExpectedExpressionReflector } from "./expected-expressions/expected-expression-reflector";
import { Tracker } from "./tracker";
import { Interceptor } from "./interceptor";
import { Verifier } from "./verifier";
import { Mock } from "./mock";
import { ExpectedExpressions } from "./expected-expressions/expected-expressions";
import { PrototypeStorage } from "./traps/prototype.storage";

describe("Mock", () => {

    type ISpyMockDependencies<T> = {
        [P in keyof T]?: jasmine.SpyObj<T[P]>;
    };

    let dependencies: ISpyMockDependencies<IMockDependencies<unknown>>;

    beforeEach(() => {
        const expressionReflector = jasmine.createSpyObj<ExpectedExpressionReflector>(["reflect"]);
        const tracker = jasmine.createSpyObj<Tracker>(["get"]);
        const interceptor = jasmine.createSpyObj<Interceptor<unknown>>(["object"]);
        const setupFactory = jasmine.createSpy();
        const verifier = jasmine.createSpyObj<Verifier<unknown>>(["test"]);
        const prototypeStorage = jasmine.createSpyObj<PrototypeStorage>("", ["set"]);

        dependencies = {
            expressionReflector,
            verifier,
            interceptor,
            presetBuilderFactory: setupFactory,
            tracker,
            prototypeStorage
        };

        spyOn(mockDependencies, "mockDependenciesFactory").and.returnValue(dependencies as any);
        spyOn(buildMockOptions, "buildMockOptions").and.returnValue({});
    });

    it("Exposes mock name", () => {
        const name = "mock name";
        const options = {name};

        (buildMockOptions.buildMockOptions as jasmine.Spy)
            .withArgs(options).and.returnValue(options);

        const mock = new Mock(options);
        const actual = mock.name;

        expect(actual).toBe(name);
    });

    it("Creates dependencies with mock options", () => {
        const name = "mock name";
        const target = () => undefined;
        const input = {name};
        const options = {name, target};

        (buildMockOptions.buildMockOptions as jasmine.Spy)
            .withArgs(input).and.returnValue(options);

        const mock = new Mock(input);

        expect(mockDependencies.mockDependenciesFactory).toHaveBeenCalledWith(options);
    });

    it("Returns object", () => {
        const object = {};
        const {interceptor} = dependencies;
        interceptor.object.and.returnValue(object);

        const mock = new Mock();
        const actual = mock.object();

        expect(actual).toBe(object);
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

    it("Sets prototype of mock", () => {
        const {prototypeStorage} = dependencies;
        const prototype = {};

        const mock = new Mock();
        mock.prototypeof(prototype);

        expect(prototypeStorage.set).toHaveBeenCalledWith(prototype);
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
