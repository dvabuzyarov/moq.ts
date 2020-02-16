import { PrototypeStorage } from "../../traps/prototype.storage";

/**
 * @hidden
 */
export class MembersMethodExplorer {
    constructor(
        private storage: PrototypeStorage) {

    }

    public hasMethod(name: PropertyKey): boolean {
        const prototype = this.storage.get();
        if (prototype && Reflect.has(prototype, name)) {
            const descriptor = Reflect.getOwnPropertyDescriptor(prototype, name);
            return descriptor.value instanceof Function;
        }
        return false;
    }
}
