import {
    Expressions, SetPropertyExpression, GetPropertyExpression, MethodExpression,
    NamedMethodExpression
} from './expressions';

export class Tracker{
    private log: Expressions[] = [];

    public add(action: MethodExpression | GetPropertyExpression | SetPropertyExpression): void{
        this.log.push(action);
    }

    public get(): Expressions[]{
        return this.log;
    }

    public addNamedMethod(namedMethodInfo: NamedMethodExpression, getPropertyInfo: GetPropertyExpression): void {
        const index = this.log.indexOf(getPropertyInfo);
        this.log[index] = namedMethodInfo;
    }
}