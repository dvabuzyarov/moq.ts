/**
 * @hidden
 */
export class IterableTester {

    public verify(left: unknown, right: unknown) {
        return typeof left[Symbol.iterator] === "function" && typeof right[Symbol.iterator] === "function";
    }
}
