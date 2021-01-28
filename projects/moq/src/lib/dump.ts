import { TrackedExpressionsFormatter } from "./formatters/tracked-expressions.formatter";
import { IMock } from "./moq";

/**
 * This function dumps into console.log all interactions with the mocked object
 */
export function dump<T>(mock: IMock<T>, writer: Console = console): void {
    const formatter = mock.resolve(TrackedExpressionsFormatter);
    const expressions = mock.tracker.get().map(record => record.expression);
    const output = formatter.format(expressions);
    const delimiter = "-------------------------------";
    writer.log(`Dump of ${mock.name === undefined ? "noname mock" : mock.name}`);
    writer.log(delimiter);
    writer.log(`\n${output}`);
    writer.log(delimiter);
}
