import { createMoqInjector, get, resolve } from "../L1.unit-test.components/createMoqInjector";
import { Options } from "./options";
import { GETWORKSPACE } from "./injection-tokens/get-workspace.injection-token";
import { It, Mock } from "moq.ts";
import { dataMock } from "../L1.unit-test.components/data-mock";
import { TypeOfInjectionFactory } from "../L0/L0.injection-factory/injection-factory";
import { AsyncReturnType } from "../L0/L0.promise/async-return-type";
import { OPTIONS } from "./injection-tokens/options.injection-token";
import { PATH_JOIN } from "./injection-tokens/join.injection-token";
import { AngularWorkspace } from "@angular/cli/utilities/config";
import { ProjectDefinition, ProjectDefinitionCollection } from "@angular-devkit/core/src/workspace/definitions";

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
        resolve(GETWORKSPACE)
            .setup(instance => instance(It.IsAny()))
            .returns(Promise.resolve(workspace));
    });

    it("Should be resolved", () => {
        const actual = get<Options>();
        expect(actual).toEqual(jasmine.any(Promise));
    });

    it("Returns options", async () => {
        const internalApiPath = "internal api path";
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

        resolve(GETWORKSPACE)
            .setup(instance => instance("local"))
            .returns(Promise.resolve(workspace));
        resolve(OPTIONS)
            .setup(instance => instance.project)
            .returns(projectName);
        resolve(PATH_JOIN)
            .setup(instance => instance(sourceRoot, "internal_api.ts"))
            .returns(internalApiPath)
            .setup(instance => instance(sourceRoot, "public_api.ts"))
            .returns(publicApiPath)
            .setup(instance => instance(sourceRoot, "/lib"))
            .returns(libPath);


        const actual = await get<Options>();

        const expected = {
            internalApiPath,
            publicApiPath,
            libPath,
            sourceRoot: `/${sourceRoot}`
        } as AsyncReturnType<TypeOfInjectionFactory<Options>>;
        expect(actual).toEqual(expected);
    });
});
