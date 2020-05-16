/**
 * @hidden
 */
export class CommonTypeProvider {
    public ofType(left: unknown, right: unknown) {
        return typeof left && typeof right;
    }
}

