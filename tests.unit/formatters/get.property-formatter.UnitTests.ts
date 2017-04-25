import {GetPropertyExpression} from '../../lib/expressions';
import {GetPropertyExpressionFormatter} from '../../lib/formatters/get.property-formatter';

describe('Get property expression formatter', () => {

    it('Returns formatted description for get property expression', ()=> {
        const name = 'name';
        const expression = new GetPropertyExpression(name);

        const formatter = new GetPropertyExpressionFormatter();
        const actual = formatter.format(expression);

        expect(actual).toBe(`Getter of \'${name}\'`);
    });

});