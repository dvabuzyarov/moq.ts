import { Injector, StaticProvider } from "@angular/core";
import { IMockOptions } from "../moq";

/**
 * Creates an angular injector
 */
export function injectorFactory<T>(options: IMockOptions<T>, ...providers: StaticProvider[]) {
    const {injectorConfig} = options;
    if (injectorConfig) {
        return Injector.create({providers: injectorConfig.get(options, providers)});
    }
    throw new Error("injectorConfig is not defined");
}

