import { Children, ReactElement, ReactNode, useMemo } from "react";
import { SelectItemProps } from "../SelectItem";

export function useSelectDisplayContent(
    value: unknown | unknown[],
    multiple: boolean,
    children: ReactElement<SelectItemProps> | ReactElement<SelectItemProps>[] | undefined,
): ReactNode | ReactNode[] {
    return useMemo(() => {
        if (value === undefined || !children) return;
        if (multiple) {
            const selectedChildren = Children.toArray(children).filter((c) =>
                (value as unknown[]).find((v) => v === (c as ReactElement).props?.value),
            );
            return selectedChildren.map((c) => (c as ReactElement).props?.children);
        } else return (Children.toArray(children).find((c) => (c as ReactElement).props.value === value) as ReactElement)?.props?.children;
    }, [value, multiple, children]);
}
