export class PropertiesValueStorage {
    private storage = new Map<PropertyKey, any>();

    public has(property: PropertyKey): boolean {
        return this.storage.has(property);
    }

    public get(property: PropertyKey): any {
        return this.storage.get(property);
    }

    public set(property: PropertyKey, value: any): void {
        this.storage.set(property, value);
    }
}
