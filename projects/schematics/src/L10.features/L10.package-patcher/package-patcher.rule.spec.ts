import { createMoqInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../../L0/L0.promise/async-return-type";
import { Path } from "@angular-devkit/core";
import { PackagePatcherRule } from "./package-patcher.rule";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { JsonParseService } from "../../L2/L2.wrappers/json-parse.service";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";
import { JsonStringifyService } from "../../L2/L2.wrappers/json-stringify.service";

describe("Package patcher rule", () => {
    beforeEach(() => {
        createMoqInjector(PackagePatcherRule);
    });

    it("Should be resolved", () => {
        const actual = resolve<PackagePatcherRule>();
        expect(actual).toEqual(jasmine.any(PackagePatcherRule));
    });

    it("Overwrites public_api.ts file", async () => {
        const internalPackageJson = "/dist/moq/internal/package.json" as Path;
        const internalPackageContent = "internal package.json content";
        const moqPackageJson = "/dist/moq/package.json" as Path;
        const moqPackageContent = "moq package.json content";
        const main = "main";
        const module = "module";
        const es2015 = "es2015";
        const esm2015 = "esm2015";
        const fesm2015 = "fesm2015";
        const name = "internal package.json name";
        const relativeMain = "../main";
        const relativeModule = "../module";
        const relativeEs2015 = "../es2015";
        const relativeEsm2015 = "../esm2015";
        const relativeFesm2015 = "../fesm2015";
        const updateContent = "content";

        const options = new Mock<AsyncReturnType<TypeOfInjectionFactory<Options>>>()
            .setup(instance => instance.internalPackageJson)
            .returns(internalPackageJson)
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
            .returns(moqPackageContent)
            .setup(instance => instance.read(internalPackageJson).toString())
            .returns(internalPackageContent);
        resolveMock(JsonParseService)
            .setup(instance => instance(moqPackageContent))
            .returns({main, module, es2015, esm2015, fesm2015})
            .setup(instance => instance(internalPackageContent))
            .returns({name});
        resolveMock(JoinPath)
            .setup(instance => instance("../", main))
            .returns(relativeMain)
            .setup(instance => instance("../", module))
            .returns(relativeModule)
            .setup(instance => instance("../", es2015))
            .returns(relativeEs2015)
            .setup(instance => instance("../", esm2015))
            .returns(relativeEsm2015)
            .setup(instance => instance("../", fesm2015))
            .returns(relativeFesm2015);
        resolveMock(JsonStringifyService)
            .setup(instance => instance({
                name,
                main: relativeMain,
                module: relativeModule,
                es2015: relativeEs2015,
                esm2015: relativeEsm2015,
                fesm2015: relativeFesm2015
            }))
            .returns(updateContent);

        const provider = resolve<PackagePatcherRule>();
        const actual = await provider.apply();

        expect(actual).toBe(resolve(HOST));
        resolveMock(HOST)
            .verify(instance => instance.overwrite(internalPackageJson, updateContent));
    });

});
