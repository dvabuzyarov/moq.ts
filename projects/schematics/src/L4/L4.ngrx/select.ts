import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { InjectionFactory, TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";

/*eslint no-shadow: ["error", { "allow": ["props"] }]*/
export function select<C extends InjectionFactory,
    K extends ReturnType<TypeOfInjectionFactory<C>>
        = ReturnType<TypeOfInjectionFactory<C>>,
    T extends TypeOfInjectionFactory<C> extends (state: infer U, props?: any) => any ? U : never
        = TypeOfInjectionFactory<C> extends (state: infer U, props?: any) => any ? U : never,
    P extends TypeOfInjectionFactory<C> extends (state: any, props?: infer U) => any ? U : never
        = TypeOfInjectionFactory<C> extends (state: any, props?: infer U) => any ? U : never>(
    selector: C,
    props?: P
): (source$: Observable<T>) => Observable<K> {
    return (source$: Observable<T>): Observable<K> => {
        const length = arguments.length;
        return source$.pipe(
            map(source => length === 1 ? (selector as TypeOfInjectionFactory<C>)(source)
                : (selector as TypeOfInjectionFactory<C>)(source, props)),
            distinctUntilChanged()
        );
    };
}
