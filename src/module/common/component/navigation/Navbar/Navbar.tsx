import { NavbarProps } from "./Navbar.types";
import { BackStyledIcon, NavbarRoot, BackIconRoot, Title } from "./Navbar.styles";
import { useNavigation } from "@react-navigation/native";
import LogoRow from "../../display/Logos/LogoRow/LogoRow";

const Navbar = ({ back, title, withLogo = false, appearance = "dark" }: NavbarProps): JSX.Element => {
    const navigation = useNavigation();
    return (
        <NavbarRoot>
            {back && (
                <BackIconRoot onPress={() => navigation.goBack()}>
                    <BackStyledIcon />
                </BackIconRoot>
            )}
            {withLogo && <LogoRow appearance={appearance} />}
            {title && <Title>{title}</Title>}
        </NavbarRoot>
    );
};

export default Navbar;
