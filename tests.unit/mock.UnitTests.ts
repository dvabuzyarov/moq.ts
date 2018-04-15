import {ExpectedExpressionReflector} from '../lib/expected-expressions/expected-expression-reflector';
import {MockCore} from '../lib/mock';
import {Tracker} from '../lib/tracker';
import {getName} from './getName';
import {DefinedSetups} from '../lib/defined-setups';
import {Verifier} from '../lib/verifier';
import {Interceptor} from '../lib/interceptor';
import { IMock, ISequenceVerifier, ISetup, ISetupInvoke } from "../lib/moq";
import {IInterceptorCallbacks, MockBehavior} from '../lib/interceptor-callbacks/interceptor-callbacks';
import {Times} from '../lib/times';

describe('MockCore', () => {

    let reflector: ExpectedExpressionReflector;
    let interceptor: Interceptor<any>;
    let definedSetups: DefinedSetups<any>;
    let tracker: Tracker;
    let verifier: Verifier<any>;
    let callbacks: IInterceptorCallbacks;
    let setupFactory: (mock: IMock<any>) => ISetupInvoke<any>;

    function trackerFactory(): Tracker {
        return <Tracker>jasmine.createSpyObj('tracker', [
            getName<Tracker>(instance => instance.add),
            getName<Tracker>(instance => instance.get)
        ]);
    }

    function definedSetupsFactory(): DefinedSetups<any> {
        return <DefinedSetups<any>>jasmine.createSpyObj('definedSetups', [
            getName<DefinedSetups<any>>(instance => instance.add),
            getName<DefinedSetups<any>>(instance => instance.get),
            getName<DefinedSetups<any>>(instance => instance.hasNamedMethod)
        ]);
    }

    function verifierFactory(): Verifier<any> {
        return <Verifier<any>>jasmine.createSpyObj('verifier', [
            getName<Verifier<any>>(instance => instance.test),
        ]);
    }

    function interceptorCallbacksFactory(): IInterceptorCallbacks {
        return <IInterceptorCallbacks>jasmine.createSpyObj('interceptor callbacks', [
            getName<IInterceptorCallbacks>(instance => instance.intercepted),
            getName<IInterceptorCallbacks>(instance => instance.hasNamedMethod),
            getName<IInterceptorCallbacks>(instance => instance.setBehaviorStrategy)
        ]);
    }

    function reflectorFactory(): ExpectedExpressionReflector {
        return <ExpectedExpressionReflector>jasmine.createSpyObj('expectedExpressionReflector', [
            getName<ExpectedExpressionReflector>(instance => instance.reflect),
        ]);
    }

    function interceptorFactory(): Interceptor<any> {
        return <Interceptor<any>>(<any>jasmine.createSpyObj('interceptor', [
            getName<Interceptor<any>>(instance => instance.object),
            getName<Interceptor<any>>(instance => instance.prototypeof),
        ]));
    }

    function MockCoreFactory(): MockCore<any> {
        const interceptorFactory = () => interceptor;

        return new MockCore(
            reflector,
            interceptorFactory,
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
        setupFactory = jasmine.createSpy('setup factory');
    });

    it('Returns object', () => {
        const object = {};
        (<jasmine.Spy>interceptor.object).and.returnValue(object);

        const mock = MockCoreFactory();
        const actual = mock.object();

        expect(actual).toBe(object);
    });

    it('Sets mock behavior strategy', () => {
        const mock = MockCoreFactory();
        const actual = mock.setBehaviorStrategy(MockBehavior.Loose);

        expect(actual).toBe(mock);
        expect(callbacks.setBehaviorStrategy).toHaveBeenCalledWith(MockBehavior.Loose);
    });

    it('Verifies an expression', () => {

        const expressions = [];
        (<jasmine.Spy>tracker.get).and.returnValue(expressions);

        const mock = MockCoreFactory();
        const expression = instance => instance['property'];
        const actual = mock.verify(expression);

        expect(actual).toBe(mock);
        expect(verifier.test).toHaveBeenCalledWith(expression, Times.Once(), expressions, undefined);
    });

    it('Verifies an expression has been invoked provided times', () => {

        const expressions = [];
        (<jasmine.Spy>tracker.get).and.returnValue(expressions);

        const mock = MockCoreFactory();
        const expression = instance => instance['property'];
        const actual = mock.verify(expression, Times.AtLeastOnce());

        expect(actual).toBe(mock);
        expect(verifier.test).toHaveBeenCalledWith(expression, Times.AtLeastOnce(), expressions, undefined);
    });

    it('Setups mock', () => {

        const setup = <ISetup<any>>{};
        const expression = instance => instance['property'];
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

    it('Sets instance of object', () => {
        const prototype = {};

        const mock = MockCoreFactory();
        mock.prototypeof(prototype);

        expect(interceptor.prototypeof).toHaveBeenCalledWith(prototype);
    });

    it('Returns the current instance of mock from prototypeof', () => {
        const prototype = {};
        (<jasmine.Spy>interceptor.prototypeof).and.returnValue(prototype);

        const mock = MockCoreFactory();
        const actual = mock.prototypeof();

        expect(actual).toBe(mock);
        expect(interceptor.prototypeof).toHaveBeenCalledWith(undefined);
    });

    it('Adds verified expression into sequence verifier', () => {
        const sequenceVerifier = <ISequenceVerifier>jasmine.createSpyObj('sequence verifier', [
            getName<ISequenceVerifier>(instance => instance.add)
        ]);
        const expression = instance => instance['property'];

        const mock = MockCoreFactory();
        const actual = mock.insequence(sequenceVerifier, expression);

        expect(actual).toBe(mock);
        expect(sequenceVerifier.add).toHaveBeenCalledWith(mock, expression);
    });
});
