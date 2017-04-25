import {Verifier, VerifyError} from '../lib/verifier';
import {ExpectedExpressionReflector} from '../lib/expected-expressions/expected-expression-reflector';
import {Times} from '../lib/times';
import {CallCounter} from '../lib/call-counter';
import {ExpectedGetPropertyExpression} from '../lib/expected-expressions/expected-expressions';
import {VerifyFormatter} from '../lib/formatters/verify-formatter';
import {getName} from './getName';

describe('Verifier', ()=>{

    function reflectorFactory(): ExpectedExpressionReflector {
        return jasmine.createSpyObj('reflect', [getName<ExpectedExpressionReflector>(instance => instance.reflect)]);
    }
    function callCounterFactory(): CallCounter {
        return jasmine.createSpyObj('count', [getName<CallCounter>(instance => instance.count)]);
    }

    function verifyFormatterFactory(): VerifyFormatter {
        return jasmine.createSpyObj('formatter', [getName<VerifyFormatter>(instance => instance.format)]);
    }

    it('Throws VerifyException when the expected expression has not been called expected times',()=>{
        const mockName = 'mock name';
        const message = 'message';
        const timesMessage = 'Should be called once';
        const haveBeenCalled = 0;
        const expressions = [];

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
        const action = () => verify.test(expected, times, expressions, mockName);

        expect(action).toThrow(new VerifyError(message));
        expect(reflector.reflect).toHaveBeenCalledWith(expected);
        expect(callCounter.count).toHaveBeenCalledWith(expectedExpression, expressions);
        expect(verifyFormatter.format).toHaveBeenCalledWith(expectedExpression, timesMessage, haveBeenCalled, expressions, mockName);
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