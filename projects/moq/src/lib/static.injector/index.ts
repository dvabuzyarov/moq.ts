/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */

export * from "./metadata";
export { InjectFlags } from "./interface/injector";
export { forwardRef, resolveForwardRef, ForwardRefFn } from "./forward_ref";
export { Injector } from "./injector";
export { INJECTOR } from "./injector_compatibility";
export {
    ClassProvider,
    ClassSansProvider,
    ConstructorProvider,
    ConstructorSansProvider,
    ExistingProvider,
    ExistingSansProvider,
    FactoryProvider,
    FactorySansProvider,
    Provider,
    StaticClassProvider,
    StaticClassSansProvider,
    StaticProvider,
    TypeProvider,
    ValueProvider,
    ValueSansProvider
} from "./interface/provider";
export { InjectionToken } from "./injection_token";
