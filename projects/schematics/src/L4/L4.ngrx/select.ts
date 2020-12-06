import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { InjectionFactory, typeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";

export function select<C extends InjectionFactory,
    K extends ReturnType<typeOfInjectionFactory<C>>
        = ReturnType<typeOfInjectionFactory<C>>,
    T extends typeOfInjectionFactory<C> extends (state: infer U, props?: any) => any ? U : never
        = typeOfInjectionFactory<C> extends (state: infer U, props?: any) => any ? U : never,
    P extends typeOfInjectionFactory<C> extends (state: any, props?: infer U) => any ? U : never
        = typeOfInjectionFactory<C> extends (state: any, props?: infer U) => any ? U : never>(
    selector: C,
    props?: P
): (source$: Observable<T>) => Observable<K> {
    return function selectOperator(source$: Observable<T>): Observable<K> {
        const length = arguments.length;
        return source$.pipe(
            map(source => length === 1 ? (selector as typeOfInjectionFactory<C>)(source)
                : (selector as typeOfInjectionFactory<C>)(source, props)),
            distinctUntilChanged()
        );
    };
}
