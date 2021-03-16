import { Inject } from "@angular/core";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { JsonParseService } from "../../L2/L2.wrappers/json-parse.service";
import { JsonStringifyService } from "../../L2/L2.wrappers/json-stringify.service";
import { JoinPath } from "../../L2/L2.wrappers/join-path.service";

export class PackagePatcherRule {
    constructor(
        @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        @Inject(JsonParseService)
        private readonly jsonParse: TypeOfInjectionFactory<JsonParseService>,
        @Inject(JsonStringifyService)
        private readonly jsonStringify: TypeOfInjectionFactory<JsonStringifyService>,
        @Inject(JoinPath)
        private readonly join: TypeOfInjectionFactory<JoinPath>,) {
    }

    async apply() {
        const {moqPackageJson, internalPackageJson} = await this.options;
        const {main, module, es2015, esm2015, fesm2015} = this.jsonParse(this.tree.read(moqPackageJson).toString());
        const internalPackage = this.jsonParse(this.tree.read(internalPackageJson).toString());
        const content = this.jsonStringify({
            ...internalPackage, ...{
                main: this.join("../", main),
                module: this.join("../", module),
                es2015: this.join("../", es2015),
                esm2015: this.join("../", esm2015),
                fesm2015: this.join("../", fesm2015)
            }
        });
        this.tree.overwrite(internalPackageJson, content);
        return this.tree;
    }
}
