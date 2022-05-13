export class StringErrorStyler {
    public style(value: string) {
        return `\u001B[4m${value}\u001B[24m`;
    }
}
