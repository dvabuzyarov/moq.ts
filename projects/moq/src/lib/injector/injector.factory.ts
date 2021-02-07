import { IMockOptions } from "../moq";
import { StaticProvider } from "../static.injector/interface/provider";
import { Injector } from "../static.injector/injector";

/**
 * Creates an angular based injector
 */
export function injectorFactory<T>(options: IMockOptions<T>, ...providers: StaticProvider[]) {
    const {injectorConfig} = options;
    if (injectorConfig) {
        const resolved = injectorConfig.get(options, providers);
        return Injector.create({
            providers: resolved
        });
    }
    throw new Error("injectorConfig is not defined");
}

