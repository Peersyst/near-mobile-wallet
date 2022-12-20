import { DotListProps } from "../DotList/DotList.types";

export interface GuidelinesListProps extends Pick<DotListProps, "children"> {
    allowed: boolean;
}
