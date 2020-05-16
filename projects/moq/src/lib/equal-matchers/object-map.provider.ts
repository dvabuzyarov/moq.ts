/**
 * @hidden
 */
export class ObjectMapProvider {
    get(object: object) {
        const props = this.getProps(object, []);
        const keys = [...new Set<PropertyKey>(props)];
        const map = new Map<PropertyKey, any>();
        for (const key of keys) {
            map.set(key, object[key]);
        }

        return map;
    }

    private getProps(object, props: PropertyKey[]): PropertyKey[] {
        if (object === null) return props;
        if (object === Object.prototype) return props;
        props = [...props, ...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
        return this.getProps(Object.getPrototypeOf(object), props);
    }
}

