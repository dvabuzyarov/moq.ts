import {It} from './expression-predicates';
import {ConstantMatcher} from './constant-matcher';

export class ArgumentsMatcher {
    constructor(private constantMatcher: ConstantMatcher){

    }

    public matched(left: any[], right: (any|It<any>)[]): boolean{
        if (left === undefined && right === undefined) return true;
        if (left === null && right === null) return true;
        if (left === right) return true;
        if (left.length !== right.length) return false;

        let matched = true;
        left.forEach((lvalue, index) =>{
            const rvalue = right[index];
            matched = this.constantMatcher.matched(lvalue, rvalue) === true ? matched : false;
        });

        return matched;
    }
}