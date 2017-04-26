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

    it('Returns true when predicates returns true', ()=> {
        const value = 'tested value';

        const predicate = jasmine.createSpy('predicate').and.returnValue(true);
        const it = new It(predicate);
        const actual = it.test(value);

        expect(actual).toBe(true);
        expect(predicate).toHaveBeenCalledWith(value);
    });

    it('Returns true when predicates returns undefined', ()=> {
        const value = 'tested value';

        const predicate = jasmine.createSpy('predicate').and.returnValue(undefined);
        const it = new It(predicate);
        const actual = it.test(value);

        expect(actual).toBe(true);
        expect(predicate).toHaveBeenCalledWith(value);
    });

    it('Returns false when predicates returns anything that are not true or undefined', ()=> {
        const value = 'tested value';

        const predicate = jasmine.createSpy('predicate').and.returnValue(1);
        const it = new It(predicate);
        const actual = it.test(value);

        expect(actual).toBe(false);
        expect(predicate).toHaveBeenCalledWith(value);
    });

    it('Returns false when predicates throws an exception', ()=> {
        const value = 'tested value';

        const predicate = jasmine.createSpy('predicate').and.throwError('exception message');
        const it = new It(predicate);
        const actual = it.test(value);

        expect(actual).toBe(false);
        expect(predicate).toHaveBeenCalledWith(value);
    });

});