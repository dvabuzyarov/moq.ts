import {SetPropertyExpression} from '../../lib/expressions';
import {SetPropertyExpressionFormatter} from '../../lib/formatters/set.property-formatter';
import {ConstantFormatter} from '../../lib/formatters/constant-formatter';

describe('Set property expression formatter', () => {
    function constantFormatterFactory(): ConstantFormatter {
        const constantFormatter = jasmine.createSpy('constant formatter');
        return {
            format: constantFormatter
        }
    }

    it('Returns formatted description for set property expression', ()=> {
        const name = 'name';
        const value = 'value';
        const valueDescription = 'value description';
        const expression = new SetPropertyExpression(name, value);

        const constantFormatter = constantFormatterFactory();
        (<jasmine.Spy>constantFormatter.format).and.returnValue(valueDescription);
        const formatter = new SetPropertyExpressionFormatter(constantFormatter);
        const actual = formatter.format(expression);

        expect(actual).toBe(`Assignment of ${valueDescription} to property \'${name}\'`);
        expect(constantFormatter.format).toHaveBeenCalledWith(value);
    });

});