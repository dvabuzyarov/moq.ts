import {It} from '../lib/expression-predicates';
import {ConstantMatcher} from '../lib/constant-matcher';

describe('Constant matcher', () => {

    it('Returns true when both are undefined', ()=> {
        const left = undefined;
        const right = undefined;

        const matcher = new ConstantMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when both are null', ()=> {
        const left = null;
        const right = null;

        const matcher = new ConstantMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });

    it('Returns true when both are the same value', ()=> {
        const left = 1;
        const right = 1;

        const matcher = new ConstantMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });


    it('Returns true when right is a predicate that returns true', ()=> {
        const left = 'left';
        const right = It.Is((instance)=> {
            expect(instance).toBe(left);
            return true;
        });

        const matcher = new ConstantMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(true);
    });


    it('Returns false when left and right are object', ()=> {
        const left = {};
        const right = {};

        const matcher = new ConstantMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });


    it('Returns false when right is a predicate that returns false', ()=> {
        const left = 'left';
        const right = It.Is((instance)=> {
            expect(instance).toBe(left);
            return false;
        });

        const matcher = new ConstantMatcher();
        const actual = matcher.matched(left, right);

        expect(actual).toBe(false);
    });
});