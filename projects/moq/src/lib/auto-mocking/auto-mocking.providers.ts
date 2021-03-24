import { MOCK } from "../injector/mock.injection-token";
import { AutoMockFactory } from "./auto-mock.factory";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { RootMockProvider } from "./root-mock.provider";
import { Optional } from "../static.injector/metadata";
import { ROOT_MOCK } from "../injector/root-mock.injection-token";
import { AutoMockedStorage } from "./auto-mock.storage";
import { ExpressionsMatcher } from "./expressions.matcher";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";
import { AutoMockProvider } from "./auto-mock.provider";
import { AutoMockOptionsBuilder } from "./auto-mock-options.builder";
import { AutoMockNameFormatter } from "./name-formatters/auto-mock-name.formatter";
import { AutoMockInjectorConfig } from "./auto-mock-injector.config";
import { NamePrefixProvider } from "./name-formatters/name-prefix.provider";
import { MethodFormatter } from "../formatters/method.formatter";
import { PropertyKeyFormatter } from "../formatters/property-key.formatter";
import { NamedMethodFormatter } from "../formatters/named-method.formatter";
import { ConstantFormatter } from "../formatters/constant.formatter";
import { MOCK_CONSTRUCTOR } from "../injector/mock-constructor.injection-token";

/**
 * @hidden
 */
export const autoMockingProviders = [
    {provide: NamePrefixProvider, useClass: NamePrefixProvider, deps: []},
    {provide: AutoMockedStorage, useClass: AutoMockedStorage, deps: []},
    {
        provide: AutoMockNameFormatter,
        useClass: AutoMockNameFormatter,
        deps: [NamePrefixProvider, MethodFormatter, PropertyKeyFormatter, NamedMethodFormatter, ConstantFormatter]
    },
    {
        provide: AutoMockOptionsBuilder,
        useClass: AutoMockOptionsBuilder,
        deps: [MOCK_OPTIONS, AutoMockNameFormatter, AutoMockInjectorConfig]
    },
    {
        provide: AutoMockInjectorConfig,
        useClass: AutoMockInjectorConfig,
        deps: [MOCK_OPTIONS, MOCK, [new Optional(), ROOT_MOCK]]
    },
    {provide: AutoMockFactory, useClass: AutoMockFactory, deps: [MOCK_CONSTRUCTOR, AutoMockOptionsBuilder]},
    {provide: RootMockProvider, useClass: RootMockProvider, deps: [MOCK, [new Optional(), ROOT_MOCK]]},
    {
        provide: AutoMockProvider,
        useClass: AutoMockProvider,
        deps: [AutoMockedStorage, ExpressionsMatcher, AutoMockFactory]
    },
    {provide: ExpressionsMatcher, useClass: ExpressionsMatcher, deps: [ExpressionMatcher]},
];
