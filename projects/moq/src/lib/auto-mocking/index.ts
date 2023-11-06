import { MOCK } from "../injector/mock.injection-token";
import { AutoMockFactory } from "./auto-mock.factory";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { RootMockProvider } from "./root-mock.provider";
import { Optional } from "../static.injector/metadata";
import { ROOT_MOCK } from "../injector/root-mock.injection-token";
import { AutoMockedStorage } from "./auto-mock.storage";
import { AutoMockProvider } from "./auto-mock.provider";
import { AutoMockOptionsBuilder } from "./auto-mock-options.builder";
import { AutoMockNameFormatter } from "./name-formatters/auto-mock-name.formatter";
import { AutoMockInjectorConfig } from "./auto-mock-injector.config";
import { NamePrefixProvider } from "./name-formatters/name-prefix.provider";
import { FunctionExpressionFormatter } from "../formatters/function-expression.formatter";
import { PropertyKeyFormatter } from "../formatters/property-key.formatter";
import { MethodExpressionFormatter } from "../formatters/method-expression.formatter";
import { MOCK_CONSTRUCTOR } from "../injector/mock-constructor.injection-token";
import { ExpressionEqualityComparer } from "../expression.equality-comparers/expression.equality-comparer";
import { ComplexExpressionValidator } from "./expression.guards/complex-expression.validator";
import expressionGuards from "./expression.guards/index";
import { ObjectFormatter } from "../object-formatters/object.formatter";

/**
 * @hidden
 */
export default [
    {provide: NamePrefixProvider, useClass: NamePrefixProvider, deps: []},
    {provide: AutoMockedStorage, useClass: AutoMockedStorage, deps: []},
    {
        provide: AutoMockNameFormatter,
        useClass: AutoMockNameFormatter,
        deps: [NamePrefixProvider, FunctionExpressionFormatter, PropertyKeyFormatter, MethodExpressionFormatter, ObjectFormatter]
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
        deps: [AutoMockedStorage, ExpressionEqualityComparer, AutoMockFactory]
    },
    {provide: ComplexExpressionValidator, useClass: ComplexExpressionValidator, deps: []},
    ...expressionGuards
];
