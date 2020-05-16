/**
 * @hidden
 */
export class TypesMatcher {

    public matched(left: unknown, right: unknown): boolean {
        return typeof left === typeof right;
    }
}

