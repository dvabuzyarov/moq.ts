/**
 * @hidden
 */
export class ObjectHasPropertyExplorer {
    public has(name: PropertyKey, target: any): boolean {
        return Reflect.has(target, name);
    }
}
