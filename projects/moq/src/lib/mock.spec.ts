import { ExpectedExpressionReflector } from "./expected-expressions/expected-expression-reflector";
import { MockCore } from "./mock";
import { Tracker } from "./tracker";
import { Preset } from "./preset/preset";
import { Verifier } from "./verifier";
import { Interceptor } from "./interceptor";
import { IMock, ISequenceVerifier, ISetup, ISetupInvocation } from "./moq";
import { IInterceptorCallbacks, MockBehavior } from "./interceptor-callbacks/interceptor-callbacks";
import { Times } from "./times";
import { nameof } from "./nameof";

describe("MockCore", () => {

    let reflector: ExpectedExpressionReflector;
    let interceptor: Interceptor<any>;
    let definedSetups: Preset<any>;
    let tracker: Tracker;
    let verifier: Verifier<any>;
    let callbacks: IInterceptorCallbacks;
    let setupFactory: (mock: IMock<any>) => ISetupInvocation<any>;

    function trackerFactory(): Tracker {
        return <Tracker>jasmine.createSpyObj("tracker", [
            nameof<Tracker>("add"),
            nameof<Tracker>("get")
        ]);
    }

    function definedSetupsFactory(): Preset<any> {
        return <Preset<any>>jasmine.createSpyObj("definedSetups", [
            nameof<Preset<any>>("add"),
            nameof<Preset<any>>("get"),
            nameof<Preset<any>>("hasNamedMethod")
        ]);
    }

    function verifierFactory(): Verifier<any> {
        return <Verifier<any>>jasmine.createSpyObj("verifier", [
            nameof<Verifier<any>>("test"),
        ]);
    }

    function interceptorCallbacksFactory(): IInterceptorCallbacks {
        return <IInterceptorCallbacks>jasmine.createSpyObj("interceptor callbacks", [
            nameof<IInterceptorCallbacks>("intercepted"),
            nameof<IInterceptorCallbacks>("hasNamedMethod"),
            nameof<IInterceptorCallbacks>("setBehaviorStrategy")
        ]);
    }

    function reflectorFactory(): ExpectedExpressionReflector {
        return <ExpectedExpressionReflector>jasmine.createSpyObj("expectedExpressionReflector", [
            nameof<ExpectedExpressionReflector>("reflect"),
        ]);
    }

    function interceptorFactory(): Interceptor<any> {
        return <Interceptor<any>>(<any>jasmine.createSpyObj("interceptor", [
            nameof<Interceptor<any>>("object"),
            nameof<Interceptor<any>>("prototypeof"),
        ]));
    }

    function MockCoreFactory(): MockCore<any> {
        return new MockCore(
            reflector,
            () => interceptor,
            setupFactory,
            definedSetups,
            tracker,
            verifier,
            callbacks);
    }

    beforeEach(() => {
        reflector = reflectorFactory();
        interceptor = interceptorFactory();
        definedSetups = definedSetupsFactory();
        tracker = trackerFactory();
        verifier = verifierFactory();
        callbacks = interceptorCallbacksFactory();
        setupFactory = jasmine.createSpy("setup factory");
    });

    it("Returns object", () => {
        const object = {};
        (<jasmine.Spy>interceptor.object).and.returnValue(object);

        const mock = MockCoreFactory();
        const actual = mock.object();

        expect(actual).toBe(object);
    });

    it("Sets mock behavior strategy", () => {
        const mock = MockCoreFactory();
        const actual = mock.setBehaviorStrategy(MockBehavior.Loose);

        expect(actual).toBe(mock);
        expect(callbacks.setBehaviorStrategy).toHaveBeenCalledWith(MockBehavior.Loose);
    });

    it("Verifies an expression", () => {

        const expressions = [];
        (<jasmine.Spy>tracker.get).and.returnValue(expressions);

        const mock = MockCoreFactory();
        const expression = instance => instance["property"];
        const actual = mock.verify(expression);

        expect(actual).toBe(mock);
        expect(verifier.test).toHaveBeenCalledWith(expression, Times.Once(), expressions, undefined);
    });

    it("Verifies an expression has been invoked provided times", () => {

        const expressions = [];
        (<jasmine.Spy>tracker.get).and.returnValue(expressions);

        const mock = MockCoreFactory();
        const expression = instance => instance["property"];
        const actual = mock.verify(expression, Times.AtLeastOnce());

        expect(actual).toBe(mock);
        expect(verifier.test).toHaveBeenCalledWith(expression, Times.AtLeastOnce(), expressions, undefined);
    });

    it("Setups mock", () => {

        const setup = <ISetup<any>>{};
        const expression = instance => instance["property"];
        const expectedExpression = {};
        (<jasmine.Spy>reflector.reflect).and.returnValue(expectedExpression);
        (<jasmine.Spy>setupFactory).and.returnValue(setup);

        const mock = MockCoreFactory();
        const actual = mock.setup(expression);

        expect(actual).toBe(setup);
        expect(setupFactory).toHaveBeenCalledWith(mock);
        expect(reflector.reflect).toHaveBeenCalledWith(expression);
        expect(definedSetups.add).toHaveBeenCalledWith(expectedExpression, setup);
    });

    it("Sets instance of object", () => {
        const prototype = {};

        const mock = MockCoreFactory();
        mock.prototypeof(prototype);

        expect(interceptor.prototypeof).toHaveBeenCalledWith(prototype);
    });

    it("Returns the current instance of mock from prototypeof", () => {
        const prototype = {};
        (<jasmine.Spy>interceptor.prototypeof).and.returnValue(prototype);

        const mock = MockCoreFactory();
        const actual = mock.prototypeof();

        expect(actual).toBe(mock);
        expect(interceptor.prototypeof).toHaveBeenCalledWith(undefined);
    });

    it("Adds verified expression into sequence verifier", () => {
        const sequenceVerifier = <ISequenceVerifier>jasmine.createSpyObj("sequence verifier", [
            nameof<ISequenceVerifier>("add")
        ]);
        const expression = instance => instance["property"];

        const mock = MockCoreFactory();
        const actual = mock.insequence(sequenceVerifier, expression);

        expect(actual).toBe(mock);
        expect(sequenceVerifier.add).toHaveBeenCalledWith(mock, expression);
    });
});
