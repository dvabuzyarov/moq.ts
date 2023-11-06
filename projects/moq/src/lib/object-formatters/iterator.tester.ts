/**
 * @hidden
 */
export class IteratorTester {

    public verify(value: unknown) {
        return typeof value[Symbol.iterator] === "function";
    }
}
