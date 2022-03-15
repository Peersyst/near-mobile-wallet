export function handleSelection(
    value: unknown,
    selected: unknown | unknown[],
    multiple: boolean,
    isSelected: boolean,
): unknown | unknown[] {
    if (multiple) {
        const selectedArray = selected as unknown[];
        return isSelected ? selectedArray.filter((v) => v !== value) : selectedArray.concat(value);
    } else return value;
}
