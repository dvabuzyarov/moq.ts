import { createInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { dataMock } from "../../L1.unit-test.components/data-mock";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../../L0/L0.promise/async-return-type";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { ProjectDefinition, ProjectDefinitionCollection } from "@angular-devkit/core/src/workspace/definitions";
import { GetWorkspace } from "../../L2/L2.wrappers/get-workspace.service";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";
import { JsonParseService } from "../../L2/L2.wrappers/json-parse.service";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { workspaces } from "@angular-devkit/core";
import { AngularWorkspace } from "@angular/cli/src/utilities/config";

describe("Options", () => {
    beforeEach(() => {
        createInjector(Options, [OPTIONS, GetWorkspace, JoinPath, HOST, JsonParseService]);
    });

    beforeEach(() => {
        const project = dataMock<ProjectDefinition>({});
        const projects = new Mock<ProjectDefinitionCollection>()
            .setup(instance => instance.get(It.IsAny()))
            .returns(project)
            .object();
        const workspace = dataMock<AngularWorkspace>({projects});
        resolveMock(GetWorkspace)
            .setup(instance => instance(It.IsAny()))
            .returns(Promise.resolve(workspace));
        resolveMock(HOST)
            .setup(instance => instance.read(It.IsAny()))
            .returns(dataMock<Buffer>({toString: () => undefined}));
        resolveMock(JsonParseService)
            .setup(instance => instance(It.IsAny()))
            .returns({dest: undefined});
    });

    it("Should be resolved", () => {
        const actual = resolve<Options>();
        expect(actual).toEqual(jasmine.any(Promise));
    });

    it("Returns options", async () => {
        const publicJs = "public api path";
        const sourceRoot = "source root";
        const projectName = "project name";
        const ngPackagePath = "ng-package.json";
        const ngPackageContent = "ng package content";
        const dest = "../../dist/moq";
        const moqOutputFolder = "dist/moq";
        const moqPackageJson = "dist/moq/package.json";
        const publicApiTs = "dist/moq/public_api.d.ts";
        const internalPackageJson = "dist/moq/internal/package.json";
        const bundlesFolder = "dist/moq/bundles/";
        const fesm2015Folder = "dist/moq/fesm2015/";
        const internalEsm2015Folder = "dist/moq/esm2015/";

        const project = dataMock<ProjectDefinition>({sourceRoot});

        const projects = new Mock<workspaces.ProjectDefinitionCollection>()
            .setup(instance => instance.get(projectName))
            .returns(project)
            .object();

        const workspace = new Mock<AngularWorkspace>()
            .setup(instance => instance.projects)
            .returns(projects)
            .object();

        resolveMock(GetWorkspace)
            .setup(instance => instance("local"))
            .returns(Promise.resolve(workspace));
        resolveMock(OPTIONS)
            .setup(instance => instance.project)
            .returns(projectName);
        resolveMock(JoinPath)
            .setup(instance => instance(sourceRoot, "public.ts"))
            .returns(publicJs)
            .setup(instance => instance(sourceRoot, "../", "ng-package.json"))
            .returns(ngPackagePath)
            .setup(instance => instance(sourceRoot, "../", dest))
            .returns(moqOutputFolder)
            .setup(instance => instance(moqOutputFolder, "package.json"))
            .returns(moqPackageJson)
            .setup(instance => instance(moqOutputFolder, "public_api.d.ts"))
            .returns(publicApiTs)
            .setup(instance => instance(moqOutputFolder, "/internal", "package.json"))
            .returns(internalPackageJson)
            .setup(instance => instance(moqOutputFolder, "/bundles/"))
            .returns(bundlesFolder)
            .setup(instance => instance(moqOutputFolder, "/fesm2015/"))
            .returns(fesm2015Folder)
            .setup(instance => instance(moqOutputFolder, "/esm2015/internal/"))
            .returns(internalEsm2015Folder);
        resolveMock(HOST)
            .setup(instance => instance.read(ngPackagePath).toString())
            .returns(ngPackageContent);
        resolveMock(JsonParseService)
            .setup(instance => instance(ngPackageContent))
            .returns({dest});


        const actual = await resolve<Options>();

        const expected = {
            publicJs,
            publicApiTs,
            moqOutputFolder,
            moqPackageJson,
            internalPackageJson,
            bundlesFolder,
            fesm2015Folder,
            internalEsm2015Folder
        } as AsyncReturnType<TypeOfInjectionFactory<Options>>;
        expect(actual).toEqual(expected);
    });
});
