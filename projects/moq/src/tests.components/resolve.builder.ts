// @ts-ignore
import SpyObj = jasmine.SpyObj;
// @ts-ignore
import Spy = jasmine.Spy;
import { InjectionToken, Type } from "@angular/core";

export type SpiedObject<T> = T & {
    [K in keyof T]: T[K] extends Function ? T[K] & SpiedObject<T> & Spy : SpiedObject<T[K]>;
};

export function resolveBuilder(values: [Type<any> | InjectionToken<any>, SpyObj<any> & Spy][]):
    <T>(token: Type<T> | InjectionToken<T>) => SpyObj<T> & Spy {
    return <T>(token: Type<T> | InjectionToken<T>): SpyObj<T> & Spy => {
        for (const item of values) {
            const [type, value] = item;
            if (type === token) {
                return value as any;
            }
        }
    };
}
