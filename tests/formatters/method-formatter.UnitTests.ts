import {MethodExpression} from '../../lib/expressions';
import {ConstantFormatter} from '../../lib/formatters/constant-formatter';
import {MethodExpressionFormatter} from '../../lib/formatters/method-formatter';

describe('Method expression formatter', () => {
    function constantFormatterFactory(): ConstantFormatter {
        const constantFormatter = jasmine.createSpy('constant formatter');
        return {
            format: constantFormatter
        }
    }

    it('Returns formatted description for method expression', ()=> {
        const value = ['value'];
        const valueDescription = 'value description';
        const expression = new MethodExpression(value);

        const constantFormatter = constantFormatterFactory();
        (<jasmine.Spy>constantFormatter.format).and.returnValue(valueDescription);
        const formatter = new MethodExpressionFormatter(constantFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`(${valueDescription})`);
        expect(constantFormatter.format).toHaveBeenCalledWith(value);
    });

});