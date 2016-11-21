export function format(template: string, ...args: any[]): string {
    return template.replace(/\{(\d+)\}/g, (match, capture) => args[1 * capture]);
}
