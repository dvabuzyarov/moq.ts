import { createInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../../L0/L0.promise/async-return-type";
import { Path } from "@angular-devkit/core";
import { PackagePatcherRule } from "./package-patcher.rule";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { JsonParseService } from "../../L2/L2.wrappers/json-parse.service";
import { JsonStringifyService } from "../../L2/L2.wrappers/json-stringify.service";

describe("Package patcher rule", () => {
    beforeEach(() => {
        createInjector(PackagePatcherRule, [HOST,
            Options,
            JsonParseService,
            JsonStringifyService
        ]);
    });

    it("Should be resolved", () => {
        const actual = resolve<PackagePatcherRule>();
        expect(actual).toEqual(jasmine.any(PackagePatcherRule));
    });

    it("Overwrites public_api.ts file", async () => {
        const moqPackageJson = "/dist/moq/package.json" as Path;
        const name = "moq.ts";
        const moqPackageContent = "moq package.json content";
        const updateContent = "content";
        const exports = {
            "./package.json": {
                default: "./package.json"
            },
            ".": {
                types: "./index.d.ts",
                esm2020: "./esm2020/moq.ts.mjs",
                es2020: "./fesm2020/moq.ts.mjs",
                es2015: "./fesm2015/moq.ts.mjs",
                node: "./fesm2015/moq.ts.mjs",
                default: "./fesm2020/moq.ts.mjs"
            },
            "./internal": {
                types: "./internal/index.d.ts",
                esm2020: "./esm2020/internal/moq.ts-internal.mjs",
                es2020: "./fesm2020/moq.ts-internal.mjs",
                es2015: "./fesm2015/moq.ts-internal.mjs",
                node: "./fesm2015/moq.ts-internal.mjs",
                default: "./fesm2020/moq.ts-internal.mjs"
            }
        };

        const expected = {
            "./package.json": {
                default: "./package.json"
            },
            ".": {
                types: "./index.d.ts",
                esm2020: "./esm2020/moq.ts.mjs",
                es2020: "./fesm2020/moq.ts.mjs",
                es2015: "./fesm2015/moq.ts.mjs",
                node: "./fesm2015/moq.ts.mjs",
                default: "./fesm2020/moq.ts.mjs"
            },
            "./internal": {
                types: "./internal/index.d.ts",
                esm2020: "./esm2020/moq.ts.mjs",
                es2020: "./fesm2020/moq.ts.mjs",
                es2015: "./fesm2015/moq.ts.mjs",
                node: "./fesm2015/moq.ts.mjs",
                default: "./fesm2020/moq.ts.mjs"
            }
        };

        const options = new Mock<AsyncReturnType<TypeOfInjectionFactory<Options>>>()
            .setup(instance => instance.moqPackageJson)
            .returns(moqPackageJson)
            .object();
        resolveMock(Options)
            .setup(() => It.IsAny())
            .mimics(Promise.resolve(options));
        resolveMock(HOST)
            .setup(instance => instance.overwrite(It.IsAny(), It.IsAny()))
            .returns(undefined)
            .setup(instance => instance.read(moqPackageJson).toString())
            .returns(moqPackageContent);
        resolveMock(JsonParseService)
            .setup(instance => instance(moqPackageContent))
            .returns({name, exports});
        resolveMock(JsonStringifyService)
            .setup(instance => instance({
                name,
                exports: expected
            }))
            .returns(updateContent);

        const provider = resolve<PackagePatcherRule>();
        const actual = await provider.apply();

        expect(actual).toBe(resolve(HOST));
        resolveMock(HOST)
            .verify(instance => instance.overwrite(moqPackageJson, updateContent));
    });

});
