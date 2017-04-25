import {It} from '../../lib/expected-expressions/expression-predicates';

describe('Expression Predicates', () => {

    it('Returns an instance of It from It.Is function', ()=> {
        const predicateResult = true;
        const value = 'parameter';
        const predicate = jasmine.createSpy('predicate').and.returnValue(predicateResult);

        const it = It.Is<any>(predicate);
        const actual = it.test(value);

        expect(predicate).toHaveBeenCalledWith(value);
        expect(actual).toBe(predicateResult);
    });

    it('Returns an instance of It from It.IsAny function', ()=> {
        const it = It.IsAny();
        const actual = it.test();

        expect(actual).toBe(true);
    });

});