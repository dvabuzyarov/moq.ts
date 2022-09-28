import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { TypeOfInjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { Options } from "./options";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";
import { JsonParseService } from "../../L2/L2.wrappers/json-parse.service";
import { JsonStringifyService } from "../../L2/L2.wrappers/json-stringify.service";

export class PackagePatcherRule {
    constructor(
        // @Inject(HOST)
        private readonly tree: TypeofInjectionToken<typeof HOST>,
        // @Inject(Options)
        private readonly options: TypeOfInjectionFactory<Options>,
        // @Inject(JsonParseService)
        private readonly jsonParse: TypeOfInjectionFactory<JsonParseService>,
        // @Inject(JsonStringifyService)
        private readonly jsonStringify: TypeOfInjectionFactory<JsonStringifyService>) {
    }

    async apply() {
        const {moqPackageJson} = await this.options;
        const packageContent = this.jsonParse(this.tree.read(moqPackageJson).toString());
        const {exports} = packageContent;
        const content = this.jsonStringify({
            ...packageContent, ...{
                exports: {
                    ...exports, ...{
                        "./internal": {
                            ...exports["."],
                            types: exports["./internal"].types
                        }
                    }
                }
            }
        });
        this.tree.overwrite(moqPackageJson, content);
        return this.tree;
    }
}
