import {MethodInfo, GetPropertyInfo, SetPropertyInfo, NamedMethodInfo} from './expression-reflector';
export class MockTracker{
    private log: (MethodInfo | GetPropertyInfo | SetPropertyInfo | NamedMethodInfo)[] = [];

    public add(action: MethodInfo | GetPropertyInfo | SetPropertyInfo): void{
        this.log.push(action);
    }

    public get(): (MethodInfo | GetPropertyInfo | SetPropertyInfo | NamedMethodInfo)[]{
        return this.log;
    }

    public addNamedMethodInfo(namedMethodInfo: NamedMethodInfo, getPropertyInfo: GetPropertyInfo): void {
        const index = this.log.indexOf(getPropertyInfo);
        this.log[index] = namedMethodInfo;
    }
}