import { Mock } from "../lib/mock";
import { EqualMatchingInjectorConfig } from "../lib/injector/equal-matching-injector.config";
import { ReturnsAsyncPresetFactory } from "../lib/presets/factories/returns-async-preset.factory";
import { RootMockProvider } from "../lib/auto-mocking/root-mock.provider";
import { Presets } from "../lib/presets/presets";
import { ResolvedPromiseFactory } from "../lib/presets/resolved-promise.factory";
import { MimicsResolvedAsyncPresetFactory } from "../lib/presets/factories/mimics-resolved-async-preset.factory";
import { ThrowsAsyncPresetFactory } from "../lib/presets/factories/throws-async-preset.factory";
import { MimicsRejectedAsyncPresetFactory } from "../lib/presets/factories/mimics-rejected-async-preset.factory";
import { RejectedPromiseFactory } from "../lib/presets/rejected-promise.factory";

describe("#578 support async functions", () => {

    it("returns async", async () => {
        async function fn() {
            return 1;
        }

        const mock = new Mock<typeof fn>()
            .setup(instance => instance())
            .returnsAsync(2)
            .object();

        const actual = await mock();
        expect(actual).toBe(2);
    });

    it("returns async for async setup", async () => {
        async function fn() {
            return 1;
        }

        const injectorConfig = new EqualMatchingInjectorConfig([], [
            {
                provide: ReturnsAsyncPresetFactory,
                useClass: MimicsResolvedAsyncPresetFactory,
                deps: [RootMockProvider, Presets, ResolvedPromiseFactory]
            },
        ]);

        const mock = new Mock<typeof fn>({injectorConfig})
            .setup(async instance => instance())
            .returnsAsync(2)
            .object();

        const actual = await mock();
        expect(actual).toBe(2);
    });

    it("throws async", async () => {
        async function fn() {
            return 1;
        }

        const exception = new Error();
        const mock = new Mock<typeof fn>()
            .setup(instance => instance())
            .throwsAsync(exception)
            .object();

        let actual;
        try {
            await mock();
        } catch (e) {
            actual = e;
        }

        expect(actual).toBe(exception);
    });

    it("throws async for async setup", async () => {
        async function fn() {
            return 1;
        }

        const injectorConfig = new EqualMatchingInjectorConfig([], [
            {
                provide: ThrowsAsyncPresetFactory,
                useClass: MimicsRejectedAsyncPresetFactory,
                deps: [RootMockProvider, Presets, RejectedPromiseFactory]
            },
        ]);

        const exception = new Error();
        const mock = new Mock<typeof fn>({injectorConfig})
            .setup(async instance => instance())
            .throwsAsync(exception)
            .object();

        let actual;
        try {
            await mock();
        } catch (e) {
            actual = e;
        }

        expect(actual).toBe(exception);
    });
});
