/**
 * @hidden
 */
export class FunctionMatcher {

    public matched<T extends (...args) => unknown>(left: T, right: T): boolean {
        return left === right;
    }
}

