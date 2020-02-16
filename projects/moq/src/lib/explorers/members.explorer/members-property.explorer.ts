import { PrototypeStorage } from "../../traps/prototype.storage";

/**
 * @hidden
 */
export class MembersPropertyExplorer {
    constructor(
        private storage: PrototypeStorage) {

    }

    public hasProperty(name: PropertyKey): boolean {
        const prototype = this.storage.get();
        if (prototype && Reflect.has(prototype, name)) {
            const descriptor = Reflect.getOwnPropertyDescriptor(prototype, name);
            return descriptor.get !== undefined || (descriptor.value instanceof Function) === false;
        }
        return false;
    }
}
