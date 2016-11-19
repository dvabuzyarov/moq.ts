export interface IPredicate<T> {
    (instance: T): boolean;
}


export class It<T> {
    constructor(private predicate: IPredicate<T>){

    }

    public static Is<T>(predicate: IPredicate<T>): It<T>|any {
        return new It(predicate);
    }

    public test(instance: T): boolean{
        return this.predicate(instance);
    }
}
