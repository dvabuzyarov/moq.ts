export class ObjectHasMethodExplorer {
    public has(name: PropertyKey, target: any): boolean {
        return target[name] instanceof Function;
    }
}
