export function removeSuffix(name: string, suffix: string): string {
    if (!name.endsWith(suffix)) return name;
    return name.substring(0, name.length - suffix.length);
}

export function addSuffix(name: string, suffix: string): string {
    return name + suffix;
}
