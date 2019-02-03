export class MethodInvoker {
    public apply(target: () => unknown, thisArg: unknown, args: unknown[]): unknown {
        return target.apply(thisArg, args);
    }
}
