import { ITypeExplorer } from "./type-explorer";

export class ObjectExplorer implements ITypeExplorer {
    constructor(private target: unknown) {

    }

    hasMethod(name: PropertyKey): boolean {
        return (<any>this.target)[name] instanceof Function;
    }

    hasProperty(name: PropertyKey): boolean {
        return Reflect.has(<any>this.target, name);
    }
}
