import { IMockOptions } from "../moq";
import { Injector, StaticProvider } from "../static.injector";

/**
 * Creates an angular based injector
 */
export function injectorFactory<T>(options: IMockOptions<T>, ...providers: StaticProvider[]) {
    const {injectorConfig} = options;
    if (injectorConfig) {
        return Injector.create({providers: injectorConfig.get(options, providers)});
    }
    throw new Error("injectorConfig is not defined");
}

