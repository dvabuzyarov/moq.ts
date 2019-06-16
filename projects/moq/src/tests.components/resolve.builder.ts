import { Type } from "./type";
import { IJasmineSpy } from "./jasmine-spy";

export function resolveBuilder(values: [Type<any>, IJasmineSpy<any>][]): <T>(token: Type<T>) => IJasmineSpy<T> {
    return <T>(token: Type<T>): IJasmineSpy<T> => {
        for (const item of values) {
            const [type, value] = item;
            if (type === token) {
                return value as any;
            }
        }
    };
}
