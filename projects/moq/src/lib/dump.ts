import { TrackedExpressionsFormatter } from "./formatters/tracked-expressions.formatter";
import { injectorFactory } from "./injector/injector.factory";
import { IMock } from "./moq";
import { MOCK } from "./injector/moq.injection-token";

/**
 * This function dumps into console.log all interactions with the mocked object
 */
export function dump<T>(mock: IMock<T>, writer: Console = console): void {
    const injector = injectorFactory(mock.options, {provide: MOCK, useValue: mock, deps: []});
    const formatter = injector.get(TrackedExpressionsFormatter);
    const expressions = mock.tracker.get().map(record => record.expression);
    const output = formatter.format(expressions);
    const delimiter = "-------------------------------";
    writer.log(`Dump of ${mock.name === undefined ? "noname mock" : mock.name}`);
    writer.log(delimiter);
    writer.log(`\n${output}`);
    writer.log(delimiter);
}
