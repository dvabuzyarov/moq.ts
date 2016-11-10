export interface IExpressionPredicate<T> {
    (instance: T): boolean;
}


export class It<T> {
    constructor(private predicate: IExpressionPredicate<T>){

    }

    public static Is(predicate: IExpressionPredicate): It<T> {
        return new It(predicate);
    }

    public invoke(instance: T): boolean{
        return this.predicate(instance);
    }
}
