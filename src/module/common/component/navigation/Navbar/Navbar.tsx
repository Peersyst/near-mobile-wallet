import { NavbarProps } from "./Navbar.types";
import { BackStyledIcon, NavbarRoot, BackIconRoot, Title } from "./Navbar.styles";
import Logo from "../../display/Logo/Logo";
import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";

const Navbar = ({ back, title, withIcon = false }: NavbarProps): JSX.Element => {
    const navigation = useContext(NavigationContext);
    return (
        <NavbarRoot>
            {back && (
                <BackIconRoot onPress={() => navigation?.goBack()}>
                    <BackStyledIcon />
                </BackIconRoot>
            )}
            {withIcon && <Logo size={"md"} direction={"horizontal"} />}
            {title && <Title>{title}</Title>}
        </NavbarRoot>
    );
};

export default Navbar;
