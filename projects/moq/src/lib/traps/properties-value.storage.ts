export class PropertiesValueStorage {
    private storage = {};

    public has(property: PropertyKey): boolean {
        return Reflect.has(this.storage, property);
    }

    public get(property: PropertyKey): any {
        return this.storage[property];
    }

    public set(property: PropertyKey, value: any): void {
        this.storage[property] = value;
    }
}
