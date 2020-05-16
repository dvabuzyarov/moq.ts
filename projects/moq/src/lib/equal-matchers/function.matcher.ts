/**
 * @hidden
 */
export class FunctionMatcher {

    public matched<T extends Function>(left: T, right: T): boolean {
        return left === right;
    }
}

