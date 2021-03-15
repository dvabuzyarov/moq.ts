import { createMoqInjector, resolve, resolveMock } from "../../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { It, Mock } from "moq.ts";
import { dataMock } from "../../L1.unit-test.components/data-mock";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../../L0/L0.promise/async-return-type";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { AngularWorkspace } from "@angular/cli/utilities/config";
import { ProjectDefinition, ProjectDefinitionCollection } from "@angular-devkit/core/src/workspace/definitions";
import { GetWorkspace } from "../../L2/L2.wrappers/get-workspace.service";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";

describe("Options", () => {
    beforeEach(() => {
        createMoqInjector(Options);
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
    });

    it("Should be resolved", () => {
        const actual = resolve<Options>();
        expect(actual).toEqual(jasmine.any(Promise));
    });

    it("Returns options", async () => {
        const publicApiPath = "public api path";
        const libPath = "lib path";
        const sourceRoot = "source root";
        const projectName = "project name";

        const project = dataMock<ProjectDefinition>({sourceRoot});
        const projects = new Mock<ProjectDefinitionCollection>()
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
            .setup(instance => instance(sourceRoot, "public_api.ts"))
            .returns(publicApiPath)
            .setup(instance => instance(sourceRoot, "/lib"))
            .returns(libPath);


        const actual = await resolve<Options>();

        const expected = {
            publicApiPath,
            libPath,
            sourceRoot: `/${sourceRoot}`
        } as AsyncReturnType<TypeOfInjectionFactory<Options>>;
        expect(actual).toEqual(expected);
    });
});
