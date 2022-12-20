import { ColProps } from "@peersyst/react-native-components";
import { Loosen } from "@peersyst/react-types";
import { TypographyProps } from "../Typography/Typography";

export interface DotListProps extends Loosen<TypographyProps, "variant"> {
    children: string[];
    gap?: ColProps["gap"];
}
