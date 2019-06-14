export class SpyFunctionProvider {
    get(): (...args) => any {
        throw new Error("Not Implemented");
    }
}
