import {SetPropertyExpression} from '../../lib/expressions';
import {SetPropertyExpressionFormatter} from '../../lib/expression-formatters/set.property-formatter';
import {ConstantFormatter} from '../../lib/expression-formatters/constant-formatter';

describe('Set property expression formatter', () => {
    function constantFormatterFactory(): ConstantFormatter {
        const constantFromatter = jasmine.createSpy('constant formatter');
        return {
            format: constantFromatter
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