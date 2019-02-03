import { ITypeExplorer } from "./preset";

export class ObjectExplorerFactory {
    public get(target: any): ITypeExplorer {
        throw new Error("Not Implemented");
    }
}
