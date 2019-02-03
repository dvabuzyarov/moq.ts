export interface ITypeExplorer {
    hasProperty(name: PropertyKey): boolean;

    hasMethod(name: PropertyKey): boolean;
}
