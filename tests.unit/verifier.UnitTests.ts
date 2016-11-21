import {Verifier, VerifyError} from '../lib/verifier';
import {ExpectedExpressionReflector} from '../lib/expected-expressions/expected-expression-reflector';
import {Times} from '../lib/times';
import {CallCounter} from '../lib/call-counter';
import {ExpectedGetPropertyExpression} from '../lib/expected-expressions/expected-expressions';
import {VerifyFormatter} from '../lib/formatters/verify-formatter';

describe('Verifier', ()=>{

    function reflectorFactory(): ExpectedExpressionReflector {
        const reflect = jasmine.createSpy('reflect');
        return (<any>{
            reflect: reflect
        }) as ExpectedExpressionReflector;
    }
    function callCounterFactory(): CallCounter {
        const count = jasmine.createSpy('count');
        return (<any>{
            count: count
        }) as CallCounter;
    }

    function verifyFormatterFactory(): VerifyFormatter {
        const formatter = jasmine.createSpy('formatter');
        return (<any>{
            format: formatter
        }) as VerifyFormatter;
    }

    it('Throws VerifyException when the expected expression has not been called expected times',()=>{
        const message = 'message';
        const timesMessage = 'Should be called once';
        const haveBeenCalled = 0;
        const expectedExpression = new ExpectedGetPropertyExpression('property');

        const expected = ()=> {};
        const reflector = reflectorFactory();

        (<jasmine.Spy>reflector.reflect).and.returnValue(expectedExpression);
        const callCounter = callCounterFactory();
        (<jasmine.Spy>callCounter.count).and.returnValue(haveBeenCalled);

        const verifyFormatter = verifyFormatterFactory();
        (<jasmine.Spy>verifyFormatter.format).and.returnValue(message);

        const evaluator = value => value === 1;
        const times = new Times(evaluator, timesMessage);

        const verify = new Verifier(reflector, callCounter, verifyFormatter);
        const action = () => verify.test(expected, times, []);

        expect(action).toThrow(new VerifyError(message));
        expect(reflector.reflect).toHaveBeenCalledWith(expected);
        expect(callCounter.count).toHaveBeenCalledWith(expectedExpression, []);
        expect(verifyFormatter.format).toHaveBeenCalledWith(expectedExpression, timesMessage, haveBeenCalled);
    });

    it('Does not throws VerifyException when the expected expression has been called expected times',()=>{
        const message = 'message';

        const expected = ()=> {};
        const reflector = reflectorFactory();
        const expectedExpression = new ExpectedGetPropertyExpression('property');
        (<jasmine.Spy>reflector.reflect).and.returnValue(expectedExpression);

        const callCounter = callCounterFactory();
        (<jasmine.Spy>callCounter.count).and.returnValue(1);

        const evaluator = value => value === 1;
        const times = new Times(evaluator, message);

        const verify = new Verifier(reflector, callCounter, undefined);
        const action = () => verify.test(expected, times, []);

        expect(action).not.toThrow(new VerifyError(message));
        expect(reflector.reflect).toHaveBeenCalledWith(expected);
        expect(callCounter.count).toHaveBeenCalledWith(expectedExpression, []);
    });
});