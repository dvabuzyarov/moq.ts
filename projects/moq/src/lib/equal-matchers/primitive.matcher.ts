/**
 * @hidden
 */
export class PrimitiveMatcher {

    public matched<T extends (string | number | bigint | boolean | symbol)>(left: T, right: T): boolean {
        return left === right;
    }
}

