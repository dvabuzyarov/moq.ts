export function nameof<T>(name: Extract<keyof T, string>): string {
    return name;
}
