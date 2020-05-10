export interface IObjectMatcher {
    matched<T extends object>(left: T, right: T): boolean | undefined;
}
