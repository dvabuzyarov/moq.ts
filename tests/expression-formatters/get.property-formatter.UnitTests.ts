import {GetPropertyExpression} from '../../lib/expressions';
import {GetPropertyExpressionFormatter} from '../../lib/expression-formatters/get.property-formatter';

describe('Get property expression formatter', () => {

    it('Returns formatted get property description', ()=> {
        const name = 'name';
        const expression = new GetPropertyExpression(name);

        const formatter = new GetPropertyExpressionFormatter();
        const actual = formatter.format(expression);

        expect(actual).toBe(`The property \'${name}\'`);
    });
    
});