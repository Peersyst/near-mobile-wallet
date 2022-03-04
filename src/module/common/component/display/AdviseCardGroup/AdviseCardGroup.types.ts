import { AdviseCardProps } from "module/common/component/display/AdviseCard/AdviseCard.types";

export interface AdviseCardGroupProps {
    index?: number;
    onIndexChange?: (index: number) => unknown;
    advises: Omit<AdviseCardProps, "number">[];
}
