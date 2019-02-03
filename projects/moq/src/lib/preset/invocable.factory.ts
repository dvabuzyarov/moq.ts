/**
 * @hidden
 */
export class InvocableFactory {
    public set(predicate: () => boolean): void {
        this.predicate = predicate;
    }

    public get(): () => boolean {
        return this.predicate;
    }

    private predicate = function () {
        return true;
    }
}
