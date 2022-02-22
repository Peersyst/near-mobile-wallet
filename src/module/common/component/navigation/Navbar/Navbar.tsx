import { NavbarProps } from "./Navbar.types";
import { BackStyledIcon, NavbarRoot, BackIconRoot, Title } from "./Navbar.styles";
import Logo from "../../display/Logo/Logo";
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ back, title, withLogo = false }: NavbarProps): JSX.Element => {
    const navigation = useNavigation();
    return (
        <NavbarRoot>
            {back && (
                <BackIconRoot onPress={() => navigation.goBack()}>
                    <BackStyledIcon />
                </BackIconRoot>
            )}
            {withLogo && <Logo size={"md"} direction={"horizontal"} />}
            {title && <Title>{title}</Title>}
        </NavbarRoot>
    );
};

export default Navbar;
