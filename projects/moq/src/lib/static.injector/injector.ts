/* eslint-disable */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { resolveForwardRef } from "./forward_ref";
import { InjectionToken } from "./injection_token";
import {
    catchInjectorError,
    formatError,
    INJECTOR,
    NG_TEMP_TOKEN_PATH, NO_NEW_LINE,
    NullInjector,
    THROW_IF_NOT_FOUND,
    USE_VALUE
} from "./injector_compatibility";
import { InjectFlags } from "./interface/injector";
import {
    ConstructorProvider,
    ExistingProvider,
    FactoryProvider,
    StaticClassProvider,
    StaticProvider,
    ValueProvider
} from "./interface/provider";
import { Optional, Self, SkipSelf } from "./metadata";
import { AbstractType, Type } from "./type";
import { stringify } from "./stringify";

export const INJECTOR_IMPL = (
    providers: StaticProvider[], parent: Injector | undefined, name: string) => new StaticInjector(providers, parent, name);

/**
 * Concrete injectors implement this interface. Injectors are configured
 * with [providers](guide/glossary#provider) that associate
 * dependencies of various types with [injection tokens](guide/glossary#di-token).
 *
 * @see ["DI Providers"](guide/dependency-injection-providers).
 * @see `StaticProvider`
 *
 * @usageNotes
 *
 *  The following example creates a service injector instance.
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Usage example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @publicApi
 */
export abstract class Injector {
    static THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND;
    static NULL: Injector = new NullInjector();
    /**
     * @internal
     * @nocollapse
     */
    static __NG_ELEMENT_ID__ = -1;

    /**
     * Creates a new injector instance that provides one or more dependencies,
     * according to a given type or types of `StaticProvider`.
     *
     * @param options An object with the following properties:
     * * `providers`: An array of providers of the [StaticProvider type](api/core/StaticProvider).
     * * `parent`: (optional) A parent injector.
     * * `name`: (optional) A developer-defined identifying name for the new injector.
     *
     * @returns The new injector instance.
     *
     */
    static create(options: { providers: StaticProvider[]; parent?: Injector; name?: string }): Injector;

    static create(
        options: StaticProvider[] | { providers: StaticProvider[]; parent?: Injector; name?: string },
        parent?: Injector): Injector {
        if (Array.isArray(options)) {
            return INJECTOR_IMPL(options, parent, "");
        } else {
            return INJECTOR_IMPL(options.providers, options.parent, options.name || "");
        }
    }

    /**
     * Retrieves an instance from the injector based on the provided token.
     *
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(
        token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags): T;
}


const IDENT = function <T>(value: T): T {
    return value;
};
const EMPTY = <any[]>[];
const CIRCULAR = IDENT;
const MULTI_PROVIDER_FN = function (): any[] {
    return Array.prototype.slice.call(arguments);
};

const enum OptionFlags {
    Optional = 1,
    CheckSelf = 2,
    CheckParent = 4,
    // eslint-disable-next-line no-bitwise
    Default = CheckSelf | CheckParent
}

export class StaticInjector implements Injector {
    readonly parent: Injector;
    readonly source: string | null;
    readonly scope: string | null;

    private _records: Map<any, Record | null>;

    constructor(
        providers: StaticProvider[], parent = new NullInjector(), source: string | null = null) {
        this.parent = parent;
        this.source = source;
        const records = this._records = new Map<any, Record>();
        records.set(Injector, <Record>{token: Injector, fn: IDENT, deps: EMPTY, value: this, useNew: false});
        records.set(INJECTOR, <Record>{token: INJECTOR, fn: IDENT, deps: EMPTY, value: this, useNew: false});
        this.scope = recursivelyProcessProviders(records, providers);
    }

    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    get(token: any, notFoundValue?: any): any;
    get(token: any, notFoundValue?: any, flags: InjectFlags = InjectFlags.Default): any {
        const records = this._records;
        const record = records.get(token);
        if (record === undefined) {
            records.set(token, null);
        }
        try {
            return tryResolveToken(token, record, records, this.parent, notFoundValue, flags);
        } catch (e) {
            return catchInjectorError(e, token, "StaticInjectorError", this.source);
        }
    }

    toString() {
        const tokens = <string[]>[]; const records = this._records;
        records.forEach((v, token) => tokens.push(stringify(token)));
        return `StaticInjector[${tokens.join(", ")}]`;
    }
}

type SupportedProvider =
    ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider;

interface Record {
    fn: Function;
    useNew: boolean;
    deps: DependencyRecord[];
    value: any;
}

interface DependencyRecord {
    token: any;
    options: number;
}

function resolveProvider(provider: SupportedProvider): Record {
    const deps = computeDeps(provider);
    let fn: Function = IDENT;
    let value: any = EMPTY;
    let useNew = false;
    const provide = resolveForwardRef(provider.provide);
    if (USE_VALUE in provider) {
        // We need to use USE_VALUE in provider since provider.useValue could be defined as undefined.
        value = (provider as ValueProvider).useValue;
    } else if ((provider as FactoryProvider).useFactory) {
        fn = (provider as FactoryProvider).useFactory;
    } else if ((provider as ExistingProvider).useExisting) {
        // Just use IDENT
    } else if ((provider as StaticClassProvider).useClass) {
        useNew = true;
        fn = resolveForwardRef((provider as StaticClassProvider).useClass);
    } else if (typeof provide === "function") {
        useNew = true;
        fn = provide;
    } else {
        throw staticError(
            "StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable",
            provider);
    }
    return {deps, fn, useNew, value};
}

function multiProviderMixError(token: any) {
    return staticError("Cannot mix multi providers and regular providers", token);
}

function recursivelyProcessProviders(records: Map<any, Record>, provider: StaticProvider): string |
    null {
    let scope: string | null = null;
    if (provider) {
        provider = resolveForwardRef(provider);
        if (Array.isArray(provider)) {
            // if we have an array recurse into the array
            for (let i = 0; i < provider.length; i++) {
                scope = recursivelyProcessProviders(records, provider[i]) || scope;
            }
        } else if (typeof provider === "function") {
            // Functions were supported in ReflectiveInjector, but are not here. For safety give useful
            // error messages
            throw staticError("Function/Class not supported", provider);
        } else if (provider && typeof provider === "object" && provider.provide) {
            // At this point we have what looks like a provider: {provide: ?, ....}
            let token = resolveForwardRef(provider.provide);
            const resolvedProvider = resolveProvider(provider);
            if (provider.multi === true) {
                // This is a multi provider.
                let multiProvider: Record | undefined = records.get(token);
                if (multiProvider) {
                    if (multiProvider.fn !== MULTI_PROVIDER_FN) {
                        throw multiProviderMixError(token);
                    }
                } else {
                    // Create a placeholder factory which will look up the constituents of the multi provider.
                    records.set(token, multiProvider = <Record>{
                        token: provider.provide,
                        deps: [],
                        useNew: false,
                        fn: MULTI_PROVIDER_FN,
                        value: EMPTY
                    });
                }
                // Treat the provider as the token.
                token = provider;
                multiProvider.deps.push({token, options: OptionFlags.Default});
            }
            const record = records.get(token);
            if (record && record.fn === MULTI_PROVIDER_FN) {
                throw multiProviderMixError(token);
            }
            records.set(token, resolvedProvider);
        } else {
            throw staticError("Unexpected provider", provider);
        }
    }
    return scope;
}

function tryResolveToken(
    token: any, record: Record | undefined | null, records: Map<any, Record | null>, parent: Injector,
    notFoundValue: any, flags: InjectFlags): any {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags);
    } catch (e) {
        // ensure that 'e' is of type Error.
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        const path: any[] = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
        path.unshift(token);
        if (record && record.value === CIRCULAR) {
            // Reset the Circular flag.
            record.value = EMPTY;
        }
        throw e;
    }
}

function resolveToken(
    token: any, record: Record | undefined | null, records: Map<any, Record | null>, parent: Injector,
    notFoundValue: any, flags: InjectFlags): any {
    let value;
    // eslint-disable-next-line no-bitwise
    if (record && !(flags & InjectFlags.SkipSelf)) {
        // If we don't have a record, this implies that we don't own the provider hence don't know how
        // to resolve it.
        value = record.value;
        if (value === CIRCULAR) {
            throw Error(`${NO_NEW_LINE  }Circular dependency`);
        } else if (value === EMPTY) {
            record.value = CIRCULAR;
            const {useNew, fn, deps: depRecords} = record;
            let deps = EMPTY;
            if (depRecords.length) {
                deps = [];
                for (let i = 0; i < depRecords.length; i++) {
                    const depRecord: DependencyRecord = depRecords[i];
                    const options = depRecord.options;
                    // eslint-disable-next-line no-bitwise
                    const childRecord = options & OptionFlags.CheckSelf ? records.get(depRecord.token) : undefined;
                    deps.push(tryResolveToken(
                        // Current Token to resolve
                        depRecord.token,
                        // A record which describes how to resolve the token.
                        // If undefined, this means we don't have such a record
                        childRecord,
                        // Other records we know about.
                        records,
                        // If we don't know how to resolve dependency and we should not check parent for it,
                        // than pass in Null injector.
                        // eslint-disable-next-line no-bitwise
                        !childRecord && !(options & OptionFlags.CheckParent) ? Injector.NULL : parent,
                        // eslint-disable-next-line no-bitwise
                        options & OptionFlags.Optional ? null : Injector.THROW_IF_NOT_FOUND,
                        InjectFlags.Default));
                }
            }
            record.value = value = useNew ? new (fn as any)(...deps) : fn.apply(undefined, deps);
        }
        // eslint-disable-next-line no-bitwise
    } else if (!(flags & InjectFlags.Self)) {
        value = parent.get(token, notFoundValue, InjectFlags.Default);
        // eslint-disable-next-line no-bitwise
    } else if (!(flags & InjectFlags.Optional)) {
        value = Injector.NULL.get(token, notFoundValue);
    } else {
        value = Injector.NULL.get(token, typeof notFoundValue !== "undefined" ? notFoundValue : null);
    }
    return value;
}

function computeDeps(provider: StaticProvider): DependencyRecord[] {
    let deps: DependencyRecord[] = EMPTY;
    const providerDeps: any[] =
        (provider as ExistingProvider & StaticClassProvider & ConstructorProvider).deps;
    if (providerDeps && providerDeps.length) {
        deps = [];
        for (let i = 0; i < providerDeps.length; i++) {
            let options = OptionFlags.Default;
            let token = resolveForwardRef(providerDeps[i]);
            if (Array.isArray(token)) {
                for (let j = 0, annotations = token; j < annotations.length; j++) {
                    const annotation = annotations[j];
                    if (annotation instanceof Optional || annotation === Optional) {
                        // eslint-disable-next-line no-bitwise
                        options = options | OptionFlags.Optional;
                    } else if (annotation instanceof SkipSelf || annotation === SkipSelf) {
                        // eslint-disable-next-line no-bitwise
                        options = options & ~OptionFlags.CheckSelf;
                    } else if (annotation instanceof Self || annotation === Self) {
                        // eslint-disable-next-line no-bitwise
                        options = options & ~OptionFlags.CheckParent;
                    } else {
                        token = resolveForwardRef(annotation);
                    }
                }
            }
            deps.push({token, options});
        }
    } else if ((provider as ExistingProvider).useExisting) {
        const token = resolveForwardRef((provider as ExistingProvider).useExisting);
        deps = [{token, options: OptionFlags.Default}];
    } else if (!providerDeps && !(USE_VALUE in provider)) {
        // useValue & useExisting are the only ones which are exempt from deps all others need it.
        throw staticError("'deps' required", provider);
    }
    return deps;
}

function staticError(text: string, obj: any): Error {
    return new Error(formatError(text, obj, "StaticInjectorError"));
}
