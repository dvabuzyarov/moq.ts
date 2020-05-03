import { PropertyValue } from "./property.value";

/**
 * @hidden
 */
export class PropertyIterator {
    * iterate(object: object) {
        const keys = [...new Set<PropertyKey>(this.getProps(object, []))];
        for (const key of keys) {
            yield new PropertyValue(key, object[key]);
        }
    }

    private getProps(object, props: PropertyKey[]) {
        if (object === null) return props;
        if (object === Object.prototype) return props;
        props = [...props, ...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
        return this.getProps(Object.getPrototypeOf(object), props);
    }
}

