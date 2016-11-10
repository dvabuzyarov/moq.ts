import {It} from './expression-predicates';

export class ConstantMatcher {

    public matched(left: any, right: any|It<any>): boolean {
        if (right instanceof It)
            return (right as It).invoke(left);
        return left === right;
    }
}

