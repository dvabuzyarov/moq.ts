import { InjectionFactory } from "../../L0/L0.injection-factory/injection-factory";
import { TypeofInjectionToken } from "../../injector/typeof-injection-token";
import { HOST } from "../../L0/L0.injection-tokens/host.injection-token";

export class DeletePathsOperator implements InjectionFactory {
    constructor(private readonly host: TypeofInjectionToken<typeof HOST>) {
        return this.factory() as any;
    }

    factory() {
        return () => (paths: string[]) => {
            for (const path of paths) {
                this.host.delete(path);
            }
            return this.host;
        };
    }
}
