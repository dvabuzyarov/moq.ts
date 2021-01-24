import { MOCK } from "../injector/mock.injection-token";
import { AutoMockFactory } from "./auto-mock.factory";
import { MOCK_OPTIONS } from "../mock-options/mock-options.injection-token";
import { RootProvider } from "./root.provider";
import { Optional } from "../static.injector/metadata";
import { ROOT_MOCK } from "../injector/root-mock.injection-token";
import { AutoMocks } from "./auto-mocks";
import { ExpressionsMatcher } from "./expressions.matcher";
import { ExpressionMatcher } from "../expression-matchers/expression.matcher";

/**
 * @hidden
 */
export const autoMocksProviders = [
    {provide: AutoMockFactory, useClass: AutoMockFactory, deps: [MOCK_OPTIONS, RootProvider]},
    {provide: RootProvider, useClass: RootProvider, deps: [MOCK, [new Optional(), ROOT_MOCK]]},
    {provide: AutoMocks, useClass: AutoMocks, deps: [ExpressionsMatcher, AutoMockFactory]},
    {provide: ExpressionsMatcher, useClass: ExpressionsMatcher, deps: [ExpressionMatcher]},
];
