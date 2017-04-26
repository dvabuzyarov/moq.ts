export interface IPredicate<T> {
    (instance: T): boolean;
}


export class It<T> {
    constructor(public predicate: IPredicate<T>) {

    }

    public static Is<T>(predicate: IPredicate<T>): It<T> | any {
        return new It(predicate);
    }

    public static IsAny<T>(): It<T> | any {
        return new It(() => true);
    }

    public test(instance: T): boolean {
        try {
            const result = this.predicate(instance);
            return result === true || result === undefined;
        } catch (e) {
            return false;
        }
    }
}
