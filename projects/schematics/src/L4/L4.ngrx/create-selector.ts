import {
    createSelector as originalCreateSelector,
    MemoizedSelector,
    MemoizedSelectorWithProps,
    Selector,
    SelectorWithProps
} from "@ngrx/store";

export type InjectableSelector<S, R, P = unknown> = { factory(): (s: S) => R } | Selector<S, R>;
export type InjectableSelectorWithProps<S, P, R> = { factory(): (s: S, p: P) => R } | SelectorWithProps<S, P, R>;

/*eslint no-shadow: ["error", { "allow": ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] }]*/
export function createSelector<State, S1, Result>(
    s1: InjectableSelector<State, S1>,
    projector: (s1: S1) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, Result>(
    s1: InjectableSelectorWithProps<State, Props, S1>,
    projector: (s1: S1, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;

export function createSelector<State, S1, S2, Result>(
    s1: InjectableSelector<State, S1>,
    s2: InjectableSelector<State, S2>,
    projector: (s1: S1, s2: S2) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, Result>(
    s1: InjectableSelectorWithProps<State, Props, S1>,
    s2: InjectableSelectorWithProps<State, Props, S2>,
    projector: (s1: S1, s2: S2, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;
export function createSelector<State, S1, S2, Result>(
    selectors: [InjectableSelector<State, S1>, InjectableSelector<State, S2>],
    projector: (s1: S1, s2: S2) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, Result>(
    selectors: [
        InjectableSelectorWithProps<State, Props, S1>,
        InjectableSelectorWithProps<State, Props, S2>
    ],
    projector: (s1: S1, s2: S2, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;

export function createSelector<State, S1, S2, S3, Result>(
    s1: InjectableSelector<State, S1>,
    s2: InjectableSelector<State, S2>,
    s3: InjectableSelector<State, S3>,
    projector: (s1: S1, s2: S2, s3: S3) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, S3, Result>(
    s1: InjectableSelectorWithProps<State, Props, S1>,
    s2: InjectableSelectorWithProps<State, Props, S2>,
    s3: InjectableSelectorWithProps<State, Props, S3>,
    projector: (s1: S1, s2: S2, s3: S3, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;
export function createSelector<State, S1, S2, S3, Result>(
    selectors: [InjectableSelector<State, S1>, InjectableSelector<State, S2>, InjectableSelector<State, S3>],
    projector: (s1: S1, s2: S2, s3: S3) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, S3, Result>(
    selectors: [
        InjectableSelectorWithProps<State, Props, S1>,
        InjectableSelectorWithProps<State, Props, S2>,
        InjectableSelectorWithProps<State, Props, S3>
    ],
    projector: (s1: S1, s2: S2, s3: S3, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;

export function createSelector<State, S1, S2, S3, S4, Result>(
    s1: InjectableSelector<State, S1>,
    s2: InjectableSelector<State, S2>,
    s3: InjectableSelector<State, S3>,
    s4: InjectableSelector<State, S4>,
    projector: (s1: S1, s2: S2, s3: S3, s4: S4) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, S3, S4, Result>(
    s1: InjectableSelectorWithProps<State, Props, S1>,
    s2: InjectableSelectorWithProps<State, Props, S2>,
    s3: InjectableSelectorWithProps<State, Props, S3>,
    s4: InjectableSelectorWithProps<State, Props, S4>,
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;
export function createSelector<State, S1, S2, S3, S4, Result>(
    selectors: [
        InjectableSelector<State, S1>,
        InjectableSelector<State, S2>,
        InjectableSelector<State, S3>,
        InjectableSelector<State, S4>
    ],
    projector: (s1: S1, s2: S2, s3: S3, s4: S4) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, S3, S4, Result>(
    selectors: [
        InjectableSelectorWithProps<State, Props, S1>,
        InjectableSelectorWithProps<State, Props, S2>,
        InjectableSelectorWithProps<State, Props, S3>,
        InjectableSelectorWithProps<State, Props, S4>
    ],
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;

export function createSelector<State, S1, S2, S3, S4, S5, Result>(
    s1: InjectableSelector<State, S1>,
    s2: InjectableSelector<State, S2>,
    s3: InjectableSelector<State, S3>,
    s4: InjectableSelector<State, S4>,
    s5: InjectableSelector<State, S5>,
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, S3, S4, S5, Result>(
    s1: InjectableSelectorWithProps<State, Props, S1>,
    s2: InjectableSelectorWithProps<State, Props, S2>,
    s3: InjectableSelectorWithProps<State, Props, S3>,
    s4: InjectableSelectorWithProps<State, Props, S4>,
    s5: InjectableSelectorWithProps<State, Props, S5>,
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;
export function createSelector<State, S1, S2, S3, S4, S5, Result>(
    selectors: [
        InjectableSelector<State, S1>,
        InjectableSelector<State, S2>,
        InjectableSelector<State, S3>,
        InjectableSelector<State, S4>,
        InjectableSelector<State, S5>
    ],
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, S3, S4, S5, Result>(
    selectors: [
        InjectableSelectorWithProps<State, Props, S1>,
        InjectableSelectorWithProps<State, Props, S2>,
        InjectableSelectorWithProps<State, Props, S3>,
        InjectableSelectorWithProps<State, Props, S4>,
        InjectableSelectorWithProps<State, Props, S5>
    ],
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, props: Props) => Result
): MemoizedSelectorWithProps<State, Props, Result>;

export function createSelector<State, S1, S2, S3, S4, S5, S6, Result>(
    s1: InjectableSelector<State, S1>,
    s2: InjectableSelector<State, S2>,
    s3: InjectableSelector<State, S3>,
    s4: InjectableSelector<State, S4>,
    s5: InjectableSelector<State, S5>,
    s6: InjectableSelector<State, S6>,
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, S3, S4, S5, S6, Result>(
    s1: InjectableSelectorWithProps<State, Props, S1>,
    s2: InjectableSelectorWithProps<State, Props, S2>,
    s3: InjectableSelectorWithProps<State, Props, S3>,
    s4: InjectableSelectorWithProps<State, Props, S4>,
    s5: InjectableSelectorWithProps<State, Props, S5>,
    s6: InjectableSelectorWithProps<State, Props, S6>,
    projector: (
        s1: S1,
        s2: S2,
        s3: S3,
        s4: S4,
        s5: S5,
        s6: S6,
        props: Props
    ) => Result
): MemoizedSelectorWithProps<State, Props, Result>;
export function createSelector<State, S1, S2, S3, S4, S5, S6, Result>(
    selectors: [
        InjectableSelector<State, S1>,
        InjectableSelector<State, S2>,
        InjectableSelector<State, S3>,

        InjectableSelector<State, S4>,
        InjectableSelector<State, S5>,
        InjectableSelector<State, S6>
    ],
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State, Props, S1, S2, S3, S4, S5, S6, Result>(
    selectors: [
        InjectableSelectorWithProps<State, Props, S1>,
        InjectableSelectorWithProps<State, Props, S2>,
        InjectableSelectorWithProps<State, Props, S3>,
        InjectableSelectorWithProps<State, Props, S4>,
        InjectableSelectorWithProps<State, Props, S5>,
        InjectableSelectorWithProps<State, Props, S6>
    ],
    projector: (
        s1: S1,
        s2: S2,
        s3: S3,
        s4: S4,
        s5: S5,
        s6: S6,
        props: Props
    ) => Result
): MemoizedSelectorWithProps<State, Props, Result>;

export function createSelector<State, S1, S2, S3, S4, S5, S6, S7, Result>(
    s1: InjectableSelector<State, S1>,
    s2: InjectableSelector<State, S2>,
    s3: InjectableSelector<State, S3>,
    s4: InjectableSelector<State, S4>,
    s5: InjectableSelector<State, S5>,
    s6: InjectableSelector<State, S6>,
    s7: InjectableSelector<State, S7>,
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State,
    Props,
    S1,
    S2,
    S3,
    S4,
    S5,
    S6,
    S7,
    Result>(
    s1: InjectableSelectorWithProps<State, Props, S1>,
    s2: InjectableSelectorWithProps<State, Props, S2>,
    s3: InjectableSelectorWithProps<State, Props, S3>,
    s4: InjectableSelectorWithProps<State, Props, S4>,
    s5: InjectableSelectorWithProps<State, Props, S5>,
    s6: InjectableSelectorWithProps<State, Props, S6>,
    s7: InjectableSelectorWithProps<State, Props, S7>,
    projector: (
        s1: S1,
        s2: S2,
        s3: S3,
        s4: S4,
        s5: S5,
        s6: S6,
        s7: S7,
        props: Props
    ) => Result
): MemoizedSelectorWithProps<State, Props, Result>;
export function createSelector<State, S1, S2, S3, S4, S5, S6, S7, Result>(
    selectors: [
        InjectableSelector<State, S1>,
        InjectableSelector<State, S2>,
        InjectableSelector<State, S3>,
        InjectableSelector<State, S4>,
        InjectableSelector<State, S5>,
        InjectableSelector<State, S6>,
        InjectableSelector<State, S7>
    ],
    projector: (s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State,
    Props,
    S1,
    S2,
    S3,
    S4,
    S5,
    S6,
    S7,
    Result>(
    selectors: [
        InjectableSelectorWithProps<State, Props, S1>,
        InjectableSelectorWithProps<State, Props, S2>,
        InjectableSelectorWithProps<State, Props, S3>,
        InjectableSelectorWithProps<State, Props, S4>,
        InjectableSelectorWithProps<State, Props, S5>,
        InjectableSelectorWithProps<State, Props, S6>,
        InjectableSelectorWithProps<State, Props, S7>
    ],
    projector: (
        s1: S1,
        s2: S2,
        s3: S3,
        s4: S4,
        s5: S5,
        s6: S6,
        s7: S7,
        props: Props
    ) => Result
): MemoizedSelectorWithProps<State, Props, Result>;

export function createSelector<State, S1, S2, S3, S4, S5, S6, S7, S8, Result>(
    s1: InjectableSelector<State, S1>,
    s2: InjectableSelector<State, S2>,
    s3: InjectableSelector<State, S3>,
    s4: InjectableSelector<State, S4>,
    s5: InjectableSelector<State, S5>,
    s6: InjectableSelector<State, S6>,
    s7: InjectableSelector<State, S7>,
    s8: InjectableSelector<State, S8>,
    projector: (
        s1: S1,
        s2: S2,
        s3: S3,
        s4: S4,
        s5: S5,
        s6: S6,
        s7: S7,
        s8: S8
    ) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State,
    Props,
    S1,
    S2,
    S3,
    S4,
    S5,
    S6,
    S7,
    S8,
    Result>(
    s1: InjectableSelectorWithProps<State, Props, S1>,
    s2: InjectableSelectorWithProps<State, Props, S2>,
    s3: InjectableSelectorWithProps<State, Props, S3>,
    s4: InjectableSelectorWithProps<State, Props, S4>,
    s5: InjectableSelectorWithProps<State, Props, S5>,
    s6: InjectableSelectorWithProps<State, Props, S6>,
    s7: InjectableSelectorWithProps<State, Props, S7>,
    s8: InjectableSelectorWithProps<State, Props, S8>,
    projector: (
        s1: S1,
        s2: S2,
        s3: S3,
        s4: S4,
        s5: S5,
        s6: S6,
        s7: S7,
        s8: S8,
        props: Props
    ) => Result
): MemoizedSelectorWithProps<State, Props, Result>;
export function createSelector<State, S1, S2, S3, S4, S5, S6, S7, S8, Result>(
    selectors: [
        InjectableSelector<State, S1>,
        InjectableSelector<State, S2>,
        InjectableSelector<State, S3>,
        InjectableSelector<State, S4>,
        InjectableSelector<State, S5>,
        InjectableSelector<State, S6>,
        InjectableSelector<State, S7>,
        InjectableSelector<State, S8>
    ],
    projector: (
        s1: S1,
        s2: S2,
        s3: S3,
        s4: S4,
        s5: S5,
        s6: S6,
        s7: S7,
        s8: S8
    ) => Result
): MemoizedSelector<State, Result>;
export function createSelector<State,
    Props,
    S1,
    S2,
    S3,
    S4,
    S5,
    S6,
    S7,
    S8,
    Result>(
    selectors: [
        InjectableSelectorWithProps<State, Props, S1>,
        InjectableSelectorWithProps<State, Props, S2>,
        InjectableSelectorWithProps<State, Props, S3>,
        InjectableSelectorWithProps<State, Props, S4>,
        InjectableSelectorWithProps<State, Props, S5>,
        InjectableSelectorWithProps<State, Props, S6>,
        InjectableSelectorWithProps<State, Props, S7>,
        InjectableSelectorWithProps<State, Props, S8>
    ],
    projector: (
        s1: S1,
        s2: S2,
        s3: S3,
        s4: S4,
        s5: S5,
        s6: S6,
        s7: S7,
        s8: S8,
        props: Props
    ) => Result
): MemoizedSelectorWithProps<State, Props, Result>;

export function createSelector(
    ...input: any[]
): MemoizedSelector<any, any> | MemoizedSelectorWithProps<any, any, any> {
    return (originalCreateSelector as any)(input as any);
}
