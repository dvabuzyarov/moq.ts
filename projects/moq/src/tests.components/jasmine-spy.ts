export type IJasmineSpy<T> = {
    [P in keyof T]?: T[P] & jasmine.Spy;
};
