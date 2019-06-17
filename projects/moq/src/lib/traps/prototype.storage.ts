/**
 * @hidden
 */

export class PrototypeStorage {
    private prototype: any = null;

    constructor(mockTarget: any) {
        this.prototype = Object.getPrototypeOf(mockTarget);
    }

    public get(): any {
        return this.prototype;
    }

    public set(prototype: any): void {
        this.prototype = prototype;
    }
}
