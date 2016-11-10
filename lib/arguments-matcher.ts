import {It} from './expression-predicates';
import {IConstantMatcher} from './constant-matcher';

export interface IArgumentsMatcher{
    matched(left: any[], right: (any|It<any>)[]): boolean;
}

export class ArgumentsMatcher implements IArgumentsMatcher {
    constructor(private constantMatcher: IConstantMatcher){

    }

    public matched(left: any[], right: (any|It<any>)[]): boolean{
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