import { NavbarProps } from "./Navbar.types";
import { NavbarRoot, BackIconRoot, Title } from "./Navbar.styles";
import { useNavigation } from "@react-navigation/native";
import LogoRow from "../../display/Logos/LogoRow/LogoRow";
import { BackIcon } from "icons";

const Navbar = ({ back, title, logo = false }: NavbarProps): JSX.Element => {
    const navigation = useNavigation();
    return (
        <NavbarRoot>
            {back && (
                <BackIconRoot onPress={() => navigation.goBack()}>
                    <BackIcon />
                </BackIconRoot>
            )}
            {logo && <LogoRow />}
            {title && <Title variant="h2">{title}</Title>}
        </NavbarRoot>
    );
};

export default Navbar;
