/**
 * @hidden
 */
export class PropertyDescriptorProvider {
    get(target: any, name: PropertyKey) {
        let prototype = target;
        while (prototype !== null) {
            const descriptor = Reflect.getOwnPropertyDescriptor(prototype, name);
            if (descriptor !== undefined) return descriptor;
            prototype = Reflect.getPrototypeOf(prototype);
        }
    }
}
