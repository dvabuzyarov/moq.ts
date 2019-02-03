import { ITypeExplorer } from "./type-explorer";
import { ObjectExplorer } from "./object-explorer";

export class ObjectExplorerFactory {
    public get(target: any): ITypeExplorer {
        return new ObjectExplorer(target);
    }
}
