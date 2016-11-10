import {It} from './expression-predicates';

export interface IConstantMatcher{
    matched(left: any, right: any|It<any>): boolean;
}

export class ConstantMatcher implements IConstantMatcher {

    public matched(left: any, right: any|It<any>): boolean {
        if (right instanceof It)
            return (right as It).invoke(left);
        return left === right;
    }
}

