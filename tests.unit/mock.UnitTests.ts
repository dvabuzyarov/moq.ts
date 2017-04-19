import {ExpectedExpressionReflector} from '../lib/expected-expressions/expected-expression-reflector';
import {MockCore} from '../lib/mock';
import {Tracker} from '../lib/tracker';
import {getName} from './getName';
import {DefinedSetups} from '../lib/defined-setups';
import {Verifier} from '../lib/verifier';
import {Interceptor} from '../lib/interceptor';
import {IMock} from '../lib/moq';
import {IInterceptorCallbacks} from '../lib/interceptor-callbacks/interceptor-callbacks';

describe('MockCore', ()=>{

    let reflector: ExpectedExpressionReflector;
    let interceptor: Interceptor<any>;
    let definedSetups: DefinedSetups<any>;
    let tracker: Tracker;
    let verifier: Verifier<any>;
    let callbacks: IInterceptorCallbacks;

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
            getName<Interceptor<any>>(instance => instance.object)
        ]));
    }

    function MockCoreFactory(): MockCore<any> {
        const setupFactory = (mock: IMock<any>) => undefined;
        const interceptorFactory = (_callbacks: IInterceptorCallbacks)=> {
            callbacks = _callbacks;
            return interceptor;
        };
        return new MockCore(
            reflector,
            interceptorFactory,
            setupFactory,
            definedSetups,
            tracker,
            verifier,
            callbacks);
    }

    beforeEach(()=>{
        reflector = reflectorFactory();
        interceptor = interceptorFactory();
        definedSetups = definedSetupsFactory();
        tracker = trackerFactory();
        verifier = verifierFactory();
    });

    it('Returns object',()=>{
        const object = {};
        (<jasmine.Spy>interceptor.object).and.returnValue(object);

        const mock = MockCoreFactory();
        const actual = mock.object();

        expect(actual).toBe(object);
    });
});