import { trackedExpressionsFormatterFactory } from "./formatters/tracked-expressions-formatter";
import { IMock } from "./moq";

/***
 * This function dumps into console.log all interactions with the mocked object
 * @param {IMock<T>} mock
 */
export function dump<T>(mock: IMock<T>): void {
    const formatter = trackedExpressionsFormatterFactory();
    const expressions = mock.tracker.get().map(record => record.expression);
    const output = formatter.format(expressions);
    const delimiter = "-------------------------------";
    console.log(`Dump of ${mock.name === undefined ? "noname mock" : mock.name}`);
    console.log(delimiter);
    console.log(`\n${output}`);
    console.log(delimiter);
}
