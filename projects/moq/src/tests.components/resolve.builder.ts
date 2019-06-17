import { InjectionToken, Type } from "./type";
// @ts-ignore
import SpyObj = jasmine.SpyObj;
// @ts-ignore
import Spy = jasmine.Spy;

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
