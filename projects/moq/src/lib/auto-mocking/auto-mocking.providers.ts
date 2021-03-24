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
import { MethodFormatter } from "../formatters/method.formatter";
import { PropertyKeyFormatter } from "../formatters/property-key.formatter";
import { NamedMethodFormatter } from "../formatters/named-method.formatter";
import { ConstantFormatter } from "../formatters/constant.formatter";
import { MOCK_CONSTRUCTOR } from "../injector/mock-constructor.injection-token";
import { ExpressionEqualityComparer } from "./expression.equality-comparer";
import { GetPropertyEqualityComparer } from "../expression.equality-comparers/get-property.equality-comparer";
import { SetPropertyEqualityComparer } from "../expression.equality-comparers/set-property.equality-comparer";
import { MethodEqualityComparer } from "../expression.equality-comparers/method.equality-comparer";
import { InstanceMethodEqualityComparer } from "../expression.equality-comparers/instance-method.equality-comparer";
import { InOperatorEqualityComparer } from "../expression.equality-comparers/in-operator.equality-comparer";
import { NewOperatorEqualityComparer } from "../expression.equality-comparers/new-operator.equality-comparer";
import { ItEqualityComparer } from "../expression.equality-comparers/it.equality-comparer";

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
        deps: [AutoMockedStorage, ExpressionEqualityComparer, AutoMockFactory]
    },
    {
        provide: ExpressionEqualityComparer, useClass: ExpressionEqualityComparer, deps: [
            GetPropertyEqualityComparer,
            SetPropertyEqualityComparer,
            MethodEqualityComparer,
            InstanceMethodEqualityComparer,
            InOperatorEqualityComparer,
            NewOperatorEqualityComparer,
            ItEqualityComparer
        ]
    },
];
