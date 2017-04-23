declare var Proxy: any;

export interface INameSelector<T> {
    (instance: T): any;
}

export function getName<T>(selector: INameSelector<T>): string {
    'use strict';

    let selectedName: string;

    const options = {
        get(target, name): void {
            selectedName = name;
            return undefined;
        }
    };

    const proxy = <T>(new Proxy({}, options));
    selector(proxy);
    return selectedName;
}