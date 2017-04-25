import {GetPropertyExpression} from '../../lib/expressions';
import {VerifyFormatter} from '../../lib/formatters/verify-formatter';
import {getName} from '../getName';
import {ExpectedExpressionFormatter} from '../../lib/formatters/expected-expression-formatter';
import {TrackedExpressionsFormatter} from '../../lib/formatters/tracked-expressions-formatter';

describe('Verify message formatter', () => {
    function expectedExpressionFormatterFactory(): ExpectedExpressionFormatter {
        return jasmine.createSpyObj('expected expression formatter', [getName<ExpectedExpressionFormatter>(instance => instance.format)]);
    }
    function trackedExpressionsFormatterFactory(): TrackedExpressionsFormatter {
        return jasmine.createSpyObj('tracked expressions formatter', [getName<TrackedExpressionsFormatter>(instance => instance.format)]);
    }

    it('Returns formatted description for a verify assertion', ()=> {
        const mockName = 'mockName';
        const timesMessage = 'Should be called once';
        const haveBeenCalledTimes = 2;
        const expressionDescription = 'expression description';
        const trackedExpressionsDescription = 'tracked expressions description';
        const trackedExpressions = [];

        const expression = new GetPropertyExpression('name');
        const expectedExpressionFormatter = expectedExpressionFormatterFactory();

        (<jasmine.Spy>expectedExpressionFormatter.format).and.returnValue(expressionDescription);
        const trackedExpressionsFormatter = trackedExpressionsFormatterFactory();

        (<jasmine.Spy>trackedExpressionsFormatter.format).and.returnValue(trackedExpressionsDescription);
        const formatter = new VerifyFormatter(expectedExpressionFormatter, trackedExpressionsFormatter);
        const actual = formatter.format(expression, timesMessage, haveBeenCalledTimes, trackedExpressions, mockName);

        expect(actual).toBe(`${expressionDescription}\n-------------------------------------\nTracked calls:\n${trackedExpressionsDescription}`);
        expect(expectedExpressionFormatter.format).toHaveBeenCalledWith(expression, timesMessage, haveBeenCalledTimes, mockName);
        expect(trackedExpressionsFormatter.format).toHaveBeenCalledWith(trackedExpressions);
    });

});