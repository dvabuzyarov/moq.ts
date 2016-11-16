export interface IPredicate<T> {
    (instance: T): boolean;
}


export class It<T> {
    constructor(private predicate: IPredicate<T>){

    }

    public static Is(predicate: IPredicate): It<T> {
        return new It(predicate);
    }

    public invoke(instance: T): boolean{
        return this.predicate(instance);
    }
}
