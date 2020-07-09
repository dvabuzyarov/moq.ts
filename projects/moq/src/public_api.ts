/*
 * Public API Surface of moq.ts
 */

export * from "./lib/moq";
export * from "./lib/mock";
export * from "./lib/dump";
export * from "./lib/interactions";
export * from "./lib/times";
export * from "./lib/playables/play-times";
export * from "./lib/expected-expressions/expected-expressions";
export * from "./lib/expected-expressions/expression-predicates";
export { PlayTimes } from "./lib/playables/play-times";
export { PlayableExactly } from "./lib/playables/playable-exactly";
export { PlayableOnce } from "./lib/playables/playable-once";
export { PlayableNever } from "./lib/playables/playable-never";
export { PlayableSequence } from "./lib/playables/playable-sequence";
export * from "./lib/injector/default-injector.config";
export * from "./lib/injector/equal-matching-injector.config";
export * from "./lib/injector/injector.factory";
export * from "./lib/injector/moq.injection-token";
export * from "./lib/mock-options/mock-options.injection-token";
export * from "./lib/equal-matchers/object-matchers.injection-token";
export * from "./lib/equal-matchers/object-matcher.type";
export * from "./lib/static.injector/metadata";
export { InjectFlags } from "./lib/static.injector/interface/injector";
export { forwardRef, isForwardRef } from "./lib/static.injector/forward_ref";
export { Injector } from "./lib/static.injector/injector";
export { INJECTOR } from "./lib/static.injector/injector_compatibility";
export { StaticProvider } from "./lib/static.injector/interface/provider";
export { InjectionToken } from "./lib/static.injector/injection_token";
export { FunctionMatcher } from "./lib/equal-matchers/function.matcher";
