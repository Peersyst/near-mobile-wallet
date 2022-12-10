import { DotListProps } from "../DotList/DosList.types";

export interface ExplanationListProps extends Pick<DotListProps, "children"> {
    allowed: boolean;
}
