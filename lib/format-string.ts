/**
 * @obsolete
 * @deprecated
 * Since this function is not used in the library it will be removed.
 *
 * @example
 * ```typescript
 *
 * const arg = 'value';
 * const template = '{0}';
 * const actual = format(template, arg);
 *
 * expect(actual).toBe(arg);
 * ```
 * @param template
 * @param args
 */
export function format(template: string, ...args: any[]): string {
    return template.replace(/\{(\d+)\}/g, (match, capture) => args[1 * capture]);
}
