import {NamedMethodExpression} from '../../lib/expressions';
import {ConstantFormatter} from '../../lib/formatters/constant-formatter';
import {NamedMethodExpressionFormatter} from '../../lib/formatters/named.method-formatter';

describe('Named method expression formatter', () => {
    function constantFormatterFactory(): ConstantFormatter {
        const constantFormatter = jasmine.createSpy('constant formatter');
        return {
            format: constantFormatter
        }
    }

    it('Returns formatted description for named method expression', ()=> {
        const name = 'name';
        const value = 'value';
        const valueDescription = 'value description';
        const expression = new NamedMethodExpression(name, [value]);

        const constantFormatter = constantFormatterFactory();
        (<jasmine.Spy>constantFormatter.format).and.returnValue(valueDescription);
        const formatter = new NamedMethodExpressionFormatter(constantFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`${name}(${valueDescription})`);
        expect(constantFormatter.format).toHaveBeenCalledWith([value]);
    });

});