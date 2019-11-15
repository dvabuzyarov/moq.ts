import { PrototypeStorage } from "./prototype.storage";

/**
 * @hidden
 */
export class GetPrototypeOfTrap {
    constructor(
        private prototypeStorage: PrototypeStorage) {

    }

    public intercept(): any {
        return this.prototypeStorage.get();
    }
}
