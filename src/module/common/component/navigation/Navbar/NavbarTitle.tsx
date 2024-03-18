import { Typography } from "@peersyst/react-native-components";
import { TypographyProps } from "../../display/Typography/Typography";
import { ReactNode } from "react";

export interface NavbarTitleProps extends Omit<TypographyProps, "variant" | "children"> {
    title: ReactNode;
}

export const NavbarTitle = ({ title, ...rest }: NavbarTitleProps) => {
    return (
        <Typography variant="body1Strong" {...rest}>
            {title}
        </Typography>
    );
};
