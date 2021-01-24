import { MockCore } from "./mock-core";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { Tracker } from "../tracker/tracker";
import { ExpressionReflector } from "../reflector/expression-reflector";
import { ProxyFactory } from "../interceptors/proxy.factory";
import { Verifier } from "../verification/verifier";
import { PrototypeStorage } from "../interceptors/prototype.storage";
import { MOCK } from "../injector/mock.injection-token";
import { SetupFactory } from "../presets/setup.factory";
import { Injector } from "../static.injector/injector";

/**
 * @hidden
 */
export const mockCoreProviders = [
    {
        provide: MockCore, useClass: MockCore, deps: [
            MOCK_OPTIONS,
            Tracker,
            Injector,
            ExpressionReflector,
            ProxyFactory,
            Verifier,
            PrototypeStorage,
            MOCK,
            SetupFactory
        ]
    },
];
